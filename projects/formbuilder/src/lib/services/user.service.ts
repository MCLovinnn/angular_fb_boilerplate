import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Charset', 'UTF-8');

  private options = {headers: this.headers};

  apiBaseUrl: string;

  constructor(private http: HttpClient,
    private dialogService: DialogService
  ) {
    this.apiBaseUrl = '/api';
  }

  login(credentials: any, url: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Charset', 'UTF-8')
      .set('Authorization', 'Basic ' + btoa(credentials));

    const options: Object = {
      headers: headers,
      observe: 'response',
      withCredentials: true
    };
    return this.http.post(url, null, options);
  }

  logout(url: string): Observable<any> {
    this.options = {headers: this.headers};
    return this.http.delete(url, this.options);
  }

  /**
   * Gets current users profile.
   */
  getUserProfile(url: string): Observable<any> {
    // const headers = this.headers.set('useMockup', 'true');
    // const options = {headers: headers};
    // return this.http.get(this.apiBaseUrl + `user/profile`, options);

    return this.http.get(url, this.options);
  }

  /**
   * Get the allowed actions of the current user
   */
  getUserRoles(url: string): Observable<any> {
    // const headers = this.headers.set('useMockup', 'true');
    // const options = {headers: headers};
    // return this.http.get(this.apiBaseUrl + `user/role`, options)
    //   .pipe(
    //     map(value => value['actions'])
    //   );
    return this.http.get(url, this.options);
  }

  /**
   * get all users
   */
  getUsers(url: string): Observable<any> {
    // const headers = this.headers.set('useMockup', 'true');
    // const options = {headers: headers};
    return this.http.get(url, this.options);
  }

  getUser(url: string, userId: number): Observable<any> {
    return this.http.get(`${url}${userId}`, this.options);
  }

  addUser(url: string, user: any): Observable<any> {
    return this.http.post(url, JSON.stringify(user), this.options);
  }

  addUserAndRoles(url: string, user: any): ReplaySubject<any> {
    // check if bkuUser already exists
    const done = new ReplaySubject<any>(1);
    this.addUser(url, user).subscribe(addUserRes => {
      user.id = addUserRes.id;
      this.updateRoles(url, user).subscribe(updateRoleResp => done.next(updateRoleResp));
    }, error => {
      this.dialogService.showErrorDialog('Error');
    });
    return done;
  }

  editUser(url: string, user: any): Observable<any> {
    return this.http.put(`${url}${user.id}`, JSON.stringify(user), this.options);
  }

  editUserAndRoles(url: string, user: any): Observable<any> {
    return forkJoin(this.editUser(url, user), this.updateRoles(url, user));
  }

  deleteUser(url: string, user: any): Observable<any> {
    return this.http.delete(`${url}${user.id}`, this.options);
  }

  updateRoles(url: string, user: any) {
    const rolesObject = {
      'roles': user.roles
    };
    return this.http.put(`${url}${user.id}`, JSON.stringify(rolesObject), this.options);
  }
}
