import { FormControl, FormGroup } from '@angular/forms';
import { IField, IFormObj } from './ifield';

export interface IForm {
  form: FormGroup;
  name: string;

  getForm(name: string): FormGroup;

}
