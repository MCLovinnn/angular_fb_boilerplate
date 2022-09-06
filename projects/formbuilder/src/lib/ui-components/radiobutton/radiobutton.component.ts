import { Component, OnInit, Input } from '@angular/core';
import { ICodeEntry } from '../../interfaces/ifield';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { BaseFieldComponent } from '../../classes/field';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss']
})
export class RadiobuttonComponent extends BaseFieldComponent implements OnInit {
  @Input() options: ICodeEntry[];

  constructor(public fb: FormBuilder,
              public fs: FormService,
              public ts: TranslationService) {
    super(fb, fs, ts);
  }

  ngOnInit() {
    super.ngOnInit();
    this.options = this.fs.getConfigByName(this.name).options? this.fs.getConfigByName(this.name).options : this.options;

    // console.log(this.options);
    // console.log(this.form);
  }
}
