import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly contacts = signal<Contact[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly selectedContact = signal<string | null>(null);

selectContact(name: string) {
  this.selectedContact.set(name);
}

  constructor() {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading.set(true);

    fetch('assets/mock-contacts.json')
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(data => this.contacts.set(data))
      .catch(() => this.errorMessage.set('Failed to load contacts'))
      .finally(() => this.isLoading.set(false));
  }
}
