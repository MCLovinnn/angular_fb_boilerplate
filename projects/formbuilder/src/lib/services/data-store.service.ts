import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private navbarVisibility: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private currentUser: ReplaySubject<any> = new ReplaySubject(1);
  private allowedActions: ReplaySubject<Object> = new ReplaySubject(1);

  constructor() {
  }

  public showNavbar(shouldNavbarBeVisible: boolean): void {
    this.navbarVisibility.next(shouldNavbarBeVisible);
  }

  public getNavbarState(): BehaviorSubject<boolean> {
    return this.navbarVisibility;
  }

  public getCurrentUser(): ReplaySubject<any> {
    return this.currentUser;
  }

  public setCurrentUser(value: any) {
    this.currentUser.next(value);
  }

  public getAllowedActions(): ReplaySubject<Object> {
    return this.allowedActions;
  }

  public setAllowedActions(value: Object): void {
    this.allowedActions.next(value);
  }

}
