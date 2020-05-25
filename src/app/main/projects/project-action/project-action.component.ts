import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { LogginService } from 'src/app/loggin/loggin.service';


@Component({
  selector: 'project-action',
  templateUrl: './project-action.component.html',
  styleUrls: ['../../main.component.scss']
})
export class ProjectActionComponent implements OnInit {

  public headerText: string = "Додати проект";
  public projectName: string = ""; 

  get projectSelected(){
    return this.mainService.projectOnAction;
  }

  get user () {
    return this.logService.User;
  }

  constructor(private mainService: MainService, private logService: LogginService) {
    if (this.projectSelected) {
      this.projectName = this.projectSelected.name;
      this.headerText = "Редагувати проект";
    }
   }

  ngOnInit(): void {
  }

  public save () {
    let data;
    if (this.projectSelected) {
      data = {
        user_id: this.user.id,
        id: this.projectSelected._id,
        update: true,
        name: this.projectName
      };
    } else {
      data = {
        user_id: this.user.id,
        create: true,
        name: this.projectName
      };
    }
    this.mainService.actionProject(data);
  }

  public close (){
    this.mainService.blurTemplate = false;
    this.mainService.windowsAction.project = false;
  }

}
