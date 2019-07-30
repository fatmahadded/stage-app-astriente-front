import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

export interface Utilsateur {
    id: Number,
    prenom: string,
    nom: string,
    mail: string,
    password: string,
}

const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    list: Utilsateur[];
    formData: Utilsateur;

    constructor(private http: HttpClient) {
    }

    // addUser(user: Utilsateur): Observable<Utilsateur> {
    //     return this.http.post<Utilsateur>(API_URL + '/api/utilisateurs', httpOptions)
    //        // .pipe(map(data => data['hydra:member']));
    //
    // }
    //
    // createUsere(user: Utilsateur): Observable<Utilsateur> {
    //     return this.http.post<Utilsateur>(this.apiURL + '/employees', JSON.stringify(Utilsateur), this.httpOptions)
    //
    //
    // }
    //
    //
    //
    // posUser(user: Utilsateur) {
    //       return this.http.post(API_URL + '/api/utilisateurs');
    //
    // }

    getUsers(): Observable<Utilsateur[]> {
        return this.http.get<Utilsateur[]>(API_URL + '/api/utilisateurs')
            .pipe(map(data => data['hydra:member']));
    }

    deleteUser(id: number) {
        return this.http.delete(API_URL + '/api/utilisateurs/' + id);
    }

    putUSer(user: Utilsateur) {
        console.log(user);
        const json = {
            'nom': user.nom,
            'prenom': user.prenom,
            'mail': user.mail
        }
        console.log(json);
        return this.http.put(API_URL + '/api/utilisateurs/' + user.id, json);
    }


}
