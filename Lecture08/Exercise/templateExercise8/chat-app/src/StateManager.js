"use strict";
// src/StateManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateManager = void 0;
class StateManager {
    static setToken(token) {
        this._token = token;
    }
    static getToken() {
        return this._token;
    }
    static setCurrentUser(user) {
        this._currentUser = user;
    }
    static getCurrentUser() {
        return this._currentUser;
    }
}
exports.StateManager = StateManager;
StateManager._token = null;
StateManager._currentUser = null;
