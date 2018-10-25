import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignUpAction implements Action {
    readonly type = TRY_SIGNUP;
    constructor(public payload: { username: string, password: string }) {
    }
}

export class TrySignInAction implements Action {
    readonly type = TRY_SIGNIN;
    constructor(public payload: { username: string, password: string }) {
    }
}

export class SignUpAction implements Action {
    readonly type = SIGNUP;
}

export class SignInAction implements Action {
    readonly type = SIGNIN;
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
}

export class SetTokenAction implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) { }
}

export type AuthActions = SignUpAction
    | SignInAction
    | LogoutAction
    | SetTokenAction
    | TrySignUpAction
    | TrySignInAction;
