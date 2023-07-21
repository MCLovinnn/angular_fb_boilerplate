import { Component, OnInit, Input } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { UntypedFormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends BaseFieldComponent implements OnInit {
  @Input() rows = 3;
  @Input() internalType = 'text';

  constructor(public override fb: UntypedFormBuilder,
              public override fs: FormService,
              public override ts: TranslationService) {
    super(fb, fs, ts);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

}
