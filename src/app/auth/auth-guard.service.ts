import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select('auth').subscribe((x) => {
      console.log(x);
    });
    return this.store.select('auth').pipe(
      take(1),
      map(
        (authState: fromAuth.State) => {
          console.log(authState);
          return authState.authenticated;
        }
      ));
  }
}
