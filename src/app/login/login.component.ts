import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'projects/formbuilder/src/public-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fs: FormService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fs.getForm('home_login');
  }

  login() {
    let username = this.fs.getFormControl({name: 'home_login_username'}).value;
    let password = this.fs.getFormControl({name: 'home_login_password'}).value;

    // this.as.saveUserProfile({test: 'test'});
    // this.router.navigateByUrl('/');
/*
    this.as.login('/login', username, password).subscribe((res) =>{
      if (res) {
        this.as.saveUserProfile(res);
        this.router.navigateByUrl('/');
      }
    });
    */
  }

  isValid() {
    return this.form.valid;
  }
}
