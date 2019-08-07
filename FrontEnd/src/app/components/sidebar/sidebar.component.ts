import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    {path: '/accueil', title: 'accueil', icon: 'dashboard', class: ''},
    {path: '/historique', title: 'historique', icon: 'content_paste', class: ''},
    {path: '/user-list', title: 'User List', icon: 'person', class: ''},
    {path: '/notifications', title: 'Notifications', icon: 'notifications', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
