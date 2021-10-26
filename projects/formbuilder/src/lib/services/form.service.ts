import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { IField } from '../interfaces/ifield';
import { IValidator } from '../interfaces/ivalidator';
import { BehaviorSubject } from 'rxjs';
import { BaseFieldComponent } from '../classes/field';
import { transform, isEqual, isObject } from 'lodash';
import { ICustomValidation } from '../interfaces/icustom-validation';
import { DialogService } from './dialog.service';
import { TranslatePipe } from './translation.pipe';

export function difference(newObj: any, origObj: any) {
  let arrayIndexCounter = 0;
  return transform(newObj, (result, value, key) => {
    if (!isEqual(value, origObj[key])) {
      let resultKey = typeof (origObj === 'array')  ? arrayIndexCounter++ : key;
      result[resultKey] =
        isObject(value) && isObject(origObj[key])
          ? difference(value, origObj[key])
          : value;
    }
  });
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  forms = new FormGroup({});
  configs: any;
  changes: any;
  configChange: BehaviorSubject<any[]> = new BehaviorSubject([]);

  fieldchange: BehaviorSubject<any[]> = new BehaviorSubject([]);
  fields = [];

  emptyObj: IField = {
    name: 'home_ui_new'
  };

  constructor(private fb: FormBuilder,
    private ds: DialogService,
    private tp: TranslatePipe) {
    this.fieldchange.subscribe(val => {
      this.fields.push(val);
    });
    this.configChange.subscribe((newVal)=> {
      // this.setUp(newVal);
    });
  }

  getFields() {
    return this.fields;
  }

  getFieldByName(name: string): BaseFieldComponent {
    return this.fields.find(field => field.name === name);
  }

  addField(val: any) {
    this.fieldchange.next(val);
  }
  /**
   * @param form : FormGroup
   * @param name : FormName
   * @description adds form to Service of creates one
   */
  addForm(form: FormGroup, pageName: string) {
    if (this.forms !== undefined && this.forms !== null) {
      if (this.forms.get(pageName)) {
        let tmpForm = this.forms.get(pageName) as FormGroup;
        Object.assign(tmpForm, form);
        this.forms.removeControl(pageName);
        this.forms.addControl(pageName, tmpForm);
      } else {
        this.forms.addControl(pageName, form);
      }
    } else {
      this.forms = this.fb.group({ [pageName]: form });
    }
  }

  /**
   * @param config : { [ <PageName>: { <FormName>: { <FieldName>: IField } } ] }
   * @description adds Config to Service
   */
  addConfig(config: any) {
    if (this.configs !== undefined && this.configs !== null) {
      for (const [pageName, page] of Object.entries(config)) {
        for (const [formName, form] of Object.entries(page)) {
          let controls = {};
          for (const [fieldName, field] of Object.entries(form)) {
            controls[fieldName] = field;
          }
          if (this.configs[pageName][formName]) {
            Object.assign(this.configs[pageName][formName], controls);
          } else {
            this.configs[pageName][formName] = controls;
          }
        }
      }
    } else {
      this.configs = config;
    }
    this.configChange.next(this.configs);
    this.setUp(this.configs);
  }

  /* TODO: has to be integrated */
  updateConfig(config: IField) {
    const keys = config.name.split('_');
    const page = keys[0];
    const form = keys[1];
    const key = keys[2];

    if (this.configs[page] && this.configs[page][form]) {
      this.configs[page][form][key] = config;
      // this.configChange.next(this.configs);
      this.updateControl(config);
    }
  }

  updateControl(field: IField) {
    const validatorS = this.buildValidators(field.validators);
    const controL = [];
    controL.push(field.value ? field.value : '');

    const options = {
      validators: [],
      updateOn: ''
    };

    if (validatorS) {
      options.validators = validatorS;
    }

    if (field.updateOn) {
      options.updateOn = field.updateOn;

      controL.push(options);
    }
  }

  /**
   * @param name : Page_Form_Field
   * @returns FieldConfig: IField
   */
  getConfigByName(name: string) {
    const keys = name.split('_');
    const page = keys[0];
    const form = keys[1];
    const key = keys[2];

    if (this.configs[page] && this.configs[page][form]) {
      return this.configs[page][form][key]
        ? (this.configs[page][form][key] as IField)
        : this.emptyObj;
    } else {
      return this.emptyObj;
    }
  }

  /**
   * @param field : IField
   * @returns FormControl
   */
  getFormControl(field: IField): FormControl {
    const keys = field.name.split('_');
    const page = keys[0];
    const form = keys[1];
    const key = keys[2];

    if (
      ((this.forms.get(page) as FormGroup).get(form) as FormGroup).get(
        field.name
      )
    ) {
      return ((this.forms.get(page) as FormGroup).get(form) as FormGroup).get(
        field.name
      ) as FormControl;
    } else {
      return new FormControl('', this.buildValidators(field.validators));
    }
  }

  /**
   * @param name : Page_Form_Field
   * @returns Parent Form of key
   */
  getForm(name: string) {
    const keys = name.split('_');
    const page = keys[0];
    const form = keys[1];
    if (this.forms.get([page, form])) {
      return (this.forms.get(page) as FormGroup).get(form) as FormGroup;
    } else {
      if (this.forms.get(page)) {
        return this.forms.get(page) as FormGroup;
      } else {
        return new FormGroup({});
      }
    }
  }

  /**
   * @param name : Name of Page
   * @returns Formgroup with forms of Page
   */
  getPage(name: string) {
    if (this.forms.get(name) as FormGroup) {
      return this.forms.get(name) as FormGroup;
    } else {
      return null;
    }
  }

  /* TODO: has to be checked */
  getForms() {
    return this.forms.getRawValue();
  }

  /* TODO: has to be checked */
  getConfigs() {
    return this.configs;
  }

  /**
   * @param config : IValidator
   * @returns Array with ValidatorFunctions
   */
  buildValidators(config: IValidator) {
    const validators: ValidatorFn[] = [];
    if (config) {
      if (config.email) {
        validators.push(Validators.email);
      }
      if (config.max) {
        validators.push(Validators.max(config.max));
      }
      if (config.required) {
        validators.push(Validators.required);
      }
      if (config.min) {
        validators.push(Validators.min(config.min));
      }
      if (config.maxLength) {
        validators.push(Validators.maxLength(config.maxLength));
      }
      if (config.minLength) {
        validators.push(Validators.minLength(config.minLength));
      }
      if (config.pattern) {
        validators.push(Validators.pattern(config.pattern));
      }
    }
    return validators;
  }

  /**
   * @param config : { [ <PageName>: { <FormName>: { <FieldName>: IField } } ] }
   * @description : FormGroup will be initalized and added by config [triggert in addConfig()]
   */
  setUp(config: any) {
    Object.keys(config).forEach(page => {
      const newForm = {};
      const formObj = config[page];
      if (formObj) {
        Object.keys(formObj).forEach(form => {
          const formArray = {};
          const forM: any = formObj[form];
          Object.keys(forM).forEach(key => {
            const field: IField = forM[key];
            const validatorS = this.buildValidators(field.validators);
            const controL = [];

            controL.push({
              value: field.value ? field.value : '',
              disabled: field.disabled? field.disabled: false
            });

            const options = {
              validators: [],
              updateOn: ''
            };

            if (validatorS) {
              options.validators = validatorS;
            }

            if (field.updateOn) {
              options.updateOn = field.updateOn;

              controL.push(options);
            }
            formArray[field.name] = controL;
          });
          newForm[form] = this.fb.group(formArray);
          this.addForm(this.fb.group(newForm), page);
        });
        this.buildCustomValidation(config);
      }
    });
    this.changes = this.forms.getRawValue();
  }

  buildCustomValidation(config: any) {
    Object.keys(config).forEach(page => {
      const formObj = config[page];
      if (formObj) {
        Object.keys(formObj).forEach(form => {
          const formArray = {};
          const forM: any = formObj[form];
          Object.keys(forM).forEach(key => {
            const field: IField = forM[key];
            if (field.customValidation) {
              Object.keys(field.customValidation).forEach(validation => {
                // console.log(field.customValidation[validation]);
                let fieldToCheck: FormControl | null = null;
                const validationObj: ICustomValidation = field.customValidation[validation];
                const fieldD = this.getFormControl(field);
                // console.log(validationObj.dialog.msg);

                fieldD.valueChanges.subscribe((val) => {
                  // console.log(this.tp.transform(validationObj.dialog.msg));

                  let getChange = false;
                  if(validationObj.fieldToCheck) {
                    fieldToCheck = this.getFormControl({name: validationObj.fieldToCheck});
                  } else {
                    fieldToCheck = fieldD;
                    getChange = true;
                  }
                  switch(validationObj.operator) {
                    case '<':
                      break;
                    case '>':
                      break;
                    case '=':
                      break;
                    case '!=':
                    if (getChange) {
                      if(this.getControlChange(field.name) !== val) {
                        // console.log('controlchange');

                        this.ds.confirm(validationObj.dialog.msg,() => {
                          this.applieChanges();
                        }, () => {
                          // console.log('reset '+ field.name);

                          this.resetControl(field.name);
                        });
                      }
                    } else {
                      if(fieldToCheck && fieldToCheck.value !== val) {
                        // console.log('valuechange');

                        this.ds.confirm(validationObj.dialog.msg,() => {}, () => {
                          this.resetControl(field.name);
                        });
                      }
                      // } else {

                      }
                      break;
                  }
                });
              });
            }
          });
        });
      }
    });
  }
  onConfigChange() {
    return this.configChange;
  }

  hasChanges() {
    return difference(this.forms.getRawValue(), this.changes);
  }

  resetForms() {
    if (this.forms) {
      this.forms.patchValue(this.changes);
    }
  }

  resetControl(name: string) {
    const keys = name.split('_');
    const page = keys[0];
    const form = keys[1];

    if (this.changes[page][form][name] ||
      typeof this.changes[page][form][name] === 'string')
      {
        this.forms.get(page).get(form).get(name).patchValue(this.changes[page][form][name]);
      // this.resetForm();
      this.getFormControl({name}).markAsUntouched();
      // this.getFormControl({name}).patchValue(this.changes[page][form][control]);
    }
  }

  getControlChange(name: string) {
    const keys = name.split('_');
    const page = keys[0];
    const form = keys[1];

    return this.changes[page][form][name];
  }

  applieChanges() {
    this.changes = this.forms.getRawValue();
  }
  update() {
    this.forms.updateValueAndValidity();
  }
}
