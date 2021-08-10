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

@Injectable({
  providedIn: 'root'
})
export class FormService {
  forms = new FormGroup({});
  configs: any;
  configChange: BehaviorSubject<any[]> = new BehaviorSubject([]);

  fieldchange: BehaviorSubject<any[]> = new BehaviorSubject([]);
  fields = [];

  emptyObj: IField = {
    name: 'home_ui_new'
  };

  constructor(private fb: FormBuilder) {
    this.fieldchange.subscribe(val => {
      this.fields.push(val);
    });
  }

  getFields() {
    return this.fields;
  }

  getFieldByName(name: string): BaseFieldComponent {
    // console.log(name);
    // console.log(this.fields);

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
    // console.log(pageName);
    // console.log(form);

    if (this.forms !== undefined && this.forms !== null) {
      if (this.forms.get(pageName)) {
        let tmpForm = this.forms.get(pageName) as FormGroup;
        Object.assign(tmpForm, form);
        // console.log(tmpForm);
        this.forms.removeControl(pageName);
        this.forms.addControl(pageName, tmpForm);
        // ((this.forms.get(pageName) as FormGroup).get(formName) as FormGroup).addControl(formName, form)
        // console.log('test');
        // console.log(this.forms);
      } else {
        this.forms.addControl(pageName, form);
      }
    } else {
      this.forms = this.fb.group({ [pageName]: form });
    }
    // console.log(this.forms);
  }

  /**
   * @param config : { [ <PageName>: { <FormName>: { <FieldName>: IField } } ] }
   * @description adds Config to Service
   */
  addConfig(config: any) {
    // console.log(config);
    if (this.configs !== undefined && this.configs !== null) {
      for (const [pageName, page] of Object.entries(config)) {
        for (const [formName, form] of Object.entries(page)) {
          let controls = {};
          for (const [fieldName, field] of Object.entries(form)) {
            controls[fieldName] = field;
          }
          // console.log(controls);
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
    // console.log(config);
    this.configChange.next(this.configs);
    this.setUp(this.configs);
    // console.log('formConfig', this.configs);
  }

  /* TODO: has to be integrated */
  updateConfig(config: IField) {
    // console.log(config);
    // console.log(this.configs);

    Object.entries(this.configs).forEach(con => {});
    // for (let item of this.configs.children) {
    //   if (item.name === config.name) {
    //     item = config;
    //     // console.log(item);
    //     return true;
    //   }
    // }
    return false;
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
    // console.log(this.forms);
    if (this.forms.get([page, form])) {
      // console.log(this.forms.get([page, form]));
      // console.log(((this.forms.get(page) as FormGroup).get(form) as FormGroup));

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
    // console.log('buildVali', this);
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
    // console.log('config', config);
    Object.keys(config).forEach(page => {
      const newForm = {};
      // console.log(page); // home
      const formObj = config[page];
      if (formObj) {
        Object.keys(formObj).forEach(form => {
          // console.log(form); // control || ui
          const formArray = {};
          const forM: any = formObj[form];
          // console.log(forM);
          // console.log(form);
          Object.keys(forM).forEach(key => {
            const field: IField = forM[key];
            const validatorS = this.buildValidators(field.validators);
            const controL = [];
            controL.push(field.value ? field.value : '');

            const options = {
              validators: [],
              updateOn: ''
            };

            // for (let i in validatorS) {
              if (validatorS) {
                options.validators = validatorS;
              }
            // }

            if(field.updateOn) {
              options.updateOn = field.updateOn;
              // if (controL.length < 2) {
              //   controL.push('');
              //   controL.push('');
              // }
              // if (controL.length < 3) {
              //   controL.push('');
              // }
              // // console.log('hep');
              // // console.log(field);

              // controL.push({updateOn : field.updateOn});
              // controL['updateOn'] = field.updateOn;
              controL.push(options);
              // console.log(controL);
            }
            formArray[field.name] = controL;
            // console.log(formArray);

          });
          newForm[form] = this.fb.group(formArray);
          // console.log('array', newForm);
          this.addForm(this.fb.group(newForm), page);
        });
        // console.log(this.fb.group(newForm));
      }
    });
  }

  onConfigChange() {
    return this.configChange;
  }
}
