import { Component } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages = [
    { sender: 'Alice', content: 'Hello there!' },
    { sender: 'Bob', content: 'Welcome to the messenger app!' }
  ];
}
