import {Routes} from '@angular/router';

import {AccueilComponent} from '../../accueil/accueil.component';
import {HistoriqueComponent} from '../../historique/historique.component';
import {RapportComponent} from '../../rapport/rapport.component';
import {UserListComponent} from '../../user-list/user-list.component';
import {AuthGuard} from '../../../Guard/auth.guard';
import {AdminGuard} from '../../../Guard/admin.guard';

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
    {path: 'rapport/:idAstreinte', component: RapportComponent, canActivate: [AuthGuard]},
    {path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard]},
    {path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard]},
    {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard, AdminGuard]},


];
