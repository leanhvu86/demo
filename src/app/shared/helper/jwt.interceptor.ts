import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import { LoginFormComponent } from 'src/app/pages/auth/components/login-form/login-form.component';

/*
The JWT interceptor intercepts the incoming requests from the application/user and adds JWT token to the request's
Authorization header, only if the user is logged in.
This JWT token in the request header is required to access the SECURE END API POINTS on the server
*/

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = 'token';
        if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        // }

        request = request.clone({headers: request.headers.set('Accept', 'application/json')});
        request = request.clone({headers: request.headers.set('Access-Control-Allow-Origin', '*')});
        return next.handle(request).pipe(catchError((error, caught) => {
            // intercept the respons error and displace it to the console
            console.log(error);
            this.handleAuthError(error);
            return of(error);
        }) as any);

    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        console.log(err.status)
        if (err.status === 401) {
            // navigate /delete cookies or whatever
            console.log('handled error ' + err.status);
            // this.loginService.logoutUser();
            // window.location.reload();
            // tslint:disable-next-line:max-line-length
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message);
        }
        throw err;
    }
}
