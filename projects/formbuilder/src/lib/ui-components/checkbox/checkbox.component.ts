import { Component, OnInit, Input } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TranslationService } from '../../services/translation.service';
import { ThemePalette } from '@angular/material/core';

export interface ICheckboxGroup {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: ICheckboxGroup[];
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseFieldComponent implements OnInit {
  @Input() position = 'before';
  @Input() options: ICheckboxGroup;

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.options.subtasks != null && this.options.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.options.subtasks == null) {
      return false;
    }
    return this.options.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.options.subtasks == null) {
      return;
    }
    this.options.subtasks.forEach(t => (t.completed = completed));
  }

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
