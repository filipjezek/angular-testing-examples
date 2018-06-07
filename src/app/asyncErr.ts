import { defer } from 'rxjs/Observable/defer';

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}