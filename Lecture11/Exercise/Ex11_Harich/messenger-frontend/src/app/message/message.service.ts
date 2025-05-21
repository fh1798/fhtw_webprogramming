// src/app/message/message.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { ContactService } from './contact.service'; // adjust path if needed

export interface Message {
  sender: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  readonly messages = signal<Message[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  constructor(private contactService: ContactService) {
    // Optional effect: triggers when contact selection changes
    effect(() => {
      this.contactService.selectedContact();
      // This effect runs automatically, but you can add logic if needed.
    });
  }

  readonly filteredMessages = computed(() =>
    this.messages().filter(msg =>
      !this.contactService.selectedContact() ||
      msg.sender === this.contactService.selectedContact()
    )
  );

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
