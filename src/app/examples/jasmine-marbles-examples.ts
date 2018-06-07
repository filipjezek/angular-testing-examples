import { hot, cold } from 'jasmine-marbles';
import { merge } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

var e1: Observable<any> = hot('----a--^--b-------c--|');
var e2 = hot(  '---d-^--e---------f-----|');
var expected: TestColdObservable =      cold('---(be)----c-f-----|');

expect(merge(e1, e2)).toBeObservable(expected);