import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
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

  constructor(private http: HttpClient) { }

  getSemaines(): Observable<Semaine[]> {
    return this.http.get<Semaine[]>(API_URL + '/api/semaines')
        .pipe(map(data => data['hydra:member'])) ;
}
getSem() {
    return[
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
