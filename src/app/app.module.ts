import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { HttpClientModule }   from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsComponent } from './main/projects/projects.component';
import { QueriesComponent } from './main/queries/queries.component';
import { ClientsComponent } from './main/clients/clients.component';
import { ServiciesComponent } from './main/servicies/servicies.component';
import { ProjectActionComponent } from './main/projects/project-action/project-action.component';
import { QueryActionComponent } from './main/queries/query-action/query-action.component';

const material = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatDatepickerModule,
  MatPaginatorModule,
  MatSortModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSelectModule,
  MatIconModule
]

@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    MainComponent,
    ProjectsComponent,
    QueriesComponent,
    ClientsComponent,
    ServiciesComponent,
    ProjectActionComponent,
    QueryActionComponent
  ],
  imports: [
    material,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
