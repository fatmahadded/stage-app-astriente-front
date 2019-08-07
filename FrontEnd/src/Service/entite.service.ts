import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {Entite} from '../Entity/entite.entity';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class EntiteService {

    private loaderService;

    constructor(private http: HttpClient, loaderService: LoaderService) {
        this.loaderService = loaderService;
    }

    getAllEntites(): Observable<Entite[]> {
        this.showLoader();
        return this.http.get<Entite[]>(API_URL + '/api/entites')
            .pipe(map(data => data['hydra:member']))
            .finally(() => {
                this.onEnd();
            });
    }

    addEntites(json) {
        this.showLoader();
        console.log(json);
        return this.http.post(API_URL + '/api/entites', json)
            .finally(() => {
                this.onEnd();
            });
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        console.log('show loading');
        this.loaderService.show();
    }

    private hideLoader(): void {
        console.log('hide loading');
        this.loaderService.hide();
    }
}
