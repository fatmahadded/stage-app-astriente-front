import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../Service/auth.service';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {catchError, filter, take, switchMap} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService) {
    }

   /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.authService.getJwtToken();
        const bearer = 'Bearer ' + jwt;
        if (!!jwt) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + jwt
                }
            });


        }
        return next.handle(req);
    }
*/
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private addToken(req: HttpRequest<any>, jwt: string) {
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + jwt
            }
        });
        return req;
        /*console.log('----request----');

        console.log(request.clone({
            setHeaders: {
                Authorization: `Bearer ` + this.authService.getJwtToken()
            }
        }));

        console.log('--- end of request---');
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ` + this.authService.getJwtToken()
            }
        });*/
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt);
                    return next.handle(this.addToken(request, token.jwt));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }
}
