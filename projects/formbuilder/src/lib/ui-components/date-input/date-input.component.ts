import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { DateAdapter } from '@angular/material/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends BaseFieldComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public fs: FormService,
    private dateAdapter: DateAdapter<any>,
    private ts: TranslationService) {
    super(fb, fs);
    dateAdapter.setLocale(ts.lang);

    ts.onLangChange.subscribe(lang => dateAdapter.setLocale(lang));
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
