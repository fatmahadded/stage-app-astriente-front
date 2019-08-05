import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface Semaine {
    id: Number,
    number: Number,
    dateDeb: Date,
    dateFin: Date,
}

const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class AstreinteService {

    constructor(private _http: HttpClient) {
    }

    getUserAstreintes(year: string = ''): Observable<any[]> {

        // return of([
        //     {
        //         id: 1,
        //         user: {
        //             id: 1,
        //             roles: 'developpeur',
        //             nom: 'Maalej',
        //             mail: 'maalej.ghofran.sofien@gmail.com',
        //             repo: {
        //                 'nombre_heures': '7'
        //             },
        //             prenom: 'Ghofran',
        //             password: '123456789'
        //         },
        //         rapport: {
        //             id: 1
        //         },
        //         semaine: {
        //             id: 7,
        //             num_semaine: 1,
        //             debut_semaine: '2019-01-04T00:00:00+01:00',
        //             fin_semaine: '2019-01-10T00:00:00+01:00'
        //         }
        //     }
        // ]);
        if (year === '') {
            return this._http.get<any[]>(API_URL + '/api/user/1/astreinte');
        } else {
            return this._http.get<any[]>(API_URL + '/api/user/1/astreinte?year=' + year);
        }
    }

    getSemaines(): Observable<Semaine[]> {
        return this._http.get<Semaine[]>(API_URL + '/api/semaines').pipe(map(data => data['hydra:member']));
    }


    getSem() {
        return [
            {

                'id': 1,
                'number': 1,
                'dateDeb': '2019-01-04T00:00:00+00:00',
                'dateFin': '2019-01-10T00:00:00+00:00'
            },
            {

                'id': 2,
                'number': 2,
                'dateDeb': '2019-01-11T00:00:00+00:00',
                'dateFin': '2019-01-17T00:00:00+00:00'
            }
        ]

    }
}
