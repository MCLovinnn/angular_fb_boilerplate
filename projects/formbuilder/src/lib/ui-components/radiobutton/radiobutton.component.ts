import { Component, OnInit, Input } from '@angular/core';
import { ICodeEntry } from '../../interfaces/ifield';
import { UntypedFormBuilder } from '@angular/forms';
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

  constructor(public override fb: UntypedFormBuilder,
              public override fs: FormService,
              public override ts: TranslationService) {
    super(fb, fs, ts);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.options = this.fs.getConfigByName(this.name).options? this.fs.getConfigByName(this.name).options : this.options;

    // console.log(this.options);
    // console.log(this.form);
  }
}
