// src/app/message/messages-page/messages-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from '../message-list/message-list.component';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  standalone: true,
  selector: 'app-message-page',
  imports: [CommonModule, MessageListComponent, ContactListComponent],
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagesPageComponent {}
