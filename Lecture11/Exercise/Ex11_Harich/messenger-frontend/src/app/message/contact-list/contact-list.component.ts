import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactService } from '../contact.service'; // adjust path as needed

@Component({
  standalone: true,
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  constructor(public contactService: ContactService) {}
}
