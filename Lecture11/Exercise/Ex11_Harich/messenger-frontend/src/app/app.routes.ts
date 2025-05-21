import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './auth/login/login.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: MessageListComponent, canActivate: [authGuard] },
  {
    path: 'messages',
    loadComponent: () =>
      import('./message/message-page/message-page.component').then(m => m.MessagesPageComponent),
    canActivate: [authGuard]
  }
];
