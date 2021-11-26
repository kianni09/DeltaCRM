import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Client } from '../main.models';
import { LogginService } from '../../loggin/loggin.service';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['../main.component.scss']
})
export class ClientsComponent implements OnInit {

  get user() {
    return this.logService.User;
  }

  get clientsStatus () {
    return this.mainService.clientsStatus;
  }

  get project () {
    return this.mainService.projectOnAction;
  }

  constructor(private mainService: MainService, private logService: LogginService) {
    this.mainService.getClients$.subscribe(
      (data: Client[]) => {
        this.clientsData = data;
      }
    );
   }

  ngOnInit(): void {
  }

  public clientsData: Client[] = [];
  public clientName: string = "";

  public back () {
    this.mainService.clientsStatus = false;
    this.clientName = "";
  }

  public create () {
    this.mainService.clientsStatus = true;
  }

  public save () {
    let data = {
      user_id: this.user.id,
      project_id: this.project._id,
      create: true,
      name: this.clientName
    }
    this.mainService.actionClients(data);
    this.clientName = "";
  }

  public delete (service: Client) {
    let data = {
      user_id: this.user.id,
      project_id: this.project._id,
      id: service._id,
      delete: true
    }
    this.mainService.actionClients(data);
  }

  public close () {
    this.mainService.blurTemplate = false;
    this.mainService.windowsAction.clients = false;
    this.mainService.clientsStatus = false;
    this.mainService.getClients$.next([]);
  }


}
