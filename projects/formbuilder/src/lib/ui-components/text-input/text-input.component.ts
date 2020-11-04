import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends BaseFieldComponent implements OnInit {

  constructor(public fb: FormBuilder,
              public fs: FormService) {
    super(fb, fs);
  }

  ngOnInit() {
    super.ngOnInit();
    // console.log(this.control);
  }

}
