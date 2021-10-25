import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  actualField: BehaviorSubject<string> = new BehaviorSubject('');
  field = '';

  constructor() { }

  change() {
    return this.actualField;
  }

  get(){
    return this.field;
  }

  set(val: any) {
    this.actualField.next(val);
    this.field = val;
  }
}
