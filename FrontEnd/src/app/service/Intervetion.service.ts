import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment' ;

@Injectable({
    providedIn: 'root'
})
export class IntervetionService {
    private envUrl: string;

    constructor(private http: HttpClient) {
        this.envUrl = environment.serverUrl;
    }
    addRapport(rapportData: any) {
        return this.http.post<any>(this.envUrl + '/rapport', {rapportData});
    }
}
