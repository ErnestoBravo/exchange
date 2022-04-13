import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@mova/lib-auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = this.auth.gettoken();
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
}
