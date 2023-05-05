import { FormGroup } from '@angular/forms';

export interface IForm {
  form: FormGroup;
  name: string;

  getForm(name: string): FormGroup;
}
