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
    if(!this.config && this.field.config) {
      // console.log(this.field.config);
      this.config = this.field.config as ISliderConfig;
    }
  }

  getTickIntervall() {
    if (this.config.showTicks) {
      return this.config.tickInterval > 0 ? this.config.tickInterval : 'auto';
    }

    return 0;
  }
}
