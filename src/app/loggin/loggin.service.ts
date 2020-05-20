import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogginService {
  constructor(private http: HttpClient, private router: Router) {
    this.UserLoad();
  }

  private UserLoad() {
    if (localStorage.getItem("User")) {
      this.UserData = JSON.parse(localStorage.getItem("User"));
    } else {
      this.Exit();
    }
  }

  private UserSave() {
    localStorage.setItem("User", JSON.stringify(this.UserData));
  }

  public logginBehavior$ = new BehaviorSubject(undefined);

  public OnLoggin(data: any) {
    this.http.post(environment.loggin, data).subscribe(
      (data: any) => {
        if (data) {
          this.LogginResult = true;
          this.UserData = data;
          this.UserSave()
          this.router.navigate(['main']);
        } else {
          this.LogginResult = data;
        }
        this.logginBehavior$.next(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private LogginResult: boolean = true;

  get getLogginResult(): boolean {
    return this.LogginResult;
  }

  private UserData: User = undefined;

  get User(): User {
    return this.UserData;
  }

  public Exit() {
    this.UserData = undefined;
    this.LogginResult = true;
    localStorage.removeItem("User");
    this.router.navigate(['loggin']);
  }
}

export interface User {
  id: string;
  name: string;
}
