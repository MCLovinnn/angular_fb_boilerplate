import { Component, OnInit, Input } from '@angular/core';
import { optionsConfig, FormService } from 'projects/formbuilder/src/public-api';
import { IFormular } from '../formular';
import { FormularService } from '../services/formular.service';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularComponent implements OnInit {
  @Input() formular: IFormular;
  form: FormGroup
  autoCompleteConfig: optionsConfig = {
    groupBy: true
  };

  autocompleteOptions = [
    {
      name: 'Test',
      children: [
        {name: 'Option'},
        {name: 'Test'},
        {name: 'Kategory '}
      ]
    }
  ];
  constructor(private fs: FormService, private formS: FormularService) { }

  ngOnInit(): void {
    if(this.formular) {
      this.setForm(this.formular);
    }
  }

  isValid() {
    return this.fs.getForm('home_test').valid;
  }

  public setForm(formular: IFormular) {
    this.fs.getForm('home_test').patchValue(formular);
    this.formular = formular;
  }

  public save() {
    let date = this.fs.getFormControl({name: 'home_test_date'});

    if(!moment.isMoment(date.value)) {
      date.patchValue(moment(date.value, 'L', 'de', true));
    }
    let tmpData: IFormular = this.fs.getForm('home_test').getRawValue();
    tmpData.home_test_date = date.value.format('L');
    // console.log(this.fs.getForm('home_test_text').getRawValue());

    this.formS.add(tmpData);
  }
}
