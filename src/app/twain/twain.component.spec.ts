import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';
import { TwainComponent } from './twain.component';
import { of } from 'rxjs/observable/of';
import { TwainService } from '../twain.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { last } from 'rxjs/operators';
import { asyncData } from '../asyncData';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let testQuote: string;
  let getQuoteSpy: jasmine.Spy;
  let quoteEl: HTMLElement;

  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');
    return el ? el.textContent : null;
  };

  beforeEach(() => {
    testQuote = 'Test Quote';
  
    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    // Make the spy return a synchronous Observable with the test data
    getQuoteSpy = twainService.getQuote.and.returnValue( of(testQuote) );
  
    TestBed.configureTestingModule({
      declarations: [ TwainComponent ],
      providers:    [
        { provide: TwainService, useValue: twainService }
      ]
    });
  
    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show quote after component initialized', () => {
    fixture.detectChanges(); // onInit()
  
    // sync spy result shows testQuote immediately after init
    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy.calls.any()).toBe(true, 'getQuote called');
  });

  it('should display error when TwainService fails', fakeAsync(() => {
    // tell spy to return an error observable
    getQuoteSpy.and.returnValue(
      new ErrorObservable('TwainService test failure'));
  
    fixture.detectChanges(); // onInit()
    // sync spy errors immediately after init
  
    tick(); // flush the component's setTimeout()
  
    fixture.detectChanges(); // update errorMessage within setTimeout()
  
    expect(errorMessage()).toMatch(/test failure/, 'should display error');
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  }));

  it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
    getQuoteSpy.and.returnValue(asyncData(testQuote));
    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  
    tick(); // flush the observable to get the quote
    fixture.detectChanges(); // update view
  
    expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
    expect(errorMessage()).toBeNull('should not show error');
  }));

  it('should show quote after getQuote (async)', async(() => {
    getQuoteSpy.and.returnValue(asyncData(testQuote));
    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  
    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(quoteEl.textContent).toBe(testQuote);
      expect(errorMessage()).toBeNull('should not show error');
    });
  }));

  it('should show last quote (quote done)', (done: DoneFn) => {
    fixture.detectChanges();
  
    component.quote.pipe( last() ).subscribe(() => {
      fixture.detectChanges(); // update view with quote
      expect(quoteEl.textContent).toBe(testQuote);
      expect(errorMessage()).toBeNull('should not show error');
      done();
    });
  });

  it('should show quote after getQuote (marbles)', () => {
    // observable test quote value and complete(), after delay
    const q$ = cold('---x|', { x: testQuote });
    getQuoteSpy.and.returnValue( q$ );
  
    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  
    getTestScheduler().flush(); // flush the observables
  
    fixture.detectChanges(); // update view
  
    expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
    expect(errorMessage()).toBeNull('should not show error');
  });
});
