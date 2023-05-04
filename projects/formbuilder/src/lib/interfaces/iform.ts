import { FormControl, UntypedFormGroup } from '@angular/forms';
import { IField, IFormObj } from './ifield';

export interface IForm {
  form: UntypedFormGroup;
  name: string;

  getForm(name: string): UntypedFormGroup;
}
