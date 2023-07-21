import { Component, OnInit, Input } from '@angular/core';
import { IFormular } from '../formular';
import { FormularService } from '../services/formular.service';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { IAutoCompleteOptions, FormService, ChipsCompleteComponent, TranslationService, FileInputComponent, ISliderConfig } from 'projects/formbuilder/src/public-api';
import { ICodeEntry } from 'formbuilder';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularComponent implements OnInit {
  @Input() formular: IFormular;
  @Input() data: IFormular[];
  form: FormGroup;
  update = false;
  backup: IFormular;
  fileInput: FileInputComponent;

  autoCompleteConfig: IAutoCompleteOptions = {
    groupBy: false,
    translate: false,
    technical: false,
    useMask: true,
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
  testOpt: ICodeEntry[] = [
    {
        "key": "Rudi",
        "value": "1"
    },
    {
        "key": "Jörg Herbst",
        "value": "10"
    },
    {
        "key": "Erin Overstreet",
        "value": "12"
    },
    {
        "key": "Sol Bobst MBA PhD DABT",
        "value": "13"
    },
    {
        "key": "Elizabeth",
        "value": "14"
    },
    {
        "key": "Dr. Sameena Sharif",
        "value": "18"
    },
    {
        "key": "William Heydorn",
        "value": "20"
    },
    {
        "key": "Rose Verhoeven",
        "value": "21"
    },
    {
        "key": "David (Dave) Edwards",
        "value": "22"
    },
    {
        "key": "Richard E. Ridgewell, PhD",
        "value": "23"
    },
    {
        "key": "Victoria Danilchouk",
        "value": "24"
    },
    {
        "key": "Ashley Milton",
        "value": "25"
    },
    {
        "key": "Benjamin Dumont",
        "value": "26"
    },
    {
        "key": "Lior Carmon",
        "value": "27"
    },
    {
        "key": "Linda Miller",
        "value": "28"
    },
    {
        "key": "Dr CD Nigel Toseland FRCPath ",
        "value": "29"
    },
    {
        "key": "detlef",
        "value": "30"
    },
    {
        "key": "Craig Thomas",
        "value": "31"
    },
    {
        "key": "Ritu Verma",
        "value": "32"
    },
    {
        "key": "Farah Virani",
        "value": "33"
    },
    {
        "key": "Lior Carmon",
        "value": "34"
    },
    {
        "key": "Andreas Bastian ",
        "value": "36"
    },
    {
        "key": "mark",
        "value": "37"
    },
    {
        "key": "Douglas M. Kremer",
        "value": "40"
    },
    {
        "key": "Guy Tremblay",
        "value": "44"
    }
];


  constructor(private fs: FormService, private formS: FormularService, public ts: TranslationService) {}

  ngOnInit(): void {
    if (this.formular) {
      this.setForm(this.formular);
    }
this.form = this.fs.getForm('home_test');
    this.fs.getFormControl({name: 'home_test_file'}).valueChanges.subscribe(val => console.log(val));
    console.log(this.form);


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

    this.data.push(tmpData);
    console.log(this.data);

    this.fs.resetForms();
    this.fs.getForm('home_test').markAsUntouched();
  }
  click() {
    console.log(this.form);

  }
}
/**
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularComponent implements OnInit {
  @Input() formular: IFormular;
  @Input() data: IFormular[];
  form: FormGroup;
  update = false;
  backup: IFormular;

  constructor(private fs: FormService) {}

  ngOnInit(): void {
    if (this.formular) {
      this.setForm(this.formular);
    }
    this.form = this.fs.getForm('home_test');

    this.form.get('home_test_file').valueChanges.subscribe(val => console.log(val));
    console.log(this.form);
  }

  isValid() {
    return this.form.valid;
  }

  public setForm(formular: IFormular) {
    this.form.patchValue(formular);
    this.formular = formular;
    this.update = true;
    this.backup = { ...formular };
  }

  public save() {
    const date = this.form.get('home_test_date');

    if (!moment.isMoment(date.value)) {
      date.patchValue(moment(date.value, 'L', 'de', true));
    }

    const tmpData: IFormular = { ...this.form.getRawValue() };
    tmpData.home_test_date = date.value.format('L');

    this.data.push(tmpData);
    console.log(this.data);

    this.fs.resetForms();
    this.form.markAsUntouched();
  }

  click() {
    console.log(this.form);
  }
}
 */
