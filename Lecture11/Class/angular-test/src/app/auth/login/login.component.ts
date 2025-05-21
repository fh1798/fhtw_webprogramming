import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalService } from '../../services/signal.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  textToShow: string = 'Text in Login Komponente';
  textboxValue: string = "Startwert";

  constructor(private signalService: SignalService){}

  changeText(): void {
    this.textToShow += ' ' + this.textboxValue;
    this.signalService.setMessage(this.textboxValue);
  }
}
