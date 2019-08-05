import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {catchError, finalize, mapTo, tap} from 'rxjs/operators';
import {Tokens} from '../Entity/tokens';
import {Utilisateur} from '../Entity/utilisateur.entity';
import {Router} from '@angular/router';
import {LoaderService} from './loader.service';

const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private readonly FULL_NAME_USER = 'FULL_NAME_USER';
    private readonly ID_USER = 'ID_USER';
    private readonly ID_VIVIER = 'ID_VIVIER';
    private mailLoggedUser: string;

    constructor(private http: HttpClient, private router: Router, private loaderService: LoaderService) {
    }

    login(user: { mail: string, password: string }): Observable<boolean> {
        this.showLoader();
        return this.http.post<any>(API_URL + '/login', user)
            .pipe(
                tap(tokens => this.doLoginUser(user.mail, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }),
                finalize(() => {
                    this.onEnd();
                }))
            ;
    }

    tryLogin(user: { mail: string, password: string }): Observable<boolean> {
        return this.http.post<any>(API_URL + '/login', user)
            ;
    }

    logout() {
        this.showLoader();
        console.log('logout service ')
        return this.http.post<any>(API_URL + '/logout', null)
            .finally(() => {
                this.doLogoutUser();
                console.log('redirect login page');
                this.router.navigate(['/login']);
                this.onEnd();
            })
// return this.http.post<any>(API_URL + '/logout', {
//             'refreshToken': this.getRefreshToken()
//         }).pipe(
//             tap(() => this.doLogoutUser()),
//             mapTo(true),
//             catchError(error => {
//                 alert(error.error);
//                 return of(false);
//             }));

    }

    isLoggedIn() {
        return !!this.getJwtToken();

    }

    refreshToken() {
        return this.http.post<any>(API_URL + '/refresh', {
            'refresh_token': this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
            this.storeJwtToken(tokens.token);
        }));
    }

    getVivier() {
        return localStorage.getItem(this.ID_VIVIER)
    }

    getIdUser() {
        return localStorage.getItem(this.ID_USER)
    }

    getFullNameUser() {
        return localStorage.getItem(this.FULL_NAME_USER)
    }

    getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN);
    }

    private doLoginUser(mail: string, tokens: Tokens) {
        this.mailLoggedUser = mail;
        let user;
        this.http.get<Utilisateur>(API_URL + '/user/mail/' + mail)
            .subscribe(data => {
                user = data;
                console.log('I m the connected user :' + user.nom);
                this.storeTokens(tokens, user);
            });
    }

    private doLogoutUser() {
        this.mailLoggedUser = null;
        this.removeTokens();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    private storeTokens(tokens: Tokens, user: Utilisateur) {
        localStorage.setItem(this.JWT_TOKEN, tokens.token);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
        localStorage.setItem(this.FULL_NAME_USER, user.prenom + ' ' + user.nom);
        localStorage.setItem(this.ID_USER, user.id.toString());
        localStorage.setItem(this.ID_VIVIER, user.vivier['id']);
    }

    private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        localStorage.removeItem(this.FULL_NAME_USER);
        localStorage.removeItem(this.ID_USER);
        localStorage.removeItem(this.ID_VIVIER);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        console.log('show loading');
        this.loaderService.show();
    }

    private hideLoader(): void {
        console.log('hide loading');
        this.loaderService.hide();
    }
}
