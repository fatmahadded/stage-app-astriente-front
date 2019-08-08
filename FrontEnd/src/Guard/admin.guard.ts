import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../Service/auth.service';
import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate() {
        if (jwt_decode(this.authService.getJwtToken()).roles[0] === 'ROLE_USER') {
            // confirm('username ou mot de passe invalide.');
            this.router.navigate(['/accueil']);


        }
        return this.authService.isLoggedIn();
    }
}
