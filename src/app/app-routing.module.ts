import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogginComponent } from './loggin/loggin.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'loggin', component: LogginComponent},
  { path: 'main', component: MainComponent},
  { path: '**', redirectTo: 'loggin'},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
