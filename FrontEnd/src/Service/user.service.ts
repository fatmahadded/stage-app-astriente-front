import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LoaderService} from './loader.service';
import {Utilisateur} from '../Entity/utilisateur.entity';
import {Vivier} from '../Entity/vivier.entity';

const API_URL = 'http://localhost:8000';

export interface UtilisateurForm {
    id: Number,
    prenom: string,
    nom: string,
    mail: string,
    password: string,
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    list: UtilisateurForm[];
    formData: UtilisateurForm;
    private loaderService;

    constructor(private http: HttpClient, loaderService: LoaderService) {
        this.loaderService = loaderService;
    }

    addUser(json) {
        this.showLoader();
        return this.http.post(API_URL + '/api/addUser', json)
            .finally(() => {
                this.onEnd();
            });
    }

    getAllViviers(): Observable<Vivier[]> {
        this.showLoader();
        return this.http.get<Vivier[]>(API_URL + '/api/viviers.json')
            .finally(() => {
                this.onEnd();
            });
    }

    getAllUsers() {
        this.showLoader();
        return this.http.get<Utilisateur[]>(API_URL + '/api/utilisateurs.json')
            .finally(() => {
                this.onEnd();
            })
    }

    getUsersByViviers(idVivier) {
        this.showLoader();
        return this.http.get<Utilisateur[]>(API_URL + '/api/user/vivier/' + idVivier)
            .finally(() => {
                this.onEnd();
            })
    }

    getUsers(): Observable<Utilisateur[]> {
        this.showLoader();
        return this.http.get<Utilisateur[]>(API_URL + '/api/utilisateurs')
            .pipe(map(data => data['hydra:member']))
            .finally(() => {
                this.onEnd();
            });
    }

    getUsersByRole(role: string): Observable<Utilisateur[]> {
        this.showLoader();
        return this.http.get<Utilisateur[]>(API_URL + `/api/role/${role}`)
            .pipe(map(data => data))
            .finally(() => {
                this.onEnd();
            });
    }

    deleteUser(id: number) {
        this.showLoader();
        return this.http.delete(API_URL + '/api/utilisateurs/' + id)
            .finally(() => {
                this.onEnd();
            });
    }

    putUser(user: UtilisateurForm) {
        console.log(user);
        const json = {
            'nom': user.nom,
            'prenom': user.prenom,
            'mail': user.mail
        };
        console.log(json);
        return this.http.put(API_URL + '/api/utilisateurs/' + user.id, json);
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

export const ROLE_USER = 'ROLE_USER';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_ADMIN_NAT = 'ROLE_ADMIN_NAT';


export const USER_ROLES: { value: string, title: string }[] = [
    {value: ROLE_USER, title: 'Simple Utilisaeur'},
    {value: ROLE_ADMIN, title: 'Admin Local'},
    {value: ROLE_ADMIN_NAT, title: 'Admin National '}
];

