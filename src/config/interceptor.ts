
import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AuthLocalStorage} from "../services/auth-local-storage.service";

//https://angular.io/guide/http#intercepting-all-requests-or-responses
@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      /*.map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        } else console.info('event =', event, ';');
        return event;
      })*/
      .catch((err: HttpErrorResponse, caught:Observable<any>) => {
        if (err.status === 401 || err.status === 0) {
          console.log('********',err);
          this.injector.get(AuthLocalStorage).logout('Необходимо авторизоваться', 10e3)
        }
        return Observable.throw(err);
      });
  }
}