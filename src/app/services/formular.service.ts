import { Injectable, EventEmitter } from '@angular/core';
import { IFormular } from '../formular';

@Injectable({
  providedIn: 'root'
})
export class FormularService {
  forms: IFormular[] = [];
  formChange: EventEmitter<IFormular[]> = new EventEmitter();
  constructor() {
    this.formChange.subscribe((form: IFormular[]) => {
      this.forms = form;
    });
  }

  add(formular: IFormular) {
    const newForms = this.forms;
    newForms.push(formular);
    // console.log(newForms);

    this.formChange.emit(newForms);
  }

  get(){
    return this.formChange;
  }
}
