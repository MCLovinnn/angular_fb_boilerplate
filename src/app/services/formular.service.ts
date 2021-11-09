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

  update(oldEntry: IFormular, entry: IFormular) {
    const newForms = this.forms;
    let index = newForms.indexOf(oldEntry);

    if (index >= 0) {
      newForms[index] = entry;
      this.formChange.emit(newForms);
    }
  }

  delete(entry: IFormular) {
    const newForms = this.forms;
    let index = newForms.indexOf(entry);

    if (index >= 0) {
      newForms.splice(index,1);
      this.formChange.emit(newForms);
    }
  }
}
