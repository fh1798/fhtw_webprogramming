import { Component, effect } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SignalService } from './services/signal.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  message = '';

  constructor(private signalService: SignalService) {
    effect(() => {
      this.message = signalService.getMessage();
    });
  }
}
