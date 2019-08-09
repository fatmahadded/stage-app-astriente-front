import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import * as jwt_decode from 'jwt-decode';


declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export let ROUTES: RouteInfo[] = [
    {path: '/accueil', title: 'accueil', icon: 'dashboard', class: ''},
    {path: '/historique', title: 'historique', icon: 'content_paste', class: ''}];


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    constructor(private authService: AuthService) {
    }


    ngOnInit() {
        console.log('testttttt' + jwt_decode(this.authService.getJwtToken()).roles[0])
        if ((jwt_decode(this.authService.getJwtToken()).roles[0] !== 'ROLE_USER') &&
            ROUTES.length === 2 ) {
            ROUTES.push({path: '/user-list', title: 'User List', icon: 'person', class: ''});

        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);

    }


    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

}
