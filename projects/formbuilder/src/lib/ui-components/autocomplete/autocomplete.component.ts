import { Component, Input, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../classes/field';
import { map, startWith } from 'rxjs/operators';
import { UntypedFormBuilder } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { AutoSearch } from '../../interfaces/imenu';
import { IAutoCompleteOptions } from '../../interfaces/iautocompleteoption';
import { TranslationService } from '../../services/translation.service';

export const _filter = (opt: any[], value: string, ts:TranslationService): string[] => {
  const filterValue = value.toLowerCase();
  if (opt) {
    if (typeof opt[0] === 'string') {
      return opt.filter(item => checkKey(ts, item, filterValue));
    } else {
      return opt.filter(
        item => checkKey(ts, item.name ? item.name : item.key, filterValue)
      );
    }
  } else {
    return [];
  }
};

export function checkKey(ts: TranslationService, item: string, value: string) {
  if(item.toLocaleLowerCase().indexOf(value) >= 0) {
    return true;
  }
  if(ts.data[item] && ts.data[item].toLocaleLowerCase().indexOf(value) >= 0) {
    return true;
  }
  return false;
}

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
  @Input() config: IAutoCompleteOptions = {
    groupBy: true
  };

  constructor(public override fb: UntypedFormBuilder, public override fs: FormService, public override ts: TranslationService) {
    super(fb, fs, ts);
  }

  override ngOnInit() {
    super.ngOnInit();
    if (this.config.groupBy) {
      this.filteredStates = this.control.valueChanges.pipe(
        // @ts-ignore
        startWith(''),
        // @ts-ignore
        map(option => this._filterGroup(option))
      );
    } else {
      this.filteredStates = this.control.valueChanges.pipe(
        // @ts-ignore
        startWith(''),
        // @ts-ignore
        map(option => this._filterStates(option))
      );
    }
    // console.log(this.options);
    // console.log(this.config);
  }

  private _filterStates(value: string): any[] {
    if(this.options && value) {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) > -1
    );
    } else {
      return [];
    }
  }

  private _filterGroup(value: string): any[] {
    // console.log(this.filteredStates);
    // console.log(this.options);

    if (value && this.options[0].name) {
      return this.options
        .map((group: AutoSearch) => ({
          name: group.name,
          children: _filter(group.children as string[], value, this.ts)
        }))
        .filter((group: AutoSearch) => group.name.length > 0);
    }
    // console.log(this.options);
    return this.options;
  }
}
