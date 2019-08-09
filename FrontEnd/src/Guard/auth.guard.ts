import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../Service/auth.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate() {
        if (!this.authService.isLoggedIn()) {
            // confirm('username ou mot de passe invalide.');
            this.router.navigate(['/login']);


        }
        return this.authService.isLoggedIn();
    }
}
