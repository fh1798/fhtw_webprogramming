import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from '../message.service';

interface Message {
  sender: string;
  content: string;
}

@Component({
  standalone: true,
  selector: 'app-message-list',
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})


export class MessageListComponent {
  constructor(public msgService: MessageService) {
    this.msgService.loadMessages();
  }
}