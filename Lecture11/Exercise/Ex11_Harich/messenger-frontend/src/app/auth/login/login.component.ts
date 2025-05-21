import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = 'tt';
  password = 'tt';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    const success = this.auth.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/messages']); // redirect to messages
    } else {
      this.error = 'Invalid login';
    }
  }
}
