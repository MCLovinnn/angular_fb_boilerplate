import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { RecepyComponent } from './recepy/recepy.component';
import { RecepyListComponent } from './recepy-list/recepy-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: TestComponent, canActivate: [AuthGuard]},
  {path: 'recepy', component: RecepyComponent},
  {path: 'list', component: RecepyListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
