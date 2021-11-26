import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import { LogginService } from 'src/app/loggin/loggin.service';
import { MainService } from '../main.service';
import { Message } from '../main.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../main.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  get user() {
    return this.logService.User;
  }

  message: string;
  messagesData: Message[] = [];

  subcription: Subscription;

  constructor(
    private chatService: ChatService,
    private logService: LogginService,
    private mainService: MainService
  ) {
    
  }

  ngOnInit(): void {
    this.chatService.initMessages();
    this.subcription = this.chatService.getMessages().subscribe((messages: Message[]) => {
      console.log(messages);
      this.messagesData = messages;
    });
    this.mainService.newMessages = false;
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  sendMessage() {
    if (!this.message) return;
    let m: Message = {
      user_id: this.user.id,
      user_name: this.user.name,
      date: new Date(),
      text: this.message,
    };
    this.chatService.sendMessage(m);
    this.message = '';
  }

  public close() {
    this.mainService.blurTemplate = false;
    this.mainService.windowsAction.chat = false;
  }
}
