import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'login', component: LoginComponent}
];
