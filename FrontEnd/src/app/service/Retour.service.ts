import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class RetourService {

    constructor(private http: HttpClient) {
    }

    getRetour() {
        return this.http.get<any>(environment.serverUrl + '/retour/');
    }

    addRetour(formData: any) {
        return this.http.post<any>(environment.serverUrl + '/retour/', {formData});
    }
}
