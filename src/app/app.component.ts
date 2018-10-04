import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBttG4ZvsZB71q6da510pofOeohNNA-Yjo',
      authDomain: 'ng-recipe-book-9b8b7.firebaseapp.com',
    });
  }

}
