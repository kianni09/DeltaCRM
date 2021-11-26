import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../main.service';
import { LogginService } from '../../loggin/loggin.service';
import { Client } from '../main.models';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from '../CustomDateAdapter';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['../main.component.scss'],
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
})
export class ReportComponent implements OnInit, OnDestroy {
  get userID(): string {
    return this.logService.User.id;
  }

  get projectID(): string {
    return this.mainService.projectID;
  }

  private clientsSubscriber: Subscription;
  public clients: Client[] = [];

  constructor(
    private mainService: MainService,
    private logService: LogginService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('uk');
  }

  ngOnInit(): void {
    this.clientsSubscriber = this.mainService.getClients$
      .asObservable()
      .subscribe((data: Client[]) => {
        this.clients = data;
        console.log('clients');
      });
  }

  ngOnDestroy(): void {
    this.clientsSubscriber.unsubscribe();
  }

  public dateFrom: Date = new Date();
  public dateAlong: Date = new Date();
  public client: string = '';

  public download() {
    let request = {
      user_id: this.userID,
      project_id: this.projectID,
      report: true,
      date_from: this.dateFrom,
      date_along: this.dateAlong,
      client: this.client,
    };
    this.mainService.getReport(request);
    this.close();
  }

  public close() {
    this.mainService.blurTemplate = false;
    this.mainService.windowsAction.report = false;
  }
}
