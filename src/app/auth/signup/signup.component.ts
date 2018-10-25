import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  emailId: String = '';
  password: String = '';

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'emailId': new FormControl(this.emailId, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required])
    });
  }

  onSubmit() {
    const email = this.signUpForm.value.emailId;
    const password = this.signUpForm.value.password;
    this.store.dispatch(new AuthActions.TrySignUpAction({ username: email, password: password }));
  }

}
