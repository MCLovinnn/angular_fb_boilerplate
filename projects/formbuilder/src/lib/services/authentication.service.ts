import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataStoreService } from './data-store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isLoggedIn = false;
  bla = 'txtBooth-user';

  private currentUser: {
    id?: string;
    name?: string;
    email?: string;

  };
  private allowedActions: Object;

  constructor(private router: Router,
    private userService: UserService,
    private dataStore: DataStoreService
  ) {

    this.registerCurrentUser();
    this.registerAllowedActions();

    const storedUserProfile = this.loadUserProfile();
   //const storedAllowedActions = this.loadAllowedActions();

    if (!!storedUserProfile) {
      this.dataStore.setCurrentUser(storedUserProfile);
    }
/*
    if (!!storedAllowedActions) {
      this.dataStore.setAllowedActions(storedAllowedActions);
    }
*/
  }
/*
  hasAvailableAction(systemResource: SystemResource, systemAction: SystemAction) {
    if (systemResource && systemAction && this.allowedActions && systemResource in this.allowedActions) {
      const roles: Object = this.allowedActions[systemResource];
      const allActionsWithDuplicates = Object.values(roles)
        .reduce((previousValue, currentValue) => {
          return previousValue.concat(currentValue);
        });
      const availableActions = Array.from(new Set(allActionsWithDuplicates)); // [C, C, R, R, U] => [C, R, U]
      if (!!availableActions && availableActions.indexOf(systemAction) >= 0) {
        return true;
      }
    }
    return false;
  }

  hasRole(systemRole: SystemRole) {
    if (!systemRole || !this.currentUser) {
      return false;
    }

    const currentUserRoles: string[] = this.currentUser.roles;
    if (currentUserRoles.indexOf(systemRole) >= 0) {
      return true;
    }
    return false;
  }
*/
  login(username: string, password: string): Observable<any> {
    const usernameAndPassword = username + ':' + password;

    return this.userService.login(usernameAndPassword).pipe(
      tap(resp => {
        // console.log('[authenticationService] - login successful', resp);
        this.isLoggedIn = true;
      }),
      tap(() => {
        this.getUserProfile();
      }),
      tap(() => {
        //this.getUserActions();
      })
    );
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe((profile:any) => {
      // console.log('[AuthenticationService] - getUserProfile', profile);
      this.dataStore.setCurrentUser(profile);
    }, (errObj) => {
      throwError(errObj);
    });
  }
/*
  getUserActions() {
    this.userService.getUserRoles().subscribe((actionResp: Object) => {
      if (actionResp.hasOwnProperty('actions')) {
        // console.log('[AuthenticationService] - getUserActions', actionResp);
        this.dataStore.setAllowedActions(actionResp['actions']);
      } else {
        this.dataStore.setAllowedActions(null);
      }
    }, (errObj) => {
      throwError(errObj);
    });
  }
*/
  public logout(navigateToLoginpage: boolean = true): void {
    this.isLoggedIn = false;
    this.dataStore.setCurrentUser(null);
    //this.dataStore.setAllowedActions(null);

    this.userService.logout().subscribe(null, null, () => {
      if (navigateToLoginpage) {
        this.navigateToLoginPage();
      }
    });
  }

  /**
   * Removes Authentication Informations from Localstorage
   * and navigates to the loginpage.
   */
  public handleSessionTimeout() {
    this.isLoggedIn = false;
    this.dataStore.setCurrentUser(null);
    //this.dataStore.setAllowedActions(null);
    this.navigateToLoginPage();
  }

  /**
   * Checks currently only if the userProfile is stored locally
   * FIXME: An additional test for a valid cookie would be more useful.
   */
  checkIfUserIsAlreadyLoggedIn(): boolean {
    const storedUserProfile = this.loadUserProfile();
    const storedAllowedActions = true ; //his.loadAllowedActions();

    if (!!storedUserProfile && !!storedAllowedActions) {
      this.isLoggedIn = true;
      this.dataStore.setCurrentUser(storedUserProfile);
      // this.dataStore.setAllowedActions(storedAllowedActions);
      return true;
    }
    this.isLoggedIn = false;
    this.dataStore.setCurrentUser(null);
    //this.dataStore.setAllowedActions(null);
    return false;
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }

  loadUserProfile(): any {
    let res = localStorage.getItem(this.bla);
      return JSON.parse(res != null? res : '') as any;
  }

  saveUserProfile(userProfile: any): void {
    // console.log('saveUserProfile', userProfile);
    if (!!userProfile) {
      localStorage.setItem('txtBooth-user', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('txtBooth-user');
    }
  }
/*
  loadAllowedActions(): any {
    return JSON.parse(localStorage.getItem(this.USER_ALLOWED_ACTIONS));
  }

  saveAllowedActions(actions: any): void {
    // console.log('saveAllowedActions', actions);
    if (!!actions && Object.keys(actions).length > 0) {
      localStorage.setItem(this.USER_ALLOWED_ACTIONS, JSON.stringify(actions));
    } else {
      localStorage.removeItem(this.USER_ALLOWED_ACTIONS);
    }
  }
*/
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  registerCurrentUser() {
    this.dataStore.getCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
      this.saveUserProfile(user);
    });
  }

  registerAllowedActions() {
    this.dataStore.getAllowedActions().subscribe((actions: Object) => {
      this.allowedActions = actions;
      //this.saveAllowedActions(actions);
    });
  }

}
