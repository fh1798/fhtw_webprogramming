// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './auth/login/login.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { routes } from './app.routes';
import { MessageModule } from './message/message.module';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MessageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
