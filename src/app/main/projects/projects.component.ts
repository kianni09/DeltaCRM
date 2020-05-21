import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Project } from '../main.models';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../main.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private mainService: MainService) { 
    this.mainService.getProjects$.subscribe(
      (data: Project[]) => {
        this.projectsData = data;
        console.log(data);
      }
    );
  }

  ngOnInit(): void {
  }

  public projectsData: Project[] = [];
  public projectIndex: number = 0;

  private projectSelect(index: number){
    this.projectIndex = index;
  }

}
