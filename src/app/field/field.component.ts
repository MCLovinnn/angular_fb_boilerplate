import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFieldComponent, FormService, TranslationService } from '../../../projects/formbuilder/src/public-api';
import { IValidator } from '../../../projects/formbuilder/src/lib/interfaces/ivalidator';
import { FieldService } from '../services/field.service';
import { ICodeEntry } from 'dist/formbuilder/lib/interfaces/ifield';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent extends BaseFieldComponent implements OnInit {

  @Input() type: EventEmitter<string>;
  options: ICodeEntry[];

  internalType = 'text';
  internalTooltip = '';

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
    private fieldS: FieldService,
    public ts: TranslationService
  ) {
    super(fb, fs, ts);

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
    tmpfield.validators = validators;
    // console.log(validators);

    this.fs.updateConfig(tmpfield);
    let control = this.fs.getFormControl({name: this.fieldS.get()});
    control.setValidators(this.fs.buildValidators(tmpfield.validators));
    control.updateValueAndValidity();
  }
  updateOptions(newOptions: ICodeEntry[]){
    this.options = newOptions;
  }
}
