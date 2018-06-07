import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private router: Router, private routingService: RoutingService) { }

  ngOnInit() {
    this.heroes = this.routingService.getHeroes();
  }

  gotoDetail(hero: Hero) {
    let url = `/heroes/${hero.id}`;
    this.router.navigateByUrl(url);
  }

}

interface Hero {
  id: number,
  name: string
}
