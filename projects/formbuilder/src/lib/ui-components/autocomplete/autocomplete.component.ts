import { Component, Input, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { AutoSearch } from '../../interfaces/imenu';
import { optionsConfig } from '../../interfaces/iautocompleteoption';

export const _filter = (opt: any[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  if (typeof opt[0] === 'string') {
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  } else {
    return opt.filter(
      item => item.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent extends BaseFieldComponent
  implements OnInit {
  filteredStates: any;
  @Input() options: any[];
  @Input() config: optionsConfig;

  constructor(public fb: FormBuilder, public fs: FormService) {
    super(fb, fs);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.config.groupBy) {
      this.filteredStates = this.control.valueChanges.pipe(
        startWith(''),
        map(option => this._filterGroup(option))
      );
    } else {
      this.filteredStates = this.control.valueChanges.pipe(
        startWith(''),
        map(option => this._filterStates(option))
      );
    }
    // console.log(this.options);
    // console.log(this.config);
  }

  private _filterStates(value: string): any[] {
    // console.log('options', this.options);
    // console.log('options', this.options.length);
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) > -1
    );
  }

  private _filterGroup(value: string): any[] {
    // console.log(this.filteredStates);
    if (value) {
      return this.options
        .map((group: AutoSearch) => ({
          name: group.name,
          children: _filter(group.children as string[], value)
        }))
        .filter((group: AutoSearch) => group.name.length > 0);
    }
    // console.log(this.options);
    return this.options;
  }
}
