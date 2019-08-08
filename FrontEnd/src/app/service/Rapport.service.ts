import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment' ;
import {LoaderService} from '../../Service/loader.service';

@Injectable({
    providedIn: 'root'
})

export class RapportService {
    private envUrl: string;

    constructor(private http: HttpClient, private loaderService: LoaderService) {
        this.envUrl = environment.serverUrl;
    }
    addRapport(rapportData: any) {
        this.showLoader();
        return this.http.post<any>(this.envUrl + '/rapport', {rapportData})
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

