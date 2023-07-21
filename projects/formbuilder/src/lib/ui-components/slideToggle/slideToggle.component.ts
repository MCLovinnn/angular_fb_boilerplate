import { Component, OnInit, Input } from '@angular/core';
import { ISliderConfig } from '../../interfaces/isliderconfig';
import { UntypedFormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { BaseFieldComponent } from '../../classes/field';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-slidetoggle',
  templateUrl: './slideToggle.component.html',
  styleUrls: ['./slideToggle.component.scss']
})
export class SlideToggleComponent extends BaseFieldComponent implements OnInit {
  @Input() color: string;

  constructor(public override fb: UntypedFormBuilder,
    public override fs: FormService,
    public override ts: TranslationService) {
    super(fb, fs, ts);
  }

  override ngOnInit() {
    super.ngOnInit();
    // console.log(this.options);
    // console.log(this.form);
  }
}
