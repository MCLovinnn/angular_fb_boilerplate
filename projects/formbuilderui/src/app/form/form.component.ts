import { Component, OnInit, EventEmitter } from '@angular/core';
import { TranslationService, ConfigService, FormService, DataConnectorService, IField, MenuNode } from '../../../../formbuilder/src/public-api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldService } from '../services/field.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  dataSource: MenuNode[] = [];
  // title = 'angular-formbuilder';

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
  minLength = 0;

  maxLE: EventEmitter<string> = new EventEmitter();
  maxLength = 0;

  minE: EventEmitter<string> = new EventEmitter();
  min = 0;

  maxE: EventEmitter<string> = new EventEmitter();
  max = 0;

  reqE: EventEmitter<string> = new EventEmitter();
  required = false;

  constructor(private ds: DataConnectorService,
    public fb: FormBuilder,
    public fs: FormService,
    private fieldS: FieldService,
    private configS: ConfigService,
    public ts: TranslationService) {

    // fs.addConfig({ home: { ui: fieldConfig } });
    // fs.addConfig({settings: { list: allergene}});
    // this.form = this.fs.getForm('home_ui');
    // this.form2 = this.fs.getForm('settings_list');
    // console.log(this.form2);

    /*ds.getFields().subscribe((res: any) => {
      console.log(res);
      this.fields = res;
    });*/
  }

  ngOnInit() {
  }

}
