import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFieldComponent, FormService } from '../../../projects/formbuilder/src/public-api';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent extends BaseFieldComponent implements OnInit {

  @Input() type: EventEmitter<string> = new EventEmitter();

  internalType = 'text';
  internalTooltip = '';

  constructor(
    public fb: FormBuilder,
    public fs: FormService
  ) {
    super(fb, fs);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // console.log(this.type);
    // console.log(this.internalType);
    this.type.subscribe((value) => {
      // console.log(value);
      this.internalType = value;
      this.internalTooltip = this.tooltip;
    });
  }

}
