import { Component, OnInit, Input } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseFieldComponent implements OnInit {
  @Input() position = 'before';

  constructor(public fb: FormBuilder,
              public fs: FormService
  ) {
    super(fb, fs);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
