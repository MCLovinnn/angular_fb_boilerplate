import { Component, Input, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ICodeEntry } from '../../interfaces/ifield';




@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseFieldComponent implements OnInit {
  @Input() options?: ICodeEntry[];

  constructor(public fb: FormBuilder,
              public fs: FormService) {
    super(fb, fs);
  }

  ngOnInit() {
    super.ngOnInit();
    this.options = this.fs.getConfigByName(this.name).options? this.fs.getConfigByName(this.name).options : this.options;
    // console.log(this.options);
    // console.log(this.form);
  }

}
