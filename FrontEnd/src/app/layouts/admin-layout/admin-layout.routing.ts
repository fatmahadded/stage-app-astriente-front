import {Routes} from '@angular/router';

import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {AccueilComponent} from '../../accueil/accueil.component';
import {HistoriqueComponent} from '../../historique/historique.component';
import {RapportComponent} from '../../rapport/rapport.component';
import {UserListComponent} from '../../user-list/user-list.component';
import {LoginComponent} from '../../login/login.component';
import {AuthGuard} from '../../../Guard/auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {path: 'rapport', component: RapportComponent, canActivate: [AuthGuard]},
    {path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard]},
    {path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard]},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
    {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},



];
