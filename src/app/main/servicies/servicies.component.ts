import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Service } from '../main.models';
import { LogginService } from '../../loggin/loggin.service';

@Component({
  selector: 'servicies',
  templateUrl: './servicies.component.html',
  styleUrls: ['../main.component.scss']
})
export class ServiciesComponent implements OnInit {

  get user() {
    return this.logService.User;
  }

  get serviciesStatus () {
    return this.mainService.serviciesStatus;
  }

  constructor(private mainService: MainService, private logService: LogginService) { 
    this.mainService.getServicies$.subscribe(
      (data: Service[]) => {
        this.serviciesData = data;
      }
    );
    
  }

  ngOnInit(): void {
  }

  public serviciesData: Service[] = [];
  public serviceName: string = "";

  public back () {
    this.mainService.serviciesStatus = false;
    this.serviceName = "";
  }

  public create () {
    this.mainService.serviciesStatus = true;
  }

  public save () {
    let data = {
      user_id: this.user.id,
      create: true,
      name: this.serviceName
    }
    this.mainService.actionService(data);
    this.serviceName = "";
  }

  public delete (service: Service) {
    let data = {
      user_id: this.user.id,
      id: service._id,
      delete: true
    }
    this.mainService.actionService(data);
  }

  public close () {
    this.mainService.blurTemplate = false;
    this.mainService.windowsAction.servicies = false;
    this.mainService.serviciesStatus = false;
  }



}
