import { Component, OnInit } from '@angular/core';
import { LogginService } from '../loggin/loggin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private logService: LogginService) { 
    if (!this.User) {
      this.logService.Exit();
    }
  }

  get User () {
    return this.logService.User;
  }

  ngOnInit(): void {
  }

  public OnExit () {
    this.logService.Exit();
  }

}
