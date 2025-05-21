import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: string;
  content: string;
}

@Component({
  standalone: true,
  selector: 'app-message-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})


export class MessageListComponent {
  newMessage = '';

  constructor(public msgService: MessageService) {
    this.msgService.loadMessages();
  }

  sendMessage(): void {
    const message: Message = {
      sender: 'You', // replace with real username if available
      content: this.newMessage.trim(),
    };

    fetch('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    }).then(() => {
      this.msgService.messages.update(msgs => [...msgs, message]);
      this.newMessage = '';
      this.scrollToBottom();
    });
  }

  refreshMessages(): void {
    this.msgService.loadMessages();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const el = document.getElementById('message-container');
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}
