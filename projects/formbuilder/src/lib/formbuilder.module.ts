import { NgModule } from '@angular/core';
import { FormbuilderComponent } from './formbuilder.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './ui-components/select/select.component';
import { TextInputComponent } from './ui-components/text-input/text-input.component';
import { DateInputComponent } from './ui-components/date-input/date-input.component';
import { FileInputComponent } from './ui-components/file-input/file-input.component';
import { AutocompleteComponent } from './ui-components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './ui-components/checkbox/checkbox.component';
import { RadiobuttonComponent } from './ui-components/radiobutton/radiobutton.component';
import { SliderComponent } from './ui-components/slider/slider.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { BaseFieldComponent } from './classes/field';
import { TranslatePipe } from './services/translation.pipe';
import { TranslationService } from './services/translation.service';
import { ConfigService } from './services/config.service';
import { DataFlattnerService } from './services/data-flattner.service';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    FormbuilderComponent,
    BaseFieldComponent,
    SelectComponent,
    TextInputComponent,
    DateInputComponent,
    FileInputComponent,
    AutocompleteComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    SliderComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTooltipModule,
    MatTreeModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de' },
    ConfigService,
    DataFlattnerService
  ],
  bootstrap: [FormbuilderComponent],
  exports: [
    FormbuilderComponent,
    SelectComponent,
    TextInputComponent,
    DateInputComponent,
    FileInputComponent,
    AutocompleteComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    SliderComponent
  ]
})

export class FormbuilderModule {

  static forRoot() {
    return {
      ngModule: FormbuilderModule,
      providers: [
        TranslationService,
        ConfigService,
        DataFlattnerService
      ]
    }
  }
}
