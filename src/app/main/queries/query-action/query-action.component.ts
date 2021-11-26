import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogginService } from 'src/app/loggin/loggin.service';
import { MainService } from '../../main.service';
import {
  Query,
  QueryRow,
  Service,
  Client,
  QueryService,
} from '../../main.models';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from '../../CustomDateAdapter';

@Component({
  selector: 'query-action',
  templateUrl: './query-action.component.html',
  styleUrls: ['../../main.component.scss'],
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
})
export class QueryActionComponent implements OnInit, OnDestroy {
  get userID(): string {
    return this.logService.User.id;
  }

  get projectID(): string {
    return this.mainService.projectID;
  }

  get queryTypes(): string[] {
    return ['Терміновий', 'Стандарт'];
  }

  public servicies: Service[] = [];
  public clients: Client[] = [];

  get selectedQuery(): QueryRow {
    return this.mainService.selectedQuery;
  }

  public queryBody: Query = {
    project_id: this.projectID,
    date: new Date(),
    term: '',
    client_name: '',
    query: '',
    query_id: '',
    servicies: [],
    status: false,
  };

  private servicesSubscriber: Subscription;
  private clientsSubscriber: Subscription;

  constructor(
    private logService: LogginService,
    private mainService: MainService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('uk');
  }

  ngOnInit(): void {
    this.servicesSubscriber = this.mainService.getServicies$
      .asObservable()
      .subscribe((data: Service[]) => {
        this.servicies = data;
        console.log('servicies');
      });
    this.clientsSubscriber = this.mainService.getClients$
      .asObservable()
      .subscribe((data: Client[]) => {
        this.clients = data;
        console.log('clients');
      });
    if (this.selectedQuery) {
      this.queryBody.date = this.selectedQuery.date;
      this.queryBody.term = this.selectedQuery.term;
      this.queryBody.client_name = this.selectedQuery.client_name;
      console.log(this.queryBody.client_name);
      this.queryBody.query = this.selectedQuery.query;
      this.queryBody.query_id = this.selectedQuery.query_id;
      this.queryBody.servicies = [...this.selectedQuery.servicies];
      this.queryBody.status = this.selectedQuery.status;
    }
  }

  ngOnDestroy(): void {
    this.servicesSubscriber.unsubscribe();
    this.clientsSubscriber.unsubscribe();
  }

  public multiLoader: boolean = false;
  public fileSelected: string = '';
  public fileQueries: Query[] = [];

  public fileEvent(fileList: FileList) {

    let multiQueries = (data: string[][]) => {
      this.fileQueries = data.map( (row) => {
        let query = { ...this.queryBody };
        query.query = row[0];
        query.query_id = row[1];
        console.log(query);
        return query;
      } )
    };

    let file = fileList[0];
    this.fileSelected = file.name;
    let fileReader: FileReader = new FileReader();

    fileReader.onloadend = function (x) {
      let textArray = fileReader.result
        .toString()
        .split('\n')
        .map((row) => {
          return row.split(';');
        });
      textArray = textArray.filter((row) => {
        return row.length > 1;
      });
      multiQueries (textArray);
    };
    fileReader.readAsText(file, 'CP1251');
  }

  public multiSave () {
    for (let query of this.fileQueries) {
      this.mainService.windowsAction.query = false;
      this.mainService.onDataLoad = true;
      let request = {
        user_id: this.userID,
        create: true,
        body: query,
      };
      this.mainService.actionQuery(request);
    }
    this.close();
  }

  public save() {
    let request;
    if (this.selectedQuery) {
      request = {
        user_id: this.userID,
        id: this.selectedQuery.id,
        update: true,
        body: this.queryBody,
      };
    } else {
      request = {
        user_id: this.userID,
        create: true,
        body: this.queryBody,
      };
    }
    this.mainService.actionQuery(request);
    this.close();
  }

  public close() {
    this.mainService.blurTemplate = false;
    this.mainService.windowsAction.query = false;
    this.mainService.selectedQuery = undefined;
    this.mainService.onDataLoad = false;
  }

  public serviceAction: boolean = false;
  public serviceName: string = '';
  public serviceComment: string = '';

  public serviceAdd() {
    let service: QueryService = {
      service_name: this.serviceName,
      comment: this.serviceComment,
    };
    this.queryBody.servicies.push(service);
    this.serviceClose();
  }

  public serviceClose() {
    this.serviceComment = '';
    this.serviceName = '';
    this.serviceAction = false;
  }
}
