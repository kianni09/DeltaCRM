import { Component, OnInit } from '@angular/core';
import { LogginService } from './loggin.service';


@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss']
})
export class LogginComponent implements OnInit {

  public loggin: string = "";
  public password: string = "";

  constructor(private logService: LogginService) { }

  ngOnInit(): void {
  }

  public OnLoggin () {
    this.logService.OnLoggin( {loggin: this.loggin, password: this.password} );
  }

  get LogginResult () {
    return this.logService.getLogginResult;
  }

}
