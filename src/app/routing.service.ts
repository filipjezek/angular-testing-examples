import { Injectable } from '@angular/core';

@Injectable()
export class RoutingService {

  constructor() { }

  getHeroes() {
    return [{id: 1, name: "Mario"}, {id: 4, name: "Sonic"}];
  }

}
