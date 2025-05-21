import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  readonly contacts = signal<User[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  constructor() {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading.set(true);
    fetch('/assets/mock-users.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => this.contacts.set(data))
      .catch(() => this.errorMessage.set('Failed to load contacts'))
      .finally(() => this.isLoading.set(false));
  }

  selectContact(user: User): void {
    // This will later notify parent / shared service
    console.log('Selected user:', user);
  }
}
