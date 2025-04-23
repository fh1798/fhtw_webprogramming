// src/ChatUI.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiService } from "./ApiService.js";
import { StateManager } from "./StateManager.js";
export class ChatUI {
    constructor() {
        this.initEventListeners();
    }
    initEventListeners() {
        // 1) Registration
        const regForm = document.getElementById("registerForm");
        if (regForm) {
            regForm.addEventListener("submit", (event) => this.handleRegister(event));
        }
        // 2) Login
        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", (event) => this.handleLogin(event));
        }
        // 3) Get Users
        const loadUsersBtn = document.getElementById("loadUsersBtn");
        if (loadUsersBtn) {
            loadUsersBtn.addEventListener("click", () => this.handleGetUsers());
        }
        // 4) Send Message
        const sendForm = document.getElementById("sendForm");
        if (sendForm) {
            sendForm.addEventListener("submit", (event) => this.handleSendMessage(event));
        }
    }
    // --------------------------------------------------------------------------
    // Task 1: Handle Register
    // --------------------------------------------------------------------------
    handleRegister(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const regResultDiv = document.getElementById("registerResult");
            const name = document.getElementById("regName").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const pass = document.getElementById("regPass").value.trim();
            const group = document.getElementById("regGroup").value.trim();
            try {
                if (regResultDiv)
                    regResultDiv.textContent = "Registering ...";
                const response = yield ApiService.registerUser(name, email, pass, group);
                if (response.success) {
                    if (regResultDiv) {
                        regResultDiv.textContent = `Registration successful! New user ID: ${response.id}`;
                    }
                    // Optionally reset form
                    event.target.reset();
                }
                else {
                    if (regResultDiv) {
                        regResultDiv.textContent = `Registration failed: ${response.error || "Unknown error"}`;
                    }
                }
            }
            catch (err) {
                console.error("handleRegister Error:", err);
                if (regResultDiv)
                    regResultDiv.textContent = "Network or server error.";
            }
        });
    }
    // --------------------------------------------------------------------------
    // Task 2: Handle Login
    // --------------------------------------------------------------------------
    handleLogin(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const loginResultDiv = document.getElementById("loginResult");
            const usernameOrEmail = document.getElementById("loginUser").value.trim();
            const password = document.getElementById("loginPass").value.trim();
            try {
                if (loginResultDiv)
                    loginResultDiv.textContent = "Logging in ...";
                const response = yield ApiService.loginUser(usernameOrEmail, password);
                if (response.token) {
                    // Save the token in StateManager
                    StateManager.setToken(response.token);
                    if (loginResultDiv) {
                        loginResultDiv.textContent = `Login successful! Token: ${response.token}`;
                    }
                    event.target.reset();
                }
                else {
                    if (loginResultDiv) {
                        loginResultDiv.textContent = `Login failed: ${response.error || "Unknown error"}`;
                    }
                }
            }
            catch (err) {
                console.error("handleLogin Error:", err);
                if (loginResultDiv)
                    loginResultDiv.textContent = "Network or server error.";
            }
        });
    }
    // --------------------------------------------------------------------------
    // Task 3: Get Users
    // --------------------------------------------------------------------------
    handleGetUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersList = document.getElementById("usersList");
            if (usersList)
                usersList.innerHTML = "Loading users...";
            try {
                const data = yield ApiService.getUsers();
                // data can be either an array of User or an {error: string}
                if (Array.isArray(data)) {
                    // success
                    if (usersList) {
                        usersList.innerHTML = "";
                        data.forEach((user) => {
                            const li = document.createElement("li");
                            li.textContent = `User: ${user.name} (ID: ${user.id}), group: ${user.group_id}`;
                            usersList.appendChild(li);
                        });
                    }
                }
                else {
                    // data is an object with `error` property
                    if (usersList) {
                        usersList.innerHTML = `Error: ${data.error}`;
                    }
                }
            }
            catch (err) {
                console.error("handleGetUsers Error:", err);
                if (usersList)
                    usersList.innerHTML = "Network or server error while loading users.";
            }
        });
    }
    // --------------------------------------------------------------------------
    // Task 4: Send Message
    // --------------------------------------------------------------------------
    handleSendMessage(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const sendResultDiv = document.getElementById("sendResult");
            const senderId = document.getElementById("senderId").value.trim();
            const receiverId = document.getElementById("receiverId").value.trim();
            const message = document.getElementById("messageText").value.trim();
            try {
                if (sendResultDiv)
                    sendResultDiv.textContent = "Sending message ...";
                const response = yield ApiService.sendMessage(senderId, receiverId, message);
                if (response.success) {
                    if (sendResultDiv)
                        sendResultDiv.textContent = "Message successfully sent!";
                    event.target.reset();
                }
                else {
                    if (sendResultDiv) {
                        sendResultDiv.textContent = `Error: ${response.error || "Unknown error"}`;
                    }
                }
            }
            catch (err) {
                console.error("handleSendMessage Error:", err);
                if (sendResultDiv)
                    sendResultDiv.textContent = "Network or server error while sending message.";
            }
        });
    }
}
