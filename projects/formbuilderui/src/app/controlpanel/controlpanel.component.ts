import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IAutoCompleteOptions,
  FormService,
  ConfigService,
  TranslationService,
  ITableHeader,
  ITableViewOptions,
  TableComponent,
  ICodeEntry,
  TableType
} from '../../../../formbuilder/src/public-api';
import { FieldService } from '../services/field.service';
import { FieldComponent } from '../field/field.component';
import { ConnectorService } from '../services/connector.service';
import { ISliderConfig } from '../../../../formbuilder/src/lib/interfaces/isliderconfig';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {
  @Output() fieldchange: EventEmitter<any> = new EventEmitter();
  @Input() form: FormGroup;
  @Input() disabledEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() requiredEmitter: EventEmitter<string> = new EventEmitter();
  @Input() clearValue: EventEmitter<any> = new EventEmitter();
  @ViewChild('selectOpt') selectTabletable: TableComponent;
  typeChange: EventEmitter<any> = new EventEmitter();
  options = [];
  selectOptions: ICodeEntry[] = [];
  autoCompleteConfig: IAutoCompleteOptions = {
    groupBy: true
  };
  optionForm: FormGroup;
  internalType = 'text';

  allControlls: any;
  isLinear = true;
  displayedColumns: ITableHeader[] = [
    {
      collumnName: 'key'
    },
    {
      collumnName: 'value'
    },
    {
      collumnName: 'description'
    }
  ];
  viewOptions: ITableViewOptions = {
    type: TableType.GENERIC,
    searchable: false,
    showPaginator: false,
    showActions: true,
    showCSVExport: false,
    showCheckbox: true,
    showDeleteAllButton: true
  };

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
    private configS: ConfigService,
    private fieldS: FieldService,
    public ts: TranslationService,
    private cs: ConnectorService,
    private cd: ChangeDetectorRef
  ) {
    this.form = fs.getForm('home_control');
    this.optionForm = fs.getForm('home_select');
  }

  reset() {
    this.fs.resetForms();

    const field = this.fs.getFieldByName(this.fieldS.get()) as FieldComponent;
    field.placeholder = 'home_ui_new';
    field.internalType = 'text';

    field.ngOnInit();
    this.fieldS.set('home_ui_new');
  }

  ngOnInit() {
    this.fieldS.change().subscribe(val => {
      const conf = this.fs.getConfigByName(val);
      const type = conf.htmlType;
      this.internalType = type;
      this.selectOptions = conf.options ? conf.options : [];
      let field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
      field.options = this.selectOptions;
      field.internalType = type;
      field.control.patchValue(conf.value);
      field.changeValidators(conf.validators);

      this.fs
        .getFormControl({ name: 'home_control_value' })
        .patchValue(conf.value ? conf.value : '');

      this.fs
        .getFormControl({ name: 'home_control_type' })
        .patchValue(conf.htmlType, { emitEvent: false });

      this.fs
        .getFormControl({ name: 'home_control_name' })
        .patchValue(conf.name.split('_')[2], {
          emitEvent: false
        });

      this.fs
        .getFormControl({ name: 'home_control_hintlabel' })
        .patchValue(this.ts.data[conf.name + '#hintlabel'], {
          emitEvent: false
        });

      this.fs
        .getFormControl({ name: 'home_control_tooltip' })
        .patchValue(this.ts.data[conf.name + '#tooltip'], {
          emitEvent: false
        });

      if (conf.validators) {
        if (conf.validators.required) {
          this.fs
            .getFormControl({ name: 'home_control_required' })
            .patchValue(conf.validators.required, {
              emitEvent: false
            });
        }
        if (conf.validators.min) {
          this.fs
            .getFormControl({ name: 'home_control_min' })
            .patchValue(conf.validators.min, {
              emitEvent: false
            });
        }
        if (conf.validators.max) {
          this.fs
          .getFormControl({ name: 'home_control_max' })
          .patchValue(conf.validators.max, {
            emitEvent: false
          });
        }
        if (conf.validators.minLength) {
          this.fs
            .getFormControl({ name: 'home_control_minLength' })
            .patchValue(conf.validators.minLength, {
              emitEvent: false
            });
        }
        if (conf.validators.maxLength) {
          this.fs
            .getFormControl({ name: 'home_control_maxLength' })
            .patchValue(conf.validators.maxLength, {
              emitEvent: false
            });
        }
      }

      if (conf.disabled) {
        this.fs
          .getFormControl({ name: 'home_control_disabled' })
          .patchValue(conf.disabled, {
            emitEvent: false
          });
      }
      if(conf.htmlType === 'slider' && conf.config) {
        const sliderConf = conf.config as ISliderConfig;
        this.fs.getForm('home_slider').patchValue({
          home_slider_interval: sliderConf.tickInterval,
          home_slider_inverted: sliderConf.inverted,
          home_slider_step: sliderConf.step,
          home_slider_thumb: sliderConf.showThumb,
          home_slider_ticks: sliderConf.showTicks,
          home_slider_vertical: sliderConf.vertical
        });
      }
      this.cd.detectChanges();
    });

    this.clearValue.subscribe(value => {
      if (value.value === 'Test') {
        this.fs.getFormControl({ name: value.name }).reset();
        this.fs
          .getFormControl({ name: 'home_ui_new' })
          .patchValue(this.fs.getFormControl({ name: value.name }).value);
      } else {
        this.fs.resetControl(value.name);
        this.fs.getFormControl({ name: 'home_ui_new' }).patchValue('');
      }
    });
    this.typeChange.subscribe(val => {
      if (val) {
        const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
        field.internalType = val.value;
        this.internalType = val.value;
      }
    });

    this.fieldchange.subscribe(value => {
      const actualField = this.fieldS.get();
      const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;

      const tmpConf = this.fs.getConfigByName(actualField);
      switch (value.type) {
        case 'home_control_disabled':
          tmpConf.disabled = value.value ? value.value : false;
          field.disabled = value.value ? value.value : false;

          if (value.value === true) {
            this.fs.getFormControl({ name: actualField }).disable();
          } else {
            this.fs.getFormControl({ name: actualField }).enable();
          }
          break;
        case 'home_control_required':
          const tmpVali = field.getValidators();
          tmpVali.required = value.value ? value.value : null;
          tmpConf.validators = tmpVali;
          field.required = value.value ? value.value : null;
          field.changeValidators(tmpVali);
          break;
        case 'home_slider_vertical':
          // console.log(value);
          if(value.value) {
            field.sliderOptions.vertical = value.value;
          } else {
            field.sliderOptions.vertical = false;
          }
          break;
        case 'home_slider_inverted':
          // console.log(value);
          if(value.value) {
            field.sliderOptions.inverted = value.value;
          } else {
            field.sliderOptions.inverted = false;
          }
          break;
        case 'home_slider_thumb':
          // console.log(value);
          if(value.value) {
            field.sliderOptions.showThumb = value.value;
          } else {
            field.sliderOptions.showThumb = false;
          }
          break;
        case 'home_slider_ticks':
          // console.log(value);
          if(value.value) {
            field.sliderOptions.showTicks = value.value;
          } else {
            field.sliderOptions.showTicks = false;
          }
          break;
      }
    });

    this.fs
      .getFormControl({ name: 'home_control_value' })
      .valueChanges.subscribe(val => {
        const config = this.fs.getConfigByName(this.fieldS.get());
        config.value = val ? val : '';
        this.fs
          .getFormControl({ name: this.fieldS.get() })
          .patchValue(config.value);
      });

    this.fs
      .getFormControl({ name: 'home_control_tooltip' })
      .valueChanges.subscribe(val => {
        this.ts.updateData({ [this.fieldS.get() + '#tooltip']: val });
      });

    this.fs
      .getFormControl({
        name: 'home_control_hintlabel'
      })
      .valueChanges.subscribe(val => {
        this.ts.updateData({ [this.fieldS.get() + '#hintlabel']: val });
      });

    this.fs
      .getFormControl({ name: 'home_control_name' })
      .valueChanges.subscribe(val => {
        if (val) {
          this.ts.updateData({ [this.fieldS.get() + '#label']: val });
        }
      });

    this.fs
      .getFormControl({ name: 'home_control_min' })
      .valueChanges.subscribe((val: number) => {
        const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
        const tmpVali = field.getValidators();
        const config = this.fs.getConfigByName(this.fieldS.get());

        if (val > 0) {
          tmpVali.min = val;
        } else {
          tmpVali.min = 0;
        }

        config.validators = tmpVali;
        field.changeValidators(tmpVali);
      });
    this.fs
      .getFormControl({ name: 'home_control_max' })
      .valueChanges.subscribe((val: number) => {
        const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
        const tmpVali = field.getValidators();
        const config = this.fs.getConfigByName(this.fieldS.get());
        if (val > 0) {
          tmpVali.max = val;
        } else {
          tmpVali.max = 0;
        }
        config.validators = tmpVali;
        field.changeValidators(tmpVali);
      });
    this.fs
      .getFormControl({
        name: 'home_control_minLength'
      })
      .valueChanges.subscribe((val: number) => {
        const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
        const tmpVali = field.getValidators();
        const config = this.fs.getConfigByName(this.fieldS.get());
        // console.log(tmpVali);
        // console.log(config);

        if (val > 0) {
          tmpVali.minLength = val;
        } else {
          tmpVali.minLength = 0;
        }

        config.validators = tmpVali;
        field.changeValidators(tmpVali);
      });
    this.fs
      .getFormControl({
        name: 'home_control_maxLength'
      })
      .valueChanges.subscribe((val: number) => {
        const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
        const tmpVali = field.getValidators();

        const config = this.fs.getConfigByName(this.fieldS.get());

        if (val > 0) {
          tmpVali.maxLength = val;
        } else {
          tmpVali.maxLength = 0;
        }
        config.validators = tmpVali;
        field.changeValidators(tmpVali);
      });

    this.fs
      .getFormControl({
        name: 'home_slider_step'
      })
      .valueChanges.subscribe((val: number) => {
        console.log(val);

        const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;

        if (val > 0) {
          field.sliderOptions.step = val;
        } else {
          field.sliderOptions.step = 1;
        }
      });
    this.fs
      .getFormControl({
        name: 'home_slider_interval'
      })
      .valueChanges.subscribe((val: number) => {
        console.log(val);
        const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;

        if (val > 0) {
          field.sliderOptions.tickInterval = val;
        } else {
          field.sliderOptions.tickInterval = 0;
        }
      });
  }

  addSelectOption() {
    const form = this.fs.getForm('home_select_selectName');
    const raw = form.getRawValue();
    const actualField = this.fieldS.get();
    const name =
      actualField + '_Opt_' + raw.home_select_selectName.toLowerCase();
    const tmpObj: ICodeEntry = {
      key: name,
      value: raw.home_select_selectValue,
      description: name + '#desc'
    };

    this.selectOptions.push(tmpObj);

    let lngObj = {
      [tmpObj.key]: raw.home_select_selectName
    };
    if (tmpObj.description) {
      Object.assign(lngObj, {
        [tmpObj.description]: raw.home_select_selectCode
      });
    }
    this.ts.updateData(lngObj);

    let tmpConf = this.fs.getConfigByName(actualField);
    tmpConf.options = this.selectOptions;

    const selectF = this.fs.getFieldByName(actualField) as FieldComponent;
    selectF.options = this.selectOptions;
    form.reset();
  }

  deleteSelectOption(options: any[]) {
    const actualField = this.fieldS.get();
    options.forEach(element => {
      const name = actualField + '_Opt_' + element.value;
      const tmpObj: ICodeEntry = {
        key: name,
        value: element.value,
        description: name + '#desc'
      };

      this.selectOptions = this.selectOptions.filter(
        (val: ICodeEntry) => val.value !== tmpObj.value
      );

      this.cs.delete('lang/', name).subscribe(val => {
        console.log(val);

      })

      delete this.ts.data[tmpObj.key];

      if (tmpObj.description) {
        delete this.ts.data[tmpObj.description];
      }

      let tmpConf = this.fs.getConfigByName(actualField);
      tmpConf.options = this.selectOptions;

      const selectF = this.fs.getFieldByName(actualField) as FieldComponent;
      selectF.options = this.selectOptions;
    });
  }

  generateConfig() {
    this.cs
      .doPost('config/', this.ts.lang, this.configS.configs)
      .subscribe(val => console.log(val));
  }

  isValid() {
    return this.optionForm.valid;
  }

  showInterval() {
    return this.fs.getFormControl({name: 'home_slider_ticks'}).value;
  }
}
