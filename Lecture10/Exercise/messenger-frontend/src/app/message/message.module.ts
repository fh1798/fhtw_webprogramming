import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list/message-list.component';
import { ConversationComponent } from './conversation/conversation.component';

@NgModule({
  declarations: [
    MessageListComponent,
    ConversationComponent
  ],
  imports: [
    CommonModule  // ← Required for *ngFor, *ngIf, etc.
  ],
  exports: [
    MessageListComponent
  ]
})
export class MessageModule { }
