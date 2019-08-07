import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment' ;
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class RetourService {
    private envUrl: string;

    constructor(private http: HttpClient ,
                private _router: Router) {
        this.envUrl = environment.serverUrl;
    }

    getRetour() {
        return this.http.get<any>(this.envUrl + '/retour');
    }

    addRetour(formData: any) {
        return this.http.post<any>(this.envUrl + '/retour', {formData});
    }

}
