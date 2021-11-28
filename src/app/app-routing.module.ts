import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { RecepyComponent } from './recepy/recepy.component';

const routes: Routes = [
  {path: '', component: TestComponent},
  {path: 'recepy', component: RecepyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
