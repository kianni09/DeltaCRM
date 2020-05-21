import { Injectable } from '@angular/core';
import { LogginService } from '../loggin/loggin.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Project } from './main.models';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor( private http: HttpClient, private logService: LogginService ) { }

  public getProjects$ = new BehaviorSubject <Project[]> ([]);

  public loadProjects (user_id: string) {
    let request = {
      user_id: user_id,
      get: true
    };
    this.http.post( environment.projects, request )
      .subscribe(
        (data: Project[]) => {
          if (data) {
            this.getProjects$.next(data);
          }
        }
      );
  }

}
