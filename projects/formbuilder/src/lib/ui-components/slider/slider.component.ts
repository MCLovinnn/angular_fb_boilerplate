import { Component, OnInit, Input } from '@angular/core';
import { ISliderConfig } from '../../interfaces/isliderconfig';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { BaseFieldComponent } from '../../classes/field';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent extends BaseFieldComponent implements OnInit {
  @Input() config: ISliderConfig;

  constructor(public fb: FormBuilder,
    public fs: FormService) {
    super(fb, fs);
  }

  ngOnInit() {
    super.ngOnInit();
    // console.log(this.options);
    // console.log(this.form);
  }
}
