import { IField, IHTMLAttributes } from '../interfaces/ifield';
import { ICustomValidation } from '../interfaces/icustom-validation';
import { IValidator } from '../interfaces/ivalidator';
import { EventEmitter, Input, OnInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../services/form.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-base-field',
  template: '<div></div>'
})
export class BaseFieldComponent implements IField, OnInit {
  private readonly MSGerrors = {
    required: () => 'Das ist ein Pflichtfeld!',
    maxlength: param => `Maximale Länge ${param.requiredLength}!`,
    minlength: param => `Mindestens ${param.requiredLength} Zeichen eingeben!`,
    max: param => `Maximum beträgt ${param.min}!`,
    min: param => `Minimum beträgt ${param.max}!`,
    pattern: param =>
      `Das Pattern: <b>${param.pattern}</b> wurde nicht eingehalten!`,
    email: () => 'Keine valide Emailadresse'
  };

  @Input() name = 'home_ui_new';

  @Input() value = '';
  @Input() placeholder: string;
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
    public ts: TranslationService
  ) {}

  get(): BaseFieldComponent {
    return this;
  }

  getErrorMeesage() {
    // console.log('geterror', this.control);
    if (this.control) {
      for (const error in this.control.errors) {
        if (
          (this.control.errors.hasOwnProperty(error) && this.control.touched) ||
          this.control.dirty
        ) {
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
    const field = this.fs.getConfigByName(
      this.placeholder ? this.placeholder : this.name
    );

    this.setUpConfig(field);
    this.form = this.fs.getForm(field.name);
    this.control = this.fs.getFormControl(field);

    this.fs.addField(this);
    this.init = false;
    this.control.valueChanges.subscribe(val => (this.value = val));
  }

  public setUpConfig(config: IField) {
    this.hint = config.hint;
    this.hintlabel = config.hintlabel;

    if (!this.hintlabel) {
      this.hintlabel = config.name + '#hintlabel';
    }

    let tmpReq = false;
    let tmpDis = false;

    if (this.init) {
      tmpReq = this.required ? this.required : null;
      tmpDis = this.disabled ? this.disabled : null;
    }

    this.validators = config.validators;
    this.disabled = config.disabled ? config.disabled : tmpDis;
    this.required = config.validators ? config.validators.required : tmpReq;
    this.max = config.validators
      ? config.validators.max
      : this.max
      ? this.max
      : null;
    this.min = config.validators
      ? config.validators.min
      : this.min
      ? this.min
      : null;
    this.maxLength = config.validators
      ? config.validators.maxLength
      : this.maxLength
      ? this.maxLength
      : null;
    this.minLength = config.validators
      ? config.validators.minLength
      : this.minLength
      ? this.minLength
      : null;
    this.value = config.value || '';
    this.htmlType = config.htmlType ? config.htmlType : this.htmlType;

    if (config.htmlAttribute && config.htmlAttribute.autocomplete) {
      this.autocomplete = config.htmlAttribute.autocomplete;
    }
    this.synchronizeValidator();
  }

  getValue() {
    return this.ts.data[this.value + '#label'] || this.value;
  }

  getName() {
    return this.placeholder ? this.placeholder : this.name;
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
