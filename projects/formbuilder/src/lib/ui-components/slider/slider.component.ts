import { Component, OnInit, Input } from '@angular/core';
import { ISliderConfig } from '../../interfaces/isliderconfig';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { BaseFieldComponent } from '../../classes/field';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent extends BaseFieldComponent implements OnInit {
  @Input() config: ISliderConfig;

  constructor(public fb: FormBuilder,
    public fs: FormService,
    public ts: TranslationService) {
    super(fb, fs, ts);
  }

  ngOnInit() {
    super.ngOnInit();
    // console.log(this.options);
    // console.log(this.form);
  }
}
