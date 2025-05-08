// src/ChatUI.ts

import { ApiService } from "./ApiService.js";
import { StateManager } from "./StateManager.js";
import type { User, ApiResponse } from "./ApiService.js";


export class ChatUI {
  private selectedUserId: string | null = null;

  constructor() {
    this.initEventListeners();
  }

  private initEventListeners() {
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
  private async handleRegister(event: Event) {
    event.preventDefault();
    const regResultDiv = document.getElementById("registerResult");

    const name     = (document.getElementById("regName")   as HTMLInputElement).value.trim();
    const email    = (document.getElementById("regEmail")  as HTMLInputElement).value.trim();
    const pass     = (document.getElementById("regPass")   as HTMLInputElement).value.trim();
    const group    = (document.getElementById("regGroup")  as HTMLInputElement).value.trim();

    try {
      if (regResultDiv) regResultDiv.textContent = "Registering ...";
      const response = await ApiService.registerUser(name, email, pass, group);

      if (response.success) {
        if (regResultDiv) {
          regResultDiv.textContent = `Registration successful! New user ID: ${response.id}`;
        }
        // Optionally reset form
        (event.target as HTMLFormElement).reset();
      } else {
        if (regResultDiv) {
          regResultDiv.textContent = `Registration failed: ${response.error || "Unknown error"}`;
        }
      }
    } catch (err) {
      console.error("handleRegister Error:", err);
      if (regResultDiv) regResultDiv.textContent = "Network or server error.";
    }
  }

  // --------------------------------------------------------------------------
  // Task 2: Handle Login
  // --------------------------------------------------------------------------
  private async handleLogin(event: Event) {
    event.preventDefault();
    const loginResultDiv = document.getElementById("loginResult");

    const usernameOrEmail = (document.getElementById("loginUser") as HTMLInputElement).value.trim();
    const password        = (document.getElementById("loginPass") as HTMLInputElement).value.trim();

    try {
      if (loginResultDiv) loginResultDiv.textContent = "Logging in ...";
      const response = await ApiService.loginUser(usernameOrEmail, password);
      if (response.token) {
        // Save the token in StateManager
        StateManager.setToken(response.token);

        if (loginResultDiv) {
          loginResultDiv.textContent = `Login successful! Token: ${response.token}`;
        }
        (event.target as HTMLFormElement).reset();
      } else {
        if (loginResultDiv) {
          loginResultDiv.textContent = `Login failed: ${response.error || "Unknown error"}`;
        }
      }
    } catch (err) {
      console.error("handleLogin Error:", err);
      if (loginResultDiv) loginResultDiv.textContent = "Network or server error.";
    }
  }

  // --------------------------------------------------------------------------
  // Task 3: Get Users
  // --------------------------------------------------------------------------
  private async handleGetUsers() {
    const usersList = document.getElementById("usersList");
    if (usersList) usersList.innerHTML = "Loading users...";

    try {
      const data = await ApiService.getUsers();
      // data can be either an array of User or an {error: string}
      if (Array.isArray(data)) {
        // success
        if (usersList) {
          usersList.innerHTML = "";
          data.forEach((user: User) => {
            const li = document.createElement("li");
            li.textContent = `${user.name} (Group: ${user.group_id})`;
            li.dataset.userId = user.id;
          
            li.style.cursor = "pointer";
            li.addEventListener("click", () => this.onUserClick(user.id));
          
            usersList.appendChild(li);
          });
          
        }
      } else {
        // data is an object with `error` property
        if (usersList) {
          usersList.innerHTML = `Error: ${data.error}`;
        }
      }
    } catch (err) {
      console.error("handleGetUsers Error:", err);
      if (usersList) usersList.innerHTML = "Network or server error while loading users.";
    }
  }

  // --------------------------------------------------------------------------
  // Task 4: Send Message
  // --------------------------------------------------------------------------
  private async handleSendMessage(event: Event) {
    event.preventDefault();
    const sendResultDiv = document.getElementById("sendResult");

    const senderId   = (document.getElementById("senderId")   as HTMLInputElement).value.trim();
    const receiverId = (document.getElementById("receiverId") as HTMLInputElement).value.trim();
    const message    = (document.getElementById("messageText")as HTMLInputElement).value.trim();

    try {
      if (sendResultDiv) sendResultDiv.textContent = "Sending message ...";
      const response = await ApiService.sendMessage(senderId, receiverId, message);
      if (response.success) {
        if (sendResultDiv) sendResultDiv.textContent = "Message successfully sent!";
        (event.target as HTMLFormElement).reset();
      } else {
        if (sendResultDiv) {
          sendResultDiv.textContent = `Error: ${response.error || "Unknown error"}`;
        }
      }
    } catch (err) {
      console.error("handleSendMessage Error:", err);
      if (sendResultDiv) sendResultDiv.textContent = "Network or server error while sending message.";
    }
  }

  private async onUserClick(userId: string) {
    this.selectedUserId = userId; // Store selected user (optional for later use)
  
    const currentUser = StateManager.getCurrentUser();
    if (!currentUser) return;
  
    const messages = await ApiService.getConversation(currentUser.id, userId);
    this.displayConversation(messages); // You’ll implement this next
  }
  
  private displayConversation(messages: any[]) {
    const chatContainer = document.getElementById("chat-messages");
    if (!chatContainer) return;
  
    chatContainer.innerHTML = ""; // Clear old messages
  
    const currentUser = StateManager.getCurrentUser();
    if (!currentUser) return;
  
    messages.forEach(msg => {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("chat-message");
  
      if (msg.sender_id === currentUser.id) {
        msgDiv.classList.add("sent");
      } else {
        msgDiv.classList.add("received");
      }
  
      msgDiv.textContent = msg.message;
      chatContainer.appendChild(msgDiv);
    });
  
    // Optional: scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  
}