import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {Vivier} from '../Entity/vivier.entity';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Entite} from '../Entity/entite.entity';

const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class VivierService {

    private loaderService;

    constructor(private http: HttpClient, loaderService: LoaderService) {
        this.loaderService = loaderService;
    }

    getAllViviers(): Observable<Vivier[]> {
        this.showLoader();
        return this.http.get<Vivier[]>(API_URL + '/api/viviers')
            .pipe(map(data => data['hydra:member']))
            .finally(() => {
                this.onEnd();
            });
    }

    addViviers(json) {
        this.showLoader();
        console.log(json);
        return this.http.post(API_URL + '/api/addVivier', json)
            .finally(() => {
                this.onEnd();
            });
    }
    getAllEntites(): Observable<Entite[]> {
        this.showLoader();
        return this.http.get<Entite[]>(API_URL + '/api/entites.json')
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
