// src/StateManager.ts
export class StateManager {
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
StateManager._token = null;
StateManager._currentUser = null;
