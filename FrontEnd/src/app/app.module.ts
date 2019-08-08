import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JwtModule} from '@auth0/angular-jwt';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
// @ts-ignore
import {RetourService} from './service/Retour.service';
//import {AstreinteService} from './astreinte.service';
import {AgmCoreModule} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {RatingModule} from 'ng-starrating';
import {UserService} from '../Service/user.service';
import {UserEditComponent} from './user-edit/user-edit.component';
import {LoaderComponent} from './loader/loader.component';
import {MaterialModule} from './material.module';


import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
} from '@angular/material';
import {AuthGuard} from '../Guard/auth.guard';
import { EntiteAddComponent } from './entite-add/entite-add.component';
import { VivierAddComponent } from './vivier-add/vivier-add.component';
import {LoaderService} from '../Service/loader.service';

import {UserAddComponent} from './user-add/user-add.component';
import { LoginComponent } from './login/login.component';
import {TokenInterceptor} from './token.interceptor';
import {AuthService} from '../Service/auth.service';
import { AlertComponent } from './alert/alert.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        RatingModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MaterialModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        UserEditComponent,
        LoaderComponent,
        UserAddComponent,
        LoginComponent,
        EntiteAddComponent,
        VivierAddComponent,
        AlertComponent,
        // UserListComponent


    ],
    providers: [RetourService,
        //AstreinteService,
        UserService,
        LoaderService,
        AuthGuard,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }],
    entryComponents: [
        UserEditComponent,
        UserAddComponent,
        EntiteAddComponent,
        VivierAddComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
