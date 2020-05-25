import { Component, OnInit } from '@angular/core';
import { LogginService } from '../loggin/loggin.service';
import { MainService } from './main.service';
import { Project } from './main.models';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private logService: LogginService, private mainService: MainService) { 
    if (!this.User) {
      this.logService.Exit();
    }
    this.mainService.loadProjects(this.User.id);
    this.mainService.loadServicies(this.User.id);
    
  }

  get User () {
    return this.logService.User;
  }

  get onDataLoad() {
    return this.mainService.onDataLoad;
  }

  ngOnInit(): void {
  }

  public OnExit () {
    this.logService.Exit();
  }

  get blurTemplate(): boolean {
    return this.mainService.blurTemplate;
  }

  get window() {
    return this.mainService.windowsAction;
  }

}
