import { IField, IHTMLAttributes } from '../interfaces/ifield';
import { ICustomValidation } from '../interfaces/icustom-validation';
import { IValidator } from '../interfaces/ivalidator';
import { EventEmitter, Input, OnInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-base-field',
  template: '<div></div>'
})
export class BaseFieldComponent implements IField, OnInit {

  private readonly MSGerrors = {
    required: () => 'Das ist ein Pflichtfeld!',
    maxlength: (param) => `Maximale Länge ${param.requiredLength}!`,
    minlength: (param) => `Mindestens ${param.requiredLength} Zeichen eingeben!`,
    max: (param) => `Maximum beträgt ${param.min}!`,
    min: (param) => `Minimum beträgt ${param.max}!`,
    pattern: (param) => `Das Pattern: <b>${param.pattern}</b> wurde nicht eingehalten!`,
    email: () => 'Keine valide Emailadresse'
  };

  types: any[] = [
    { value: 'select', viewValue: 'Select' },
    { value: 'text', viewValue: 'Text' },
    { value: 'checkbox', viewValue: 'Checkbox' },
    { value: 'date', viewValue: 'Datum' }
  ];


  @Input() name = 'home_ui_test';

  @Input() value = '';
  @Input() placeholder = 'test';
  @Input() disabled = false;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() min: number;
  @Input() max: number;
  @Input() required: boolean;
  @Input() form: FormGroup;
  @Input() control: FormControl;
  @Input() hintlabel = '';
  @Input() hint = '';
  @Input() tooltip = '';
  @Input() htmlType = 'text';
  @Input() iconBtn: string;
  @Input() iconAction: '';
  @Input() validators: IValidator;
  @Input() customValidation: ICustomValidation[];
  @Input() htmlAttribute: IHTMLAttributes;
  @Input() autocomplete = 'on';



  @Input() change: EventEmitter<any> = new EventEmitter();
  init = true;

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
  ) {

  }

  get(): BaseFieldComponent {
    return this;
  }

  getErrorMeesage() {
    // console.log('geterror', this.control);
    if (this.control) {
      for (const error in this.control.errors) {
        if (this.control.errors.hasOwnProperty(error) && this.control.touched || this.control.dirty) {
          // console.log(error);
          return this.getMeesage(error, this.control.errors[error]);
        }
      }
    }
  }

  getMeesage(type: string, param: any) {
    // console.log(param);
    // console.log('msgs', Field.MSGerrors[type](param));
    return this.MSGerrors[type](param);
  }

  ngOnInit(): void {
    const field = this.fs.getConfigByName(this.name);
    // console.log(field);

    this.setUpConfig(field);
    this.form = this.fs.getForm(this.name);
    // console.log(this.form);
    this.control = this.fs.getFormControl(field);
    // console.log(this.control);

  }

  setUpConfig(config: IField) {
    // console.log(config);
    this.placeholder = config.placeholder;
    this.hint = config.hint;
    this.hintlabel = config.hintlabel;
    if(!this.hintlabel) {
      this.hintlabel = this.name+'#hintlabel';
    }
    this.validators = config.validators;
    this.disabled = this.disabled ? this.disabled : config.disabled;
    this.required = this.required ? this.required : config.validators ? config.validators.required : null;
    this.max = this.max ? this.max : config.validators ? config.validators.max : null;
    this.min = this.min ? this.min : config.validators ? config.validators.min : null;
    this.maxLength = this.maxLength ? this.maxLength : config.validators ? config.validators.maxLength : null;
    this.minLength = this.minLength ? this.minLength : config.validators ? config.validators.minLength : null;
    this.value = config.value || '';
    this.htmlType = config.htmlType ? config.htmlType : this.htmlType;
    this.placeholder = this.placeholder !== 'test' && this.placeholder !== '' ?
      this.placeholder : this.name;

    if (config.htmlAttribute && config.htmlAttribute.autocomplete) {
      this.autocomplete = config.htmlAttribute.autocomplete;
    }
    this.synchronizeValidator();
  }

  synchronizeValidator() {
    const newValidators: IValidator = {};
    if (this.required) {
      newValidators.required = this.required;
    }
    if (this.max) {
      newValidators.max = this.max;
    }
    if (this.min) {
      newValidators.min = this.min;
    }
    if (this.maxLength) {
      newValidators.maxLength = this.maxLength;
    }
    if (this.minLength) {
      newValidators.minLength = this.minLength;
    }
    if (this.validators && this.validators.pattern) {
      newValidators.pattern = this.validators.pattern;
    }
    if (this.validators && this.validators.email) {
      newValidators.email = this.validators.email;
    }
    this.validators = newValidators;
  }

  getFieldConfig() {
    return {
      name: this.name,
      htmlType: this.htmlType,
      validators: this.validators
    } as IField;
  }
}
