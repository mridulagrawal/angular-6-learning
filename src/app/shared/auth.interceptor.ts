import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .pipe(take(1))
            .pipe(switchMap((authState: fromAuth.State) => {
                const token = authState.token;
                const copiedReq = req.clone({ params: new HttpParams().set('auth', token) });
                return next.handle(copiedReq);
            }));
    }
}
