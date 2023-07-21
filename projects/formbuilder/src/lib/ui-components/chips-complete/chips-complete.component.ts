import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { BaseFieldComponent } from '../../classes/field';
import { FormService } from '../../services/form.service';
import { TranslationService } from '../../services/translation.service';
import { ICodeEntry } from '../../interfaces/ifield';
import { checkKey, _filter } from '../autocomplete/autocomplete.component';
import { AutoSearch } from '../../interfaces/imenu';
import { IAutoCompleteOptions } from '../../interfaces/iautocompleteoption';
import { IValidator } from '../../interfaces/ivalidator';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-chips-complete',
  templateUrl: './chips-complete.component.html',
  styleUrls: ['./chips-complete.component.scss'],
})
export class ChipsCompleteComponent
  extends BaseFieldComponent
  implements OnInit
{
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('', [Validators.required]);
  filteredFruits: Observable<any[]> = of([]);
  fruits: string[] = [];
  objs: ICodeEntry[] = [];
  filteredObjs: Observable<ICodeEntry[]> = of([]);
  canAdd = true;
  multiple = false;
  actualOptions = -1;
  active = false;
  @Input() options: any[] = [];
  @Input() config: IAutoCompleteOptions = {
    groupBy: false,
  };
  @Output() optionChange: EventEmitter<ICodeEntry[]> = new EventEmitter<
    ICodeEntry[]
  >();
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('chipField') chipField: MatFormField;
  @ViewChild('error') error: ElementRef;

  constructor(
    public override fb: UntypedFormBuilder,
    public override fs: FormService,
    public override ts: TranslationService
  ) {
    super(fb, fs, ts);
  }

  override ngOnInit() {
    super.ngOnInit();
    // console.log(this.name);

    this.setUp();
  }

  setUp() {
    let config = this.fs.getConfigByName(this.name);
    this.options = config.options ? config.options : this.options;
    this.filteredFruits = of(this.options);
    if (this.config.useMask) {
      this.filteredObjs = of(this.options);
    }
    this.actualOptions = this.options.length >= 0 ? 0 : -1;
    this.canAdd = config.canAdd ? config.canAdd : false;
    this.multiple = config.multiple ? config.multiple : true;
    this.active = config.selectable ? config.selectable : false;
    // console.log(this.options);

    if (config.value) {
      this.fruits = config.value.split(',');
      if (this.config.useMask) {
        this.mapMask();
      }
    }
    if (this.config.useMask) {
      this.filteredObjs = this.fruitCtrl.valueChanges.pipe(
        startWith(''),
        map((option: any) => this._filterObjs(option))
      );
    } else {
      if (this.config.groupBy) {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
          startWith(''),
          map((option) => this._filterGroup(option))
        );
      } else {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
          startWith(''),
          map((option) => this._filterStates(option))
        );
      }
    }
    // console.log(this.form);
    this.synchtoFormbuilder();

    this.control.valueChanges.subscribe((val) => {
      this.focusEvent();
      if (!val) {
        this.fruitCtrl.reset();
        this.fruits = [];
      } else {
        this.fruits = val.split(',');
      }
    });
  }

  synchtoFormbuilder() {
    const validators = this.fs.getFieldByName(this.name)
      .validators as IValidator;
    validators.required = this.required;
    this.fruitCtrl.setValidators(this.fs.buildValidators(validators));
    this.fruitCtrl.updateValueAndValidity();
  }

  focusEvent() {
    if (
      this.required &&
      this.fs.getFormControl({ name: this.name }).value === null
    ) {
      this.fruitCtrl.setErrors({ required: true });
      // this.error.nativeElement
    } else {
      this.fruitCtrl.setErrors({ required: false });
    }

    if (this.fs.getFormControl({ name: this.name }).invalid) {
      this.chipField._elementRef.nativeElement.classList.add(
        'mat-form-field-invalid'
      );
    } else {
      this.chipField._elementRef.nativeElement.classList.remove(
        'mat-form-field-invalid'
      );
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      if (this.canAdd) {
        if (this.fruits.indexOf(value) === -1) {
          this.fruits.push(value);
          this.control.setValue(this.fruits.toString());
        }
      } else {
        // console.log(this.actualOptions);

        if (this.actualOptions >= 0) {
          let option = this.options[this.actualOptions];
          if (this.config.translate) {
            if (this.fruits.indexOf(this.ts.data[option.key]) === -1) {
              if (this.config.technical) {
                this.fruits.push(option.value);
              } else {
                this.fruits.push(this.ts.data[option.key]);
              }
              this.control.setValue(this.fruits.toString());
            } else {
              console.log(this.fruits);
              console.log(option);

              if (this.fruits.indexOf(option.key) === -1) {
                if (this.config.technical) {
                  this.fruits.push(option.value);
                } else {
                  this.fruits.push(this.ts.data[option.key]);
                }
                this.control.setValue(this.fruits.toString());
              }
            }
          }
        }
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
    this.fruitCtrl.updateValueAndValidity();
    if (this.fruits.length === 0) {
      this.control.setValue(null);
    } else {
      this.control.setValue(this.fruits.toString());
    }
  }
  removeObj(option: ICodeEntry): void {
    const index = this.objs.indexOf(option);
    console.log(index);

    if (index >= 0) {
      this.objs.splice(index, 1);
    }
    this.fruitCtrl.updateValueAndValidity();
    if (this.objs.length === 0) {
      this.control.setValue(null);
    } else {
      let values = [];
      this.objs.forEach((element) => {
        values.push(element.value);
      });
      this.control.setValue(values.join());
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.config.useMask) {
      let index = -1;
      const found = this.objs.find((element, idx) => {
        if (element.value === event.option.value.value) {
          index = idx;
          return true;
        } else {
          return false;
        }

      });
      console.log(found);

      if (!found) {
        this.objs.push(event.option.value);
      }
    } else {
      if (this.fruits.indexOf(event.option.value) === -1) {
        this.fruits.push(event.option.value);
      }

      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
      this.control.setValue(this.fruits.toString());
    }
  }

  private _filterStates(value: string): any[] {

    this.actualOptions = -1;

    if (!this.config.useMask && value) {
      const filterValue = value ? value.toLowerCase() : '';
      let counter = 0;
      return this.options.filter((option) => {
        if (this.config.translate) {
          if (this.ts.data[option.key]) {
            let index = this.ts.data[option.key]
              .toLowerCase()
              .indexOf(filterValue);
            if (index > -1) {
              if (this.actualOptions === -1) {
                this.actualOptions = counter;
              }
              if (!this.fruits.includes(option)) {
                counter++;
                return true;
              } else {
                counter++;
                return false;
              }
            } else {
              counter++;
              return false;
            }
          } else {
            return true;
          }
        } else {
          if (option.key) {
            let index = option.key.toLowerCase().indexOf(filterValue);

            if (index > -1) {
              if (this.actualOptions === -1) {
                this.actualOptions = counter;
              }
              if (!this.fruits.includes(option.key)) {
                counter++;
                return true;
              } else {
                counter++;
                return false;
              }
            } else {
              counter++;
              return false;
            }
          } else {
            return true;
          }
        }
      });
    } else {
      return this.options;
    }
  }

  private _filterGroup(value: string): any[] {
    // console.log(this.filteredStates);
    // console.log(this.options);

    if (value && this.options[0].name) {
      return this.options
        .map((group: AutoSearch) => ({
          name: group.name,
          children: _filter(group.children as string[], value, this.ts),
        }))
        .filter((group: AutoSearch) => group.name.length > 0);
    }
    // console.log(this.options);
    return this.options;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.control.setValue(this.fruits.toString());
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  mapMask() {
    this.options.map((option: ICodeEntry) => {
      if (this.fruits.includes(option.value)) {
        this.objs.push(option);
      }
    });
  }

  _filterObjs(value: ICodeEntry) {

    if (value) {
      const filterValue = value.key ? value.key.toLowerCase() : '';
      return this.options.filter((option: ICodeEntry) => {
        return option.key.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
      });
    } else {
      return this.options;
    }
  }
}
