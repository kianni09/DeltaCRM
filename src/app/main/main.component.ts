import { Component, OnInit } from '@angular/core';
import { LogginService } from '../loggin/loggin.service';
import { MainService } from './main.service';
import { Project, Message } from './main.models';
import { ChatService } from './chat/chat.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private logService: LogginService,
    private mainService: MainService,
    private chatService: ChatService
  ) {
    if (!this.User) {
      this.logService.Exit();
    }
    this.mainService.loadProjects(this.User.id);
    this.mainService.loadServicies(this.User.id);
    this.chatService.getMessages().subscribe((messages: Message[]) => {
      if (!this.mainService.windowsAction.chat) {
        console.log('got messages');
        this.mainService.newMessages = true;
      }
    });
  }

  get newMessages (): boolean {
    return this.mainService.newMessages;
  }

  get User() {
    return this.logService.User;
  }

  get onDataLoad() {
    return this.mainService.onDataLoad;
  }

  ngOnInit(): void {}

  public OnExit() {
    this.logService.Exit();
  }

  get blurTemplate(): boolean {
    return this.mainService.blurTemplate;
  }

  get window() {
    return this.mainService.windowsAction;
  }

  public openChat() {
    this.mainService.blurTemplate = true;
    this.mainService.windowsAction.chat = true;
  }
}
