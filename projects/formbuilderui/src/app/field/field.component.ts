import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFieldComponent, FormService, TranslationService } from '../../../../formbuilder/src/public-api';
import { IValidator } from '../../../../formbuilder/src/lib/interfaces/ivalidator';
import { FieldService } from '../services/field.service';
import { ICodeEntry } from '../../../../formbuilder/src/lib/interfaces/ifield';
import { ISliderConfig } from '../../../../formbuilder/src/lib/interfaces/isliderconfig';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent extends BaseFieldComponent implements OnInit {

  @Input() type: EventEmitter<string> = new EventEmitter();
  @Input() sliderOptions: ISliderConfig = {
    inverted: false,
    showThumb: true,
    showTicks: true,
    step: 5,
    tickInterval: 1,
    vertical: false
  };

  options: ICodeEntry[] = [];

  internalType = 'text';
  internalTooltip = '';

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
    private fieldS: FieldService,
    public ts: TranslationService
  ) {
    super(fb, fs, ts);
    this.placeholder = fieldS.get();
    if(this.type){
      this.type.subscribe((value) => {
        // console.log('hi');
        this.internalType = value;
        // this.internalTooltip = this.tooltip;
      });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  changeValidators(validators: IValidator) {
    let tmpfield = this.getFieldConfig();
    if (tmpfield.htmlType === 'slider') {
      this.max = validators.max ? validators.max : 100;
      this.min = validators.min ? validators.min : 0;
    } else {
      tmpfield.validators = validators;
      // console.log(validators);
      // this.fs.updateConfig(tmpfield);
      let control = this.fs.getFormControl({name: 'home_ui_new'});
      control.setValidators(this.fs.buildValidators(tmpfield.validators));
      control.updateValueAndValidity();
    }
  }

  changeSliderOptions(options: ISliderConfig) {
    this.sliderOptions = options;
  }

  updateOptions(newOptions: ICodeEntry[]){
    let tmpConf = this.fs.getConfigByName(this.name);
    tmpConf.options = newOptions;
    this.fs.updateConfig(tmpConf);
    this.options = newOptions;
  }
}
