import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFieldComponent, FormService, TranslationService } from '../../../projects/formbuilder/src/public-api';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent extends BaseFieldComponent implements OnInit {

  @Input() type: EventEmitter<string>;

  internalType = 'text';
  internalTooltip = '';

  constructor(
    public fb: FormBuilder,
    public fs: FormService,
    public ts: TranslationService,
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

}
