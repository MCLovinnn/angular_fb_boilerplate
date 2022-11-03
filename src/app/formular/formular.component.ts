import { Component, OnInit, Input } from '@angular/core';
import { IFormular } from '../formular';
import { FormularService } from '../services/formular.service';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { ISliderConfig } from 'projects/formbuilder/src/lib/interfaces/isliderconfig';
import { IAutoCompleteOptions, FormService } from 'projects/formbuilder/src/public-api';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularComponent implements OnInit {
  @Input() formular: IFormular;
  form: FormGroup;
  update = false;
  backup: IFormular;

  autoCompleteConfig: IAutoCompleteOptions = {
    groupBy: true
  };

  sliderOptions: ISliderConfig = {
    inverted: false,
    showThumb: true,
    showTicks: true,
    step: 5,
    tickInterval: 1,
    vertical: false
  };

  autocompleteOptions = [
    {
      name: 'Test',
      children: [{ name: 'Option' }, { name: 'Test' }, { name: 'Kategory ' }]
    }
  ];
  constructor(private fs: FormService, private formS: FormularService) {}

  ngOnInit(): void {
    if (this.formular) {
      this.setForm(this.formular);
    }
  }

  isValid() {
    return this.fs.getForm('home_test').valid;
  }

  public setForm(formular: IFormular) {
    this.fs.getForm('home_test').patchValue(formular);
    this.formular = formular;
    this.update = true;
    this.backup = Object.assign({}, formular);
  }

  public save() {
    const date = this.fs.getFormControl({ name: 'home_test_date' });

    if (!moment.isMoment(date.value)) {
      date.patchValue(moment(date.value, 'L', 'de', true));
    }
    const tmpData: IFormular = this.fs.getForm('home_test').getRawValue();
    tmpData.home_test_date = date.value.format('L');
    // console.log(tmpData);


    this.fs.resetForms();
    this.fs.getForm('home_test').markAsUntouched();
  }
}
