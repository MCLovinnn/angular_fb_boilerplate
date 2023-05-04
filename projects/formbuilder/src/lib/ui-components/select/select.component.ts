import { Component, Input, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { UntypedFormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ICodeEntry } from '../../interfaces/ifield';
import { TranslationService } from '../../services/translation.service';




@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseFieldComponent implements OnInit {
  @Input() options?: ICodeEntry[];
  @Input() multiple = false;

  constructor(public fb: UntypedFormBuilder,
              public fs: FormService,
              public ts: TranslationService) {
    super(fb, fs, ts);
  }

  ngOnInit() {
    super.ngOnInit();
    this.options = this.fs.getConfigByName(this.name).options? this.fs.getConfigByName(this.name).options : this.options;
    this.multiple = this.fs.getConfigByName(this.name).multiple? this.fs.getConfigByName(this.name).multiple : this.multiple;
    // console.log(this.options);
    // console.log(this.form);
  }
}
