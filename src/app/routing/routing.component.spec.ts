import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RoutingComponent } from './routing.component';
import { RoutingService } from '../routing.service';

describe('RoutingComponent', () => {
  let component: RoutingComponent;
  let fixture: ComponentFixture<RoutingComponent>;
  let elem: HTMLElement;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const routingServiceSpy = jasmine.createSpyObj('RoutingService', ['getHeroes']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useValue: routingServiceSpy },
        { provide: Router,      useValue: routerSpy }
      ],
      declarations: [RoutingComponent]
    });
    fixture = TestBed.createComponent(RoutingComponent);
    component = fixture.componentInstance;
    elem = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should tell ROUTER to navigate when hero clicked', () => {
    routingServiceSpy.getHeroes.and.returnValue([{id: 1, name: "Mario"}, {id: 4, name: "Sonic"}]);
    fixture.detectChanges();

    // trigger the navigation
    elem.querySelector("a").click();
  
    // args passed to router.navigateByUrl() spy
    const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
  
    // expecting to navigate to id of the component's first hero
    const id = component.heroes[0].id;
    expect(navArgs).toBe('/heroes/' + id,
      'should nav to HeroDetail for first hero');
  });
});
