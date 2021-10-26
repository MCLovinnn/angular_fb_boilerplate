import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  optionsConfig,
  FormService,
  ConfigService,
  TranslationService,
  ITableHeader,
  ITableViewOptions,
  TableComponent,
  ICodeEntry
} from '../../../../formbuilder/src/public-api';
import { FieldService } from '../services/field.service';
import { FieldComponent } from '../field/field.component';
import { ConnectorService } from '../services/connector.service';

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
  autoCompleteConfig: optionsConfig = {
    groupBy: true
  };
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
    private cs: ConnectorService
  ) {
    this.form = fs.getForm('home_control');
  }

  reset() {
    // this.fs.getForm('home_control').reset();
    this.fs.resetForms();

    const field = this.fs.getFieldByName(this.fieldS.get()) as FieldComponent;
    field.placeholder = 'home_ui_new';
    field.internalType = 'text';

    field.ngOnInit();
    this.fieldS.set('home_ui_new');
  }

  ngOnInit() {
    this.fieldS.change().subscribe(val => {
      // console.log(val);

      const conf = this.fs.getConfigByName(val);
      const type = conf.htmlType ? conf.htmlType : 'text';
      this.internalType = type;
      this.selectOptions = conf.options ? conf.options : [];
      let field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
      field.options = this.selectOptions;
      field.internalType = type;
      field.control.patchValue(conf.value);

      this.fs
        .getFormControl({ name: 'home_control_value' })
        .patchValue(conf.value);

      this.fs
        .getFormControl({ name: 'home_control_type' })
        .patchValue(conf.htmlType, { emitEvent: false });

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

      if (conf.validators && conf.validators.required) {
        this.fs
        .getFormControl({ name: 'home_control_required' })
        .patchValue(conf.validators.required, {
          emitEvent: false
        });
      }

      if (conf.disabled) {
        this.fs
        .getFormControl({ name: 'home_control_disabled' })
        .patchValue(conf.disabled, {
          emitEvent: false
        });
      }

    });

    this.clearValue.subscribe(value => {
      // console.log(value);
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
      // console.log(actualField);

      const field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
      // console.log(field);
      const tmpConf = this.configS.getConfigByName(actualField);
      // const control = this.fs.getFormControl(tmpConf);
      switch (value.type) {
        case 'home_control_disabled':
          tmpConf.disabled = value.value ? value.value : false;
          field.disabled = value.value ? value.value : false;

          if (value.value === true) {
            this.fs.getFormControl({ name: actualField }).disable();
          } else {
            // console.log('hi');
            this.fs.getFormControl({ name: actualField }).enable();
          }
          break;
        case 'home_control_required':
          const tmpVali = field.getValidators();
          tmpVali.required = value.value ? value.value : null;
          tmpConf.validators = tmpVali;
          field.required = value.value ? value.value : null;
          field.changeValidators(tmpVali);
          // this.fs.updateConfig(tmpConf);
          break;
      }
    });

    this.fs
      .getFormControl({ name: 'home_control_value' })
      .valueChanges.subscribe(val => {
        if (val) {
          this.fs.getFormControl({ name: this.fieldS.get() }).patchValue(val);
        } else {
          this.fs.getFormControl({ name: this.fieldS.get() }).patchValue('');
        }
      });

    this.fs
      .getFormControl({ name: 'home_control_tooltip' })
      .valueChanges.subscribe(val => {
        // console.log(val);

        this.ts.updateData({ [this.fieldS.get() + '#tooltip']: val });
      });

    this.fs
      .getFormControl({
        name: 'home_control_hintlabel'
      })
      .valueChanges.subscribe(val => {
        // console.log(val);

        this.ts.updateData({ [this.fieldS.get() + '#hintlabel']: val });
      });

    this.fs
      .getFormControl({ name: 'home_control_name' })
      .valueChanges.subscribe(val => {
        if (val) {
          this.ts.updateData({ [this.fieldS.get() + '#label']: val });
        }
        // console.log(fs.hasChanges());
      });

    this.fs
      .getFormControl({ name: 'home_control_min' })
      .valueChanges.subscribe(val => {
        const field = this.fs.getFieldByName(
          this.fieldS.get()
        ) as FieldComponent;
        const tmpVali = field.getValidators();

        if (val > 0) {
          // field.min = val;
          tmpVali.min = val;
          field.changeValidators(tmpVali);
        } else {
          tmpVali.min = 0;
          field.changeValidators(tmpVali);
        }
      });
    this.fs
      .getFormControl({ name: 'home_control_max' })
      .valueChanges.subscribe(val => {
        const field = this.fs.getFieldByName(
          this.fieldS.get()
        ) as FieldComponent;
        const tmpVali = field.getValidators();

        if (val > 0) {
          // field.min = val;
          tmpVali.max = val;
          field.changeValidators(tmpVali);
        } else {
          tmpVali.max = 0;
          field.changeValidators(tmpVali);
        }
      });
    this.fs
      .getFormControl({
        name: 'home_control_minLength'
      })
      .valueChanges.subscribe(val => {
        const field = this.fs.getFieldByName(
          this.fieldS.get()
        ) as FieldComponent;
        const tmpVali = field.getValidators();

        if (val > 0) {
          // field.min = val;
          tmpVali.minLength = val;
          field.changeValidators(tmpVali);
        } else {
          tmpVali.minLength = 0;
          field.changeValidators(tmpVali);
        }
      });
    this.fs
      .getFormControl({
        name: 'home_control_maxLength'
      })
      .valueChanges.subscribe(val => {
        const field = this.fs.getFieldByName(
          this.fieldS.get()
        ) as FieldComponent;
        const tmpVali = field.getValidators();

        if (val > 0) {
          // field.min = val;
          tmpVali.maxLength = val;
          field.changeValidators(tmpVali);
        } else {
          tmpVali.maxLength = 0;
          field.changeValidators(tmpVali);
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
    // this.fs.updateConfig(tmpConf);

    const selectF = this.fs.getFieldByName(actualField) as FieldComponent;
    selectF.options = this.selectOptions;
    form.reset();
  }

  deleteSelectOption(options: any[]) {
    // console.log(options);
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
}
