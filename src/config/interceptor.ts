
import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {AuthLocalStorage} from "../services/auth-local-storage.service";

//https://angular.io/guide/http#intercepting-all-requests-or-responses
@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('--------intercept------start',req);
    return next.handle(req)
      /*.map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        } else console.info('event =', event, ';');
        return event;
      })*/
      .catch((err: HttpErrorResponse, caught:Observable<any>) => {
        console.log('--------intercept------catch',err);
        if (err.status === 401 || err.status === 0) {
          console.log('401 или 0 статус',err);
          if(this.injector.get(AuthLocalStorage).isBrowser) {
            this.injector.get(AuthLocalStorage).logout('Необходимо авторизоваться', 10e3)
          }

        }
        return Observable.throw(err);
      });
  }
}