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

  private options: Object = {headers: this.headers};

  private readonly apiBaseUrl: string;

  constructor(private http: HttpClient,
    private dialogService: DialogService
  ) {
    this.apiBaseUrl = '/api';
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Charset', 'UTF-8')
      .set('Authorization', 'Basic ' + btoa(credentials));

    const options: Object = {
      headers: headers,
      observe: 'response',
      withCredentials: true
    };
    return this.http.post('/api/login', null, options);
  }

  logout(): Observable<any> {
    this.options = {headers: this.headers};
    return this.http.delete('/api/logout', this.options);
  }

  /**
   * Gets current users profile.
   */
  getUserProfile(): Observable<any> {
    // const headers = this.headers.set('useMockup', 'true');
    // const options = {headers: headers};
    // return this.http.get(this.apiBaseUrl + `user/profile`, options);

    return this.http.get(`/api/user`, this.options);
  }

  /**
   * Get the allowed actions of the current user
   */
  getUserRoles(): Observable<any> {
    // const headers = this.headers.set('useMockup', 'true');
    // const options = {headers: headers};
    // return this.http.get(this.apiBaseUrl + `user/role`, options)
    //   .pipe(
    //     map(value => value['actions'])
    //   );
    return this.http.get('/api/user', this.options);
  }

  /**
   * get all users
   */
  getUsers(): Observable<any> {
    // const headers = this.headers.set('useMockup', 'true');
    // const options = {headers: headers};
    return this.http.get('/api/user', this.options);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`/api/user/${userId}`, this.options);
  }

  addUser(user: any): Observable<any> {
    return this.http.post('/api/user/', JSON.stringify(user), this.options);
  }

  addUserAndRoles(user: any): ReplaySubject<any> {
    // check if bkuUser already exists
    const done = new ReplaySubject<any>(1);
    this.addUser(user).subscribe(addUserRes => {
      user.id = addUserRes.id;
      this.updateRoles(user).subscribe(updateRoleResp => done.next(updateRoleResp));
    }, error => {
      this.dialogService.showErrorDialog('Error');
    });
    return done;
  }

  editUser(user: any): Observable<any> {
    return this.http.put(`/api/user/${user.id}`, JSON.stringify(user), this.options);
  }

  editUserAndRoles(user: any): Observable<any> {
    return forkJoin(this.editUser(user), this.updateRoles(user));
  }

  deleteUser(user: any): Observable<any> {
    return this.http.delete(`/api/user/${user.id}`, this.options);
  }

  updateRoles(user: any) {
    const rolesObject = {
      'roles': user.roles
    };
    return this.http.put(`/api/user//${user.id}`, JSON.stringify(rolesObject), this.options);
  }

  searchUsers(search: string) {
    return this.http.get(
      '/api/user?partlastname=' + search,
      this.options
    );
  }
}
