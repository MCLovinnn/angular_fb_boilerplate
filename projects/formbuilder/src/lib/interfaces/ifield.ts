import { IValidator } from './ivalidator';
import { ICustomValidation } from './icustom-validation';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ISliderConfig } from './isliderconfig';
import { ITableViewOptions } from '../ui-components/table/table.component';
import { IAutoCompleteOptions } from './iautocompleteoption';

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
  iconAction?: EventEmitter<any>;
  change?: EventEmitter<any>;
  updateOn?: 'change' | 'blur' | 'submit';
  options?: ICodeEntry[];
  config?: ISliderConfig | ITableViewOptions | IAutoCompleteOptions;
  multiple?: boolean;
  canAdd?: boolean;
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
