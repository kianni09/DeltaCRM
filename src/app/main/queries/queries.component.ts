import { Component, OnInit } from '@angular/core';
import { Table } from '../table.model';
import { MainService } from '../main.service';
import { QueryRow} from '../main.models';
import { LogginService } from '../../loggin/loggin.service';


@Component({
  selector: 'queries',
  templateUrl: './queries.component.html',
  styleUrls: ['../main.component.scss']
})
export class QueriesComponent implements OnInit {

  get user() {
    return this.logService.User;
  }

  get projectID () {
    return this.mainService.projectIndex;
  }

  public dataTable: Table;

  constructor(private mainService: MainService, private logService: LogginService) {
    this.mainService.getQueries$.subscribe(
      (data: QueryRow[]) => {
        console.log(data);
        this.dataTable = new Table(data);
      }
    );
   }

  ngOnInit(): void {
  }

}
