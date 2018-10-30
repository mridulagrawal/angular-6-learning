import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.action$
        .pipe(
            ofType(AuthActions.TRY_SIGNUP),
            map((action: AuthActions.TrySignUpAction) => {
                return action.payload;
            }),
            switchMap((authData: { username: string, password: string }) => {
                return from(
                    firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)
                );
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNUP
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            }));

    @Effect({ dispatch: false })
    authLogOut = this.action$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect()
    authSignIn = this.action$
        .pipe(
            ofType(AuthActions.TRY_SIGNIN),
            map((action: AuthActions.TrySignInAction) => {
                return action.payload;
            }),
            switchMap((authData: { username: string, password: string }) => {
                return from(
                    firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
                );
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );

    constructor(private action$: Actions,
        private router: Router) {
    }
}
