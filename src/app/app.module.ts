import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { MatToolbarModule } from '@angular/material/toolbar';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {
  FormbuilderModule,
  TranslationService,
  FormService
} from '../../projects/formbuilder/src/public-api';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ConnectorService } from './services/connector.service';


// @ts-ignore
import CONFIG from '../assets/config/config.json';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormbuilderModule.forRoot(),
    AppRoutingModule,
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
    MatRadioModule,
    MatToolbarModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de' }],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {
  constructor(public ts: TranslationService, private fs: FormService, private cs: ConnectorService) {
    fs.addConfig(CONFIG);

    ts.setPath('assets/locale/');
    ts.use('de').then(res => {
      // console.log(res);
    });
    // console.log(ts.data);
  }
}
