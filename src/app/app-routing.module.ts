import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TranslationComponent } from './translation/translation.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'translation', component: TranslationComponent},
  {path: 'table', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
