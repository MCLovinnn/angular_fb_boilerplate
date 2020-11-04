import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IField } from '../interfaces/ifield';
import { DataFlattnerService } from './data-flattner.service';
import { IValidator } from '../interfaces/ivalidator';
import { merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  forms = new FormGroup({});
  configs: any;

  emptyObj: IField = {
    name: 'home_control_new',
    placeholder: 'Test'
  };

  constructor(private fb: FormBuilder) {
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
        let tmpForm = (this.forms.get(pageName) as FormGroup);
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
    console.log(this.forms);
    
  }

  /**
   * @param config : { [ <PageName>: { <FormName>: { <FieldName>: IField } } ] }
   * @description adds Config to Service
   */
  addConfig(config: any) {
    console.log(config);

    if (this.configs !== undefined && this.configs !== null) {
      let found = false;
      Object.keys(this.configs).map((key) => {
        Object.keys(config).map((page) => {
          if (page === key) {
            found = true;
            this.configs[key] = Object.assign({}, this.configs[key], config[key]);
          }
        })
      });
      if (!found) {
        this.configs = Object.assign({}, this.configs, config);
      }
    } else {
      this.configs = config;
    }
    console.log(config);

    this.setUp(config);
    // console.log('formConfig', this.configs);
  }


  /* TODO: has to be integrated */
  updateConfig(config: IField) {
    // console.log(config);
    // console.log(this.configs);

    Object.entries(this.configs).forEach((con) => {

    });
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
    return this.configs[page][form][key] ? this.configs[page][form][key] as IField : this.emptyObj;
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
    // console.log('asdadad', ((this.forms.get(page) as FormGroup).get(form) as FormGroup));

    // console.log(this.forms.get(page));
    // console.log((this.forms.get(page) as FormGroup).get(form));
    // console.log(((this.forms.get(page) as FormGroup).get(form) as FormGroup).get(field.name) as FormControl);
    // console.log(this.forms);


    if (((this.forms.get(page) as FormGroup).get(form) as FormGroup).get(field.name)) {
      return ((this.forms.get(page) as FormGroup).get(form) as FormGroup).get(field.name) as FormControl;
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


      return ((this.forms.get(page) as FormGroup).get(form) as FormGroup);
    } else {
      return new FormGroup({});
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
    console.log('config', config);
    Object.keys(config).forEach((page) => {
      const newForm = {};
      console.log(page); // home
      const formObj = config[page];
      if (formObj) {
        Object.keys(formObj).forEach((form) => {
          console.log(form); // control || ui
          const formArray = {};
          const forM: any = formObj[form];
          // console.log(forM);
          // console.log(form);
          Object.keys(forM).forEach((key) => {
            const field: IField = forM[key];
            const validatorS = this.buildValidators(field.validators);
            const controL = [];
            controL.push(field.value ? field.value : '');
            controL.push(validatorS);
            // console.log(controL);
            formArray[field.name] = controL;
          });
          newForm[form] = this.fb.group(formArray);
          console.log('array', newForm);
          this.addForm(this.fb.group(newForm), page);
        });
        // console.log(this.fb.group(newForm));
      }
    });
  }
}
