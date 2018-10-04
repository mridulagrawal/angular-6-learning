import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  emailId: String = '';
  password: String = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'emailId': new FormControl(this.emailId, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required])
    });
  }

  onSubmit() {
    const email = this.signInForm.value.emailId;
    const password = this.signInForm.value.password;
    this.authService.signInUser(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

}
