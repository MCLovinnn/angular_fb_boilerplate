import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { DateAdapter } from '@angular/material/core';
import { TranslationService } from '../../services/translation.service';
import * as moment from 'moment';


@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends BaseFieldComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public fs: FormService,
    private dateAdapter: DateAdapter<any>,
    public ts: TranslationService) {
    super(fb, fs, ts);
    dateAdapter.setLocale(ts.lang);

    ts.onLangChange.subscribe(lang => dateAdapter.setLocale(lang));
  }

  ngOnInit() {
    super.ngOnInit();
  }

  isMoment(date: FormControl) {
    if(!moment.isMoment(date.value)) {
      date.patchValue(moment(date.value, 'L', 'de', true));
    }
  }

  keyup(){
    this.isMoment(this.control);
    this.control.patchValue(this.control.value.add(1, 'd'));
  }

  keydown(){
    this.isMoment(this.control);
    this.control.patchValue(this.control.value.subtract(1, 'd'));
  }
}
