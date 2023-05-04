import { Component, OnInit, Input } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { UntypedFormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TranslationService } from '../../services/translation.service';
import { ThemePalette } from '@angular/material/core';

export interface CheckboxGroup {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: CheckboxGroup[];
}
@Component({
  selector: 'app-check-box-group',
  templateUrl: './check-box-group.component.html',
  styleUrls: ['./check-box-group.component.css']
})
export class CheckBoxGroupComponent extends BaseFieldComponent implements OnInit {
  @Input() position = 'before';
  // @Input() options: CheckboxGroup;

  options: CheckboxGroup = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

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

  constructor(public fb: UntypedFormBuilder,
              public fs: FormService,
              public ts: TranslationService
  ) {
    super(fb, fs, ts);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
