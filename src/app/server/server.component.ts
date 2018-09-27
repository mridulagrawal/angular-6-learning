import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  name: String = 'Mridul';
  buttonProp: Boolean = false;
  textBtn: string;
  inputValue: String = '';
  servers: Array<string> = ['test1', 'test2', 'test5'];

  constructor() {
    setTimeout(() => {
      this.buttonProp = true;
    }, 2000);
  }

  ngOnInit() {
  }

  clickMe() {
    this.textBtn = 'hehhehehhe ans diye';
  }

  myInput(event: any) {
    this.inputValue = (<HTMLInputElement>event.target).value;
  }
}
