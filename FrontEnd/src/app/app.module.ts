import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {GetService} from './services/get.service';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {AgmCoreModule} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {RatingModule} from 'ng-starrating';
import {UserService} from '../Service/user.service';
import {UserEditComponent} from './user-edit/user-edit.component';
import {LoaderService} from '../Service/loader.service';
import {LoaderComponent} from './loader/loader.component';
import {MaterialModule} from './material.module';


import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import {UserAddComponent} from './user-add/user-add.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from '../Guard/auth.guard';
import {TokenInterceptor} from './token.interceptor';
import {AuthService} from '../Service/auth.service';
import {AstreinteService} from './astreinte.service';
import {TestComponent} from './test/test.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        HttpModule,
        RatingModule,
        ComponentsModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        NgbModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MaterialModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        AppRoutingModule,
    ],
    declarations: [
        TestComponent,
        AppComponent,
        AdminLayoutComponent,
        UserEditComponent,
        LoaderComponent,
        UserAddComponent,
        LoginComponent,
        // UserListComponent
    ],
    providers: [
        AstreinteService,
        GetService,
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
        UserAddComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
