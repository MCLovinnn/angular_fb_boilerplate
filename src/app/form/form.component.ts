import { Component, OnInit, EventEmitter } from '@angular/core';
import { TranslationService, ConfigService, FormService, DataConnectorService, IField, MenuNode } from '../../../projects/formbuilder/src/public-api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldService } from '../services/field.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  dataSource: MenuNode[];
  // title = 'angular-formbuilder';
  form: FormGroup;
  form2: FormGroup;

  field: IField;
  type: EventEmitter<string> = new EventEmitter();
  disabled: EventEmitter<boolean> = new EventEmitter();
  dis = false;
  placeholderE: EventEmitter<boolean> = new EventEmitter();
  placeholder = '';
  hintlabel: EventEmitter<string> = new EventEmitter();
  label = '';
  tooltip: EventEmitter<string> = new EventEmitter();
  tlp = '';

  minLE: EventEmitter<string> = new EventEmitter();
  minLength: number;

  maxLE: EventEmitter<string> = new EventEmitter();
  maxLength: number;

  minE: EventEmitter<string> = new EventEmitter();
  min: number;

  maxE: EventEmitter<string> = new EventEmitter();
  max: number;

  reqE: EventEmitter<string> = new EventEmitter();
  required: boolean;

  constructor(private ds: DataConnectorService,
    public fb: FormBuilder,
    public fs: FormService,
    private fieldS: FieldService,
    private configS: ConfigService,
    public ts: TranslationService) {

    // fs.addConfig({ home: { ui: fieldConfig } });
    // fs.addConfig({settings: { list: allergene}});
    this.form = this.fs.getForm('home_ui');
    // this.form2 = this.fs.getForm('settings_list');
    // console.log(this.form2);

    /*ds.getFields().subscribe((res: any) => {
      console.log(res);
      this.fields = res;
    });*/
  }

  ngOnInit() {
    this.disabled.subscribe((value) => {
      this.dis = value;
      // console.log('dis', this.dis);
      if (value) {
        this.fs.getFormControl(this.fs.getConfigByName(this.fieldS.get())).disable();
      } else {
        this.fs.getFormControl(this.fs.getConfigByName(this.fieldS.get())).enable();
      }
      this.fs.getFormControl(this.fs.getConfigByName(this.fieldS.get())).updateValueAndValidity();
    });
    this.hintlabel.subscribe((value) => {
      // console.log(value);

      this.label = value;
    });
    this.tooltip.subscribe((value) => {
      this.tlp = value;
    });
    this.maxE.subscribe((value: number) => {
      this.max = value;
    });
    this.placeholderE.subscribe((value: string) => {
      // this.fs.getFormControl('test');
      if (this.fs.getFormControl(this.fs.getConfigByName('home_control_name')).valid && value !== '') {
        this.placeholder = value;
        // console.log(this.placeholder);
      }
    });
    this.minE.subscribe((value: number) => {
      this.min = value;
    });
    this.minLE.subscribe((value: number) => {
      this.minLength = value;
    });
    this.maxLE.subscribe((value: number) => {
      this.maxLength = value;
    });
    this.reqE.subscribe((value: boolean) => {
      if (value) {
        // this.form.controls['test'].;
        this.required = value;
        // console.log('hi', value);
      } else {
        this.required = value;
      }
    });
  }

}
