import { Component, OnInit, Input } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseFieldComponent implements OnInit {
  @Input() position = 'before';

  constructor(public fb: FormBuilder,
              public fs: FormService,
              public ts: TranslationService
  ) {
    super(fb, fs, ts);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
