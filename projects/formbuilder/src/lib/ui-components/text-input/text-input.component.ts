import { Component, OnInit, Input } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends BaseFieldComponent implements OnInit {
  @Input() rows = 3;
  @Input() number = false;
  @Input() password = false;
  internalType = 'text';

  constructor(public fb: FormBuilder,
              public fs: FormService,
              public ts: TranslationService) {
    super(fb, fs, ts);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.number) {
      this.internalType = 'number';
    }
    if(this.password){
      this.internalType = 'password';
    }
    // console.log(this.control);
  }

}
