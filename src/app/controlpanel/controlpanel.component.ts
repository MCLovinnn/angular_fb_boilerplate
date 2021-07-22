import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  optionsConfig,
  FormService,
  ConfigService
} from '../../../projects/formbuilder/src/public-api';
import { FieldService } from '../services/field.service';

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

  allControlls: any;
  isLinear = true;
  form2: FormGroup;

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
    private configS: ConfigService,
    private fieldS: FieldService
  ) {
    // this.form = new Form(this.controlPanelConfig);
    // fs.addConfig({ home: { control: controlPanelConfig } });
    this.form = fs.getForm('home_control');
    // console.log(fs.forms);
    // console.log(fs.configs);
    // console.log(this.allControlls);
  }

  reset() {
    this.fs.getForm('home_control').reset();
  }

  ngOnInit() {
    this.configS.dataChange.subscribe(data => {
      // console.log(data);
      for (const [key, value] of Object.entries(data)) {
        // console.log(value);
        this.allControlls = value.children;
      }
      // this.allControlls = data;
    });

    // this.allControlls = this.fs.getConfigs();
    // console.log(this.allControlls);

    this.fieldchange.subscribe(value => {
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
          this.fs
            .getFormControl(this.fs.getConfigByName('home_ui_new'))
            .patchValue(value.value);
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
