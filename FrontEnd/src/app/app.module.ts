import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {AgmCoreModule} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {RatingModule} from 'ng-starrating';
import {AstreinteService} from './astreinte.service';
import {UserService} from './services/userService';
import {UserEditComponent} from './user-edit/user-edit.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        RatingModule,
        ComponentsModule,
        RouterModule,
        NgbModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        UserEditComponent,
        // UserListComponent


    ],
    providers: [
        AstreinteService,
        UserService,
        LoaderService],
    entryComponents: [
        UserEditComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
