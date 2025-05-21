import { Injectable } from '@angular/core';

interface joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getJoke(): Promise<string> {
    return await fetch('https://official-joke-api.appspot.com/random_joke')
      .then((response) => response.json())
      .then((data) => {
        let dataJoke = data as joke;
        return `${dataJoke.setup} - ${dataJoke.punchline}`;
      });
  }
}
