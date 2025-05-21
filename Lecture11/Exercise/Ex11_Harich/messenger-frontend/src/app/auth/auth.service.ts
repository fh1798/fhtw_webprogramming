import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser = typeof window !== 'undefined'; // ✅ Check if we're in browser

  private loggedIn = signal<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      this.loggedIn.set(localStorage.getItem('isLoggedIn') === 'true');
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'tt' && password === 'tt') {
      if (this.isBrowser) {
        localStorage.setItem('isLoggedIn', 'true');
      }
      this.loggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('isLoggedIn');
    }
    this.loggedIn.set(false);
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      const stored = localStorage.getItem('isLoggedIn') === 'true';
      this.loggedIn.set(stored);
    }
    console.log('Auth check, is logged in:', this.loggedIn());
    return this.loggedIn();
  }
}
