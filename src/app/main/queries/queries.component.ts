import { Component, OnInit } from '@angular/core';
import { Table } from '../table.model';
import { MainService } from '../main.service';
import { QueryRow} from '../main.models';
import { LogginService } from '../../loggin/loggin.service';
import { DatePipe } from '@angular/common'


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
    return this.mainService.projectID;
  }

  public dataTable: Table;

  constructor(private mainService: MainService, private logService: LogginService, private datepipe: DatePipe) {
    this.mainService.getQueries$.subscribe(
      (data: QueryRow[]) => {
        console.log(data);
        this.dataTable = new Table(data);
      }
    );
   }

  ngOnInit(): void {
  }

  public dataView(date: Date): string {
    return this.datepipe.transform(date, 'dd.MM.yyyy');
  }

  public queryActionDataLoad () {
    this.mainService.loadServicies(this.user.id);
    this.mainService.loadClients(this.user.id, this.projectID);
  }

  public action (query: QueryRow){
    this.queryActionDataLoad();
    this.mainService.selectedQuery = query ? query : undefined;
    this.mainService.blurTemplate = true;
    this.mainService.windowsAction.query = true;
  }

}
