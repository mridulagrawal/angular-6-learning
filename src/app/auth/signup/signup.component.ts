import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  emailId: String = '';
  password: String = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'emailId': new FormControl(this.emailId, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required])
    });
  }

  onSubmit() {
    const email = this.signUpForm.value.emailId;
    const password = this.signUpForm.value.password;
    this.authService.signUpUser(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

}
