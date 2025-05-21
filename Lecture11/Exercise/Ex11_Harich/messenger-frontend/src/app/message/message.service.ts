// src/app/message/message.service.ts
import { Injectable, signal } from '@angular/core';

export interface Message {
  sender: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  readonly messages = signal<Message[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  loadMessages(): void {
    this.isLoading.set(true);

    fetch('assets/mock-messages.json')
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(data => this.messages.set(data))
      .catch(() => this.errorMessage.set('Failed to load messages'))
      .finally(() => this.isLoading.set(false));
  }
}
