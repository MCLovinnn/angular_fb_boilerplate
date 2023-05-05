import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTreeModule } from "@angular/material/tree";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";

import { MAT_DATE_LOCALE } from "@angular/material/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { registerLocaleData, CommonModule } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { MatMenuModule } from "@angular/material/menu";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TestComponent } from "./test/test.component";
import { ConnectorService } from "./services/connector.service";

// @ts-ignore
import CONFIG from "../assets/config/config.json";
import { FormularComponent } from "./formular/formular.component";
import { RecepyComponent } from "./recepy/recepy.component";
import { RecepyListComponent } from "./recepy-list/recepy-list.component";
import { CommentComponent } from "./comment/comment.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import {
  FormbuilderModule,
  TranslationService,
  FormService
} from "projects/formbuilder/src/public-api";

import { NgChartsModule } from "ng2-charts";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatTabsModule } from "@angular/material/tabs";

registerLocaleData(localeDe, "de");

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    FormularComponent,
    RecepyComponent,
    RecepyListComponent,
    CommentComponent,
    LoginComponent,
    HomeComponent
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
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    NgChartsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "de" }],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {
  constructor(
    public ts: TranslationService,
    private fs: FormService,
    private cs: ConnectorService
  ) {
    fs.addConfig(CONFIG);

    ts.setPath("assets/locale/");
    ts.use("de").then(res => {
      console.log(ts.getFormName("home_test"));
      // console.log(res);
    });
    // console.log(ts.data);
  }
}
