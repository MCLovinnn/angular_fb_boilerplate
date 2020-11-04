import { IValidator } from './ivalidator';
import { ICustomValidation } from './icustom-validation';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export interface IHTMLAttributes {
  src?: string;
  step?: number;
  name?: string;
  disabled?: boolean;
  autocomplete?: string;
}

export interface IField {
  name: string;
  htmlType?: string;
  disabled?: boolean;
  validators?: IValidator;
  validatorFn?: ValidatorFn;
  asyncValidatorFn?: AsyncValidatorFn;
  customValidation?: ICustomValidation[];
  value?: any;
  placeholder?: string;
  htmlAttribute?: IHTMLAttributes;
  hint?: string;
  hintlabel?: string;
  tooltip?: string;
  tooltipposition?: string;
  tooltipdelay?: number; // in ms
  icon?: string;
  iconAction?: string;
  change?: EventEmitter<any>;
  options?: ICodeEntry[];
}

export interface IFormObj {
  name: string;
  children: IFormObj[] | IField[];
}

export interface ICodeEntry {
  value: any;
  key: string;
  description?: string;
}
