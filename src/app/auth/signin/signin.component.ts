import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  emailId: String = '';
  password: String = '';

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'emailId': new FormControl(this.emailId, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required])
    });
  }

  onSubmit() {
    const email = this.signInForm.value.emailId;
    const password = this.signInForm.value.password;
    this.store.dispatch(new AuthActions.TrySignInAction({ username: email, password: password }));
  }

}
