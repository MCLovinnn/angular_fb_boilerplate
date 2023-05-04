import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { RecepyComponent } from './recepy/recepy.component';
import { RecepyListComponent } from './recepy-list/recepy-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: TestComponent},
  {path: 'recepy', component: RecepyComponent},
  {path: 'list', component: RecepyListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent}
];

// , canActivate: [AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
