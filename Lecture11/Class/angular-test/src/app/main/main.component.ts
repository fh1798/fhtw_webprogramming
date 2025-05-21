import { Component, effect } from '@angular/core';
import { SignalService } from '../services/signal.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  message: string = '';
  joke: string = 'Noch kein Joke';

  constructor(
    private signalService: SignalService,
    private apiService: ApiService
  ) {
    effect(() => {
      this.message = signalService.getMessage();
    });
  }

  buttonClick() {
    this.signalService.setMessage('Ich bins, Main!');
  }

  async jokeClick(): Promise<void> {
    this.joke = await this.apiService.getJoke();
  }
}
