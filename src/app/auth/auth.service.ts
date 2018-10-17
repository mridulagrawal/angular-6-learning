import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  constructor(private router: Router,
    private store: Store<fromApp.AppState>) { }

  signUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          this.store.dispatch(new AuthActions.SignUpAction());
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
              this.store.dispatch(new AuthActions.SetTokenAction(token));
            }
          );
        }
      })
      .catch((e) => { throw e; });
  }

  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          this.store.dispatch(new AuthActions.SignUpAction());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
              this.store.dispatch(new AuthActions.SetTokenAction(token));
            }
          );
        }
      })
      .catch((e) => { throw e; });
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.LogoutAction());
  }
}
