import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {
  functionType,
  operatorType,
  actionType,
  controlPanelConfig
} from '..//config/controlPanel';
import { optionsConfig, FormService, ConfigService } from '../../../projects/formbuilder/src/public-api';


@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {

  @Output() fieldchange: EventEmitter<any> = new EventEmitter();
  @Input() form: FormGroup;
  @Input() control: FormControl;
  @Input() nameEmitter: EventEmitter<string> = new EventEmitter();
  @Input() type: EventEmitter<string> = new EventEmitter();
  @Input() disabledEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() validatorsEmitter: EventEmitter<any> = new EventEmitter();
  @Input() hintlabelEmitter: EventEmitter<string> = new EventEmitter();
  @Input() tooltipEmitter: EventEmitter<string> = new EventEmitter();
  @Input() placeholderE: EventEmitter<string> = new EventEmitter();
  @Input() minLEmitter: EventEmitter<string> = new EventEmitter();
  @Input() maxLEmitter: EventEmitter<string> = new EventEmitter();
  @Input() minEmitter: EventEmitter<string> = new EventEmitter();
  @Input() maxEmitter: EventEmitter<string> = new EventEmitter();
  @Input() requiredEmitter: EventEmitter<string> = new EventEmitter();

  autoCompleteConfig: optionsConfig = {
    groupBy: true
  };
  internalType = 'text';

  types: any[] = [
    { value: 'select', key: 'Select' },
    { value: 'text', key: 'Text' },
    { value: 'checkbox', key: 'Checkbox' },
    { value: 'date', key: 'Datum' }
  ];
  functionType = functionType;
  operatorType = operatorType;
  actionType = actionType;
  allControlls: any;
  isLinear = true;
  form2: FormGroup;

  constructor(public fb: FormBuilder,
    public fs: FormService,
    private configS: ConfigService) {
    // this.form = new Form(this.controlPanelConfig);
    this.allControlls = configS.getControlls();
    // fs.addConfig({ home: { control: controlPanelConfig } });

    this.form = this.fs.getForm('home_control');
    // console.log(fs.forms);
    // console.log(fs.configs);

    fs.updateConfig({
      name: 'home_control_tooltip',
      placeholder: 'Update',
      htmlType: 'text',
      hintlabel: 'updateed?',
      validators: {
        required: false
      }
    });
    // console.log(this.allControlls);
  }

  ngOnInit() {
    // console.log(this.control);
    // console.log(this.form);
    // console.log('actiontypes', actionType);


    // this.allControlls = Object.keys(this.fs.getForms());
    this.allControlls = Object.values(this.configS.getControlls());
    // console.log('controlls', this.allControlls);
    this.fieldchange.subscribe((value) => {
      // console.log(value);
      switch (value.type) {
        case 'home_control_name':
          // console.log(this.control);
          // console.log('hi');
          this.nameEmitter.emit(value.value);
          break;
        case 'home_control_type':
          this.type.emit(value.value);
          this.internalType = value.value;
          break;
        case 'home_control_disabled':
          this.disabledEmitter.emit(value.value);
          break;
        case 'home_control_validators':
          this.validatorsEmitter.emit(value.value);
          break;
        case 'home_control_value':
          this.fs.getFormControl(this.fs.getConfigByName('home_control_test')).patchValue(value.value);
          break;
        case 'home_control_hintlabel':
          this.hintlabelEmitter.emit(value.value);
          break;
        case 'home_control_tooltip':
          this.tooltipEmitter.emit(value.value);
          break;
        case 'home_control_required':
          this.requiredEmitter.emit(value.value);
          break;
        case 'home_control_min':
          this.minEmitter.emit(value.value);
          break;
        case 'home_control_max':
          this.maxLEmitter.emit(value.value);
          break;
      }
    });
  }
}
