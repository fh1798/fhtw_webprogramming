// src/StateManager.ts

import type { User } from "./ApiService.js";

export class StateManager {
  private static _token: string | null = null;
  private static _currentUser: User | null = null;

  static setToken(token: string | null) {
    this._token = token;
  }

  static getToken(): string | null {
    return this._token;
  }

  static setCurrentUser(user: User | null) {
    this._currentUser = user;
  }

  static getCurrentUser(): User | null {
    return this._currentUser;
  }
}