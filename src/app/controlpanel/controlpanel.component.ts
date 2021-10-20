import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  optionsConfig,
  FormService,
  ConfigService,
  TranslationService,
  ITableHeader,
  ITableViewOptions,
  TableType,
  TableComponent
} from '../../../projects/formbuilder/src/public-api';
import { FieldService } from '../services/field.service';
import { FieldComponent } from '../field/field.component';
import { ICodeEntry } from 'projects/formbuilder/src/lib/interfaces/ifield';

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
  @Input() clearValue: EventEmitter<any> = new EventEmitter();
  @ViewChild('selectOpt') selectTabletable: TableComponent;
  options = [];
  selectOptions: ICodeEntry[] = [];
  autoCompleteConfig: optionsConfig = {
    groupBy: true
  };
  internalType = 'text';

  allControlls: any;
  isLinear = true;
  form2: FormGroup;
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
    public ts: TranslationService
  ) {
    this.form = fs.getForm('home_control');

    fs.getFormControl({ name: 'home_control_tooltip' }).valueChanges.subscribe(
      val => {
        // console.log(val);

        ts.updateData({ [fieldS.get() + '#tooltip']: val });
      }
    );

    fs.getFormControl({
      name: 'home_control_hintlabel'
    }).valueChanges.subscribe(val => {
      // console.log(val);

      ts.updateData({ [fieldS.get() + '#hintlabel']: val });
    });

    fs.getFormControl({ name: 'home_control_type' }).valueChanges.subscribe(
      val => {
        if (val) {
          const field = fs.getFieldByName(fieldS.get()) as FieldComponent;
          field.internalType = val;
          this.internalType = val;
        }
      }
    );

    fs.getFormControl({ name: 'home_control_name' }).valueChanges.subscribe(
      val => {
        if (val) {
          ts.updateData({ [fieldS.get() + '#label']: val });
        }
        // console.log(fs.hasChanges());
      }
    );

    fs.getFormControl({ name: 'home_control_value' }).valueChanges.subscribe(
      val => {
        if (val) {
          fs.getFormControl({ name: fieldS.get() }).patchValue(val);
        } else {
          fs.getFormControl({ name: fieldS.get() }).patchValue('');
        }
      }
    );
    fs.getFormControl({ name: 'home_control_min' }).valueChanges.subscribe(
      val => {
        const field = fs.getFieldByName(fieldS.get()) as FieldComponent;
        const tmpVali = field.getValidators();

        if (val > 0) {
          // field.min = val;
          tmpVali.min = val;
          field.changeValidators(tmpVali);
        } else {
          tmpVali.min = null;
          field.changeValidators(tmpVali);
        }
      }
    );
    fs.getFormControl({ name: 'home_control_max' }).valueChanges.subscribe(
      val => {
        const field = fs.getFieldByName(fieldS.get()) as FieldComponent;
        const tmpVali = field.getValidators();

        if (val > 0) {
          // field.min = val;
          tmpVali.max = val;
          field.changeValidators(tmpVali);
        } else {
          tmpVali.max = null;
          field.changeValidators(tmpVali);
        }
      }
    );
    fs.getFormControl({
      name: 'home_control_minLength'
    }).valueChanges.subscribe(val => {
      const field = fs.getFieldByName(fieldS.get()) as FieldComponent;
      const tmpVali = field.getValidators();

      if (val > 0) {
        // field.min = val;
        tmpVali.minLength = val;
        field.changeValidators(tmpVali);
      } else {
        tmpVali.minLength = null;
        field.changeValidators(tmpVali);
      }
    });
    fs.getFormControl({
      name: 'home_control_maxLength'
    }).valueChanges.subscribe(val => {
      const field = fs.getFieldByName(fieldS.get()) as FieldComponent;
      const tmpVali = field.getValidators();

      if (val > 0) {
        // field.min = val;
        tmpVali.maxLength = val;
        field.changeValidators(tmpVali);
      } else {
        tmpVali.maxLength = null;
        field.changeValidators(tmpVali);
      }
    });
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
    this.fieldS.change().subscribe((val) => {
      const conf = this.fs.getConfigByName(val);
      this.internalType = conf.htmlType;
      if(conf.options) {
        this.selectOptions = conf.options;
      }
    });
    this.configS.dataChange.subscribe(data => {
      // console.log(data);
      for (const [key, value] of Object.entries(data)) {
        // console.log(value);
        this.allControlls = value.children;
      }
    });

    this.clearValue.subscribe(value => {
      if(value.value === 'Test') {
        this.fs.getFormControl({name: value.name}).reset();
      } else {
        this.fs.resetControl(value.name);
      }
    });

    this.fieldchange.subscribe(value => {
      const actualField = this.fieldS.get();
      // console.log(actualField);

      const field = this.fs.getFieldByName(actualField) as FieldComponent;
      // console.log(field);
      const tmpConf = this.fs.getConfigByName(actualField);
      // const control = this.fs.getFormControl(tmpConf);
      switch (value.type) {
        case 'home_control_disabled':
          tmpConf.disabled = value.value ? value.value : false;
          field.disabled = value.value ? value.value : false;
          this.fs.updateConfig(tmpConf);
          // console.log(value);
          // console.log(field.disabled);

          if(value.value === true) {
            field.control.disable();
          } else {
            // console.log('hi');
            field.control.enable();
          }
          break;
        case 'home_control_required':
          const tmpVali = field.getValidators();
            tmpVali.required = value.value ? value.value : null;
            tmpConf.validators = tmpVali;
            field.required = value.value ? value.value : null;
            field.changeValidators(tmpVali);
            this.fs.updateConfig(tmpConf);
          break;
      }
    });
  }

  addSelectOption(){
    const form = this.fs.getForm('home_select_selectName');
    const raw = form.getRawValue();
    const actualField = this.fieldS.get();
    const name = actualField + '_Opt_' + raw.home_select_selectName.toLowerCase();
    const tmpObj: ICodeEntry = {
      key: name,
      value: raw.home_select_selectValue,
      description: name + '#desc',
    };

    this.selectOptions.push(tmpObj);

    let lngObj = {
      [tmpObj.key]: raw.home_select_selectName,
      [tmpObj.description]: raw.home_select_selectCode
    };

    this.ts.updateData(lngObj);


    let tmpConf = this.fs.getConfigByName(actualField);
    tmpConf.options = this.selectOptions;
    // this.fs.updateConfig(tmpConf);

    const selectF = this.fs.getFieldByName(actualField) as FieldComponent;
    selectF.updateOptions(this.selectOptions);
    form.reset();
  }
}
