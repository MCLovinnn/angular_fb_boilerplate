import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fieldConfig, controlPanelConfig } from './config/controlPanel';
import { MenuNode, IField, FormService, ConfigService, TranslationService, DataConnectorService } from '../../projects/formbuilder/src/public-api';
import { homeTreeConfig } from './config/homeTree';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  dataSource: MenuNode[];
  // title = 'angular-formbuilder';
  form: FormGroup;
  form2: FormGroup;

  field: IField;
  type: EventEmitter<string> = new EventEmitter();
  disabled: EventEmitter<boolean> = new EventEmitter();
  dis = false;
  placeholderE: EventEmitter<boolean> = new EventEmitter();
  placeholder = 'test';
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
    private configS: ConfigService,
    public ts: TranslationService) {

    fs.addConfig(
      {
        home: {
          control: controlPanelConfig,
          ui: fieldConfig,
          tree: homeTreeConfig
        }
      });

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
        this.fs.getFormControl(this.fs.getConfigByName('home_ui_test')).disable();
      } else {
        this.fs.getFormControl(this.fs.getConfigByName('home_ui_test')).enable();
      }
    });
    this.hintlabel.subscribe((value) => {
      // console.log(value);
      // console.log('ngOnInit hintlabel');

      this.label = value;
    });
    this.tooltip.subscribe((value) => {
      this.tlp = value;
    });
    this.maxE.subscribe((value) => {
      this.max = value;
    });
    this.placeholderE.subscribe((value) => {
      // this.fs.getFormControl('test')
      if (this.fs.getFormControl(this.fs.getConfigByName('home_control_name')).valid && value !== '') {
        this.placeholder = value;
        // console.log(this.placeholder);
      }
    });
    this.minE.subscribe((value) => {
      this.min = value;
    });
    this.minLE.subscribe((value) => {
      this.minLength = value;
    });
    this.maxLE.subscribe((value) => {
      this.maxLength = value;
    });
    this.reqE.subscribe((value) => {
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

