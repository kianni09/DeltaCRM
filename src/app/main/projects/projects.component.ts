import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Project } from '../main.models';
import { LogginService } from '../../loggin/loggin.service';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../main.component.scss']
})
export class ProjectsComponent implements OnInit {

  get user() {
    return this.logService.User;
  }

  constructor(private mainService: MainService, private logService: LogginService) { 
    this.mainService.getProjects$.subscribe(
      (data: Project[]) => {
        this.projectsData = data;
        if (data.length > 0) this.projectSelect(0);
        console.log(data);
      }
    );
  }

  ngOnInit(): void {
  }

  public projectsData: Project[] = [];

  get projectIndex () {
    return this.mainService.projectIndex;
  }

  public projectSelect(index: number){
    this.mainService.projectIndex = index;
    this.mainService.projectID = this.projectsData[this.projectIndex]._id;
    this.mainService.projectName = this.projectsData[this.projectIndex].name;
    let data = {
      user_id: this.user.id,
      get: true,
      body: {
        project_id: this.mainService.projectID
      }
    }
    this.mainService.loadQueries(data);
  }

  public projectAction(type: string = null, project: Project = null ){
    this.mainService.blurTemplate = true;
    this.mainService.projectOnAction = project;
    if (type == "create" || type == "edit"){
      this.mainService.windowsAction.project = true;
    } else if (type == "delete") {
      let data = {
        user_id: this.user.id,
        id: project._id,
        delete: true
      }
      this.mainService.actionProject(data);
    } else if (type == "clients") {
      this.mainService.windowsAction.clients = true;
      this.mainService.loadClients(this.user.id, project._id);
    } else if (type == "servicies") {
      this.mainService.windowsAction.servicies = true;
    }
    
  }

}
