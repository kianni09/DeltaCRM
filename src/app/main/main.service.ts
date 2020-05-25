import { Injectable } from '@angular/core';
import { LogginService } from '../loggin/loggin.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import {
  Project,
  Service,
  Client,
  QueryTemplate,
  QueryRow,
} from './main.models';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private logService: LogginService) {}

  public projectIndex: number = 0;
  public projectID: string = '';

  public getProjects$ = new BehaviorSubject<Project[]>([]);

  public loadProjects(user_id: string) {
    let request = {
      user_id: user_id,
      get: true,
    };
    this.http
      .post(environment.projects, request)
      .subscribe((data: Project[]) => {
        if (data) {
          this.getProjects$.next(data);
          this.dataLoad();
        }
      });
  }

  public blurTemplate: boolean = false;
  public onDataLoad: boolean = false;

  private dataLoad() {
    this.blurTemplate = false;
    this.onDataLoad = false;
  }

  public windowsAction = {
    project: false,
    delete: false,
    clients: false,
    servicies: false,
  };

  public projectOnAction: Project = null;

  public actionProject(request: any) {
    this.windowsAction.project = false;
    this.onDataLoad = true;
    this.http
      .post(environment.projects, request)
      .subscribe((data: Project[]) => {
        if (data) {
          this.loadProjects(request.user_id);
        }
      });
  }

  public serviciesStatus: boolean = false;
  public getServicies$ = new BehaviorSubject<Service[]>([]);

  public loadServicies(user_id: string) {
    let request = {
      user_id: user_id,
      get: true,
    };
    this.http
      .post(environment.servicies, request)
      .subscribe((data: Service[]) => {
        if (data) {
          console.log(data);
          this.getServicies$.next(data);
        }
      });
  }

  public actionService(request: any) {
    this.http
      .post(environment.servicies, request)
      .subscribe((data: Service[]) => {
        if (data) {
          this.loadServicies(request.user_id);
          this.serviciesStatus = false;
        }
      });
  }

  public clientsStatus: boolean = false;
  public getClients$ = new BehaviorSubject<Client[]>([]);

  public loadClients(user_id: string, project_id: string) {
    let request = {
      user_id: user_id,
      project_id: project_id,
      get: true,
    };
    this.http.post(environment.clients, request).subscribe((data: Client[]) => {
      if (data) {
        console.log(data);
        this.getClients$.next(data);
      }
    });
  }

  public actionClients(request: any) {
    this.http.post(environment.clients, request).subscribe((data: Client[]) => {
      if (data) {
        this.loadClients(request.user_id, request.project_id);
        this.clientsStatus = false;
      }
    });
  }

  public getQueries$ = new BehaviorSubject<QueryRow[]>([]);

  public loadQueries(request: any) {
    this.http
      .post(environment.queries, request)
      .subscribe((data: QueryTemplate[]) => {
        if (data) {
          this.getQueries$.next(
            data.map((qt: QueryTemplate) => {
              return { id: qt._id, ...qt.body };
            })
          );
        }
      });
  }
}
