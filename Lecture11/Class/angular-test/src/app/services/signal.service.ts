import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  message: WritableSignal<string> = signal<string>('');

  setMessage(text: string) {
    this.message.set(text);
  }

  getMessage(): string {
    return this.message();
  }
}
