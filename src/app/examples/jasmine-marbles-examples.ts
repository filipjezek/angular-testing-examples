import { hot, cold } from 'jasmine-marbles';
import { merge } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import { TestColdObservable, TestHotObservable } from 'jasmine-marbles/src/test-observables';

var e1: TestHotObservable = hot('----a--^--b-------c--|');
var e2: TestHotObservable = hot(  '---d-^--e---------f-----|');
var expected: TestColdObservable =      cold('---(be)----c-f-----|');

expect(merge(e1, e2)).toBeObservable(expected);