import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TwainService {

  constructor() { }

  getQuote() {
    return of("quote");
  }

}
