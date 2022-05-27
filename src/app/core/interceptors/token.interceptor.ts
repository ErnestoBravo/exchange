import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = this.gettoken();
      if (authToken !== null) {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
          }
        });
      } else { // without Securization
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
      }
      return next.handle(request);
    }
  gettoken() {
    throw new Error('Method not implemented.');
  }
}
