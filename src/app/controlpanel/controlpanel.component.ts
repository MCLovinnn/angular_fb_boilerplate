import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  optionsConfig,
  FormService,
  ConfigService,
  TranslationService
} from '../../../projects/formbuilder/src/public-api';
import { FieldService } from '../services/field.service';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {
  @Output() fieldchange: EventEmitter<any> = new EventEmitter();
  @Input() form: FormGroup;
  @Input() control: FormControl;
  @Input() disabledEmitter: EventEmitter<boolean> = new EventEmitter();
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
    private fieldS: FieldService,
    public ts: TranslationService
  ) {
    this.form = fs.getForm('home_control');

    fs.getFormControl({name: 'home_control_tooltip'}).valueChanges.subscribe(val => {
      // console.log(val);

      ts.updateData({[fieldS.get()+ '#tooltip']: val});
    });

    fs.getFormControl({name: 'home_control_hintlabel'}).valueChanges.subscribe(val => {
      // console.log(val);

      ts.updateData({[fieldS.get()+ '#hintlabel']: val});
    });

    fs.getFormControl({name: 'home_control_type'}).valueChanges.subscribe(val => {
      if(val) {
        let field = fs.getFieldByName(fieldS.get()) as FieldComponent;
        field.internalType = val;
      }
    });

    fs.getFormControl({name: 'home_control_name'}).valueChanges.subscribe(val => {
      // console.log(val);

      if(val) {
        ts.updateData({[fieldS.get()+ '#label']: val});
      }
    });

    fs.getFormControl({name: 'home_control_value'}).valueChanges.subscribe(val => {
      // console.log(val);

      if(val) {
        fs.getFormControl({name: fieldS.get()}).patchValue(val);
      }
    });
  }

  reset() {
    this.fs.getForm('home_control').reset();

    let field = this.fs.getFieldByName(this.fieldS.get()) as FieldComponent;
    field.placeholder = 'home_ui_new';
    field.internalType = 'text';

    field.ngOnInit();
    this.fieldS.set('home_ui_new');
  }

  ngOnInit() {
    this.configS.dataChange.subscribe(data => {
      // console.log(data);
      for (const [key, value] of Object.entries(data)) {
        // console.log(value);
        this.allControlls = value.children;
      }
    });

    this.fieldchange.subscribe(value => {
      // console.log(value);
      switch (value.type) {
        case 'home_control_disabled':
          this.disabledEmitter.emit(value.value);
          break;
        case 'home_control_required':
          this.requiredEmitter.emit(value.value);
          break;
      }
    });
  }
}
