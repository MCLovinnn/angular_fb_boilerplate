import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  actualField: BehaviorSubject<string> = new BehaviorSubject('');
  field: string;

  constructor() { }

  change() {
    return this.actualField;
  }

  get(){
    return this.field;
  }

  set(val) {
    this.actualField.next(val);
    this.field = val;
  }
}
