import { IField, IHTMLAttributes } from '../interfaces/ifield';
import { ICustomValidation } from '../interfaces/icustom-validation';
import { IValidator } from '../interfaces/ivalidator';
import { EventEmitter, Input, OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormService } from '../services/form.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-base-field',
  template: '<div></div>'
})
export class BaseFieldComponent implements IField, OnInit {
  private readonly MSGerrors = {
    required: () => this.ts.data.required_error,
    maxlength: param => this.ts.data.minLength_error.replace('${param}', param.requiredLength),
    minlength: param => this.ts.data.minLength_error.replace('${param}', param.requiredLength),
    max: param => this.ts.data.max_error.replace('${param}', param.max),
    min: param => this.ts.data.min_error.replace('${param}', param.min),
    pattern: param => this.ts.data.pattern_error.replace('${param}', param.requiredPattern),
    email: () => this.ts.data.email_error,
    matDatepickerParse: () => this.ts.data.datepicker_error
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
  @Input() iconAction: EventEmitter<any> = new EventEmitter();
  @Input() validators: IValidator;
  @Input() customValidation: ICustomValidation[];
  @Input() htmlAttribute: IHTMLAttributes;
  @Input() autocomplete = 'off';


  @Input() change: EventEmitter<any> = new EventEmitter();
  init = true;
  field: IField;

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
    public ts: TranslationService
  ) {}

  get(): BaseFieldComponent {
    return this;
  }

  getErrorMeesage() {
    if (this.control) {
      for (const error in this.control.errors) {
        if (
          (this.control.errors.hasOwnProperty(error) && this.control.touched) ||
          this.control.dirty
        ) {
          return this.getMeesage(error, this.control.errors[error]);
        }
      }
    }
  }

  getMeesage(type: string, param: any) {
    // console.log(type);
    if(this.MSGerrors[type](param)) {
      return this.MSGerrors[type](param);
    }
  }

  ngOnInit(): void {
    this.field = this.fs.getConfigByName(
      this.placeholder ? this.placeholder : this.name
    );

    this.setUpConfig(this.field);
    this.form = this.fs.getForm(this.field.name);
    // console.log(this.field);
    // console.log(this.name);

    this.control = this.fs.getFormControl(this.field);
    // console.log(this.control);

    if(this.init) {
      this.fs.addField(this);
    }
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
    // console.log(this.required);

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
    this.iconBtn = config.icon? config.icon: this.iconBtn;

    if (config.htmlAttribute && config.htmlAttribute.autocomplete) {
      this.autocomplete = config.htmlAttribute.autocomplete;
    }

    if(this.field.disabled && this.control) {
      this.control.disable();
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

  getValidators() {
    return this.validators? this.validators : {};
  }

  getFieldConfig() {
    return this as IField;
  }
  iconAct() {
    this.iconAction.emit(
      {
        name: this.getName(),
        value: this.getValue(),
        btn: this.iconBtn
      }
    );
  }
}
