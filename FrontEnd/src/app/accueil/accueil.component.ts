import {Component, OnInit} from '@angular/core';
import {AccueilService} from '../../Service/accueil.service';
import {NgForm} from '@angular/forms';
import {Astreinte} from '../../Entity/astreinte.entity';
import {XlsFormatEntity} from '../../Entity/xlsFormat.entity'
import {Remplacement} from '../../Entity/remplacement.entity';
import * as jwt_decode from 'jwt-decode';
import {AuthService} from '../../Service/auth.service';
import {UserService} from '../../Service/user.service';


@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

    public semaines: any;
    public astreintes: Astreinte[];

    public idSemaine: any;
    console = console;
    private results: Object;
    private exportJson: any;
    private role;
    private usersByVivier;
    private allUsers;
    private viviers;


    constructor(private accueilService: AccueilService, private authService: AuthService, private userService: UserService) {
    }

    ngOnInit() {
        console.log(jwt_decode(this.authService.getJwtToken()).roles[0]);
        this.role = jwt_decode(this.authService.getJwtToken()).roles[0];
        this.accueilService.getSemaines()
            .subscribe(data => this.semaines = data);
        if (this.role === 'ROLE_ADMIN') {
            this.getUsersByVivier();
        }
        if (this.role === 'ROLE_ADMIN_NAT') {
            this.getAllUsers();
            this.accueilService.getURL('/api/viviers.json')
                .subscribe(data => this.viviers = data);
        }
    }

    getUsersByVivier() {
        this.userService.getUsersByViviers(this.authService.getVivier())
            .subscribe(data => this.usersByVivier = data)
    }

    getUsersBy(vivier) {
        const users = [];
        if (this.allUsers != null) {
            for (const user of this.allUsers) {
                if (user.vivier.id === vivier) {
                    users.push(user);
                }
            }
        }
        console.log(users);
        return users;
    }

    getAllUsers() {
        this.userService.getAllUsers()
            .subscribe(data => {
                    this.allUsers = data;

                }
            )
    }

    refreshTable(form: NgForm) {
        this.idSemaine = form.value.semaineChoisi;
        this.getAstreintes();
    }

    getAstreintes() {
        if (this.role === 'ROLE_ADMIN_NAT') {
            this.accueilService.getAllAstreintes(this.idSemaine).subscribe(data => {
                this.astreintes = data;
                for (const vivier of this.viviers) {
                    let exist = false;
                    for (const astreinte of data) {
                        if (vivier.id === astreinte.vivier['id']) {
                            exist = true;
                        }
                    }
                    if (exist === false) {
                        const new_astreinte: Astreinte = {
                            'vivier': vivier, 'id': 0,
                            'user': null,
                            'paye': '',
                            'rapport': null,
                            'repos': null,
                            'semaine': null,
                            remplacements: null
                        };

                        this.astreintes.push(new_astreinte)
                    }
                }
                console.log('###############new astreintes');
                console.log(this.astreintes);


            })


        } else {
            this.accueilService.getAstreintes(this.idSemaine, this.authService.getVivier())
                .subscribe(data => this.astreintes = data);
        }
    }


    getURL(url) {
        this.accueilService.getURL(url).subscribe(data => this.results = data);
        return this.results;
    }

    saveTable(form: NgForm) {
        for (let i = 0; i < 14; i++) {
            const r = 'remplacement' + i;
            if (form.value[r] === true) {
                console.log('remplacement à faire' + i);
                let seance: string;
                if (i % 2 !== 0) {
                    seance = 'Afternoon'
                } else {
                    seance = 'Morning'
                }
                const add = i / 2;
                const dateR = new Date();
                const current = new Date(this.astreintes[0].semaine.debutSemaine);
                dateR.setDate(current.getDate() + add);
                console.log(dateR);
                const json = {
                    'user': '/api/utilisateurs/' + this.authService.getIdUser(),
                    'astreinte': 'api/astreintes/' + this.astreintes[0].id,
                    'seance': seance,
                    'date': dateR,
                    'num': i
                };
                console.log(json);
                this.accueilService.addRemplacement(json).subscribe((val) => {
                    console.log('POST call add remplacement success', val);
                    this.accueilService.getAstreintes(this.idSemaine, this.authService.getVivier())
                        .subscribe(data => this.astreintes = data);
                });
            }
        }
        if (form.value.inscrire === true) {
            const addAstreinte = {
                'user': '/api/utilisateurs/' + this.authService.getIdUser(),
                'semaine': '/api/semaines/' + this.idSemaine,
                'vivier': '/api/viviers/' + this.authService.getVivier()
            };
            this.accueilService.addAstreinte(addAstreinte).subscribe((val) => {
                console.log('POST call successful value returned in body', val);
                this.accueilService.getAstreintes(this.idSemaine, this.authService.getVivier())
                    .subscribe(data => this.astreintes = data);

                this.accueilService.getURL('/accueil/send/confirmation')
                    .subscribe();
            });
        }
        if (form.value.export === true) {
            const url = '/accueil/astreinteXls/' + this.astreintes[0].semaine.debutSemaine + '/' +
                this.astreintes[0].semaine.finSemaine + '/' + this.authService.getVivier();
            this.accueilService.export(url)
                .subscribe(data => {
                    this.exportJson = data;
                    this.formatJsonToXls(this.exportJson)
                });
        }
    }

    saveTableAdmin(form: NgForm) {
        if (form.value.userInscrit !== null) {
            const addAstreinte = {
                'user': '/api/utilisateurs/' + form.value.userInscrit,
                'semaine': '/api/semaines/' + this.idSemaine,
                'vivier': '/api/viviers/' + this.authService.getVivier()
            };
            //  if exist delete astreinte  this.accueilService.deleteAstreinte()
            if ((this.astreintes !== null) && (this.astreintes.length === 1)) {
                this.accueilService.updateAstreinte(form.value.userInscrit, this.astreintes[0].id)
                    .subscribe(() => {
                            this.accueilService.getAstreintes(this.idSemaine, this.authService.getVivier())
                                .subscribe(data => this.astreintes = data);

                            this.accueilService.getURL('/accueil/send/confirmation')
                                .subscribe();
                        }
                    )
                ;
            } else {
                this.accueilService.addAstreinte(addAstreinte).subscribe((val) => {
                    console.log('POST call successful value returned in body', val);
                    this.getAstreintes();

                    this.accueilService.getURL('/accueil/send/confirmation')
                        .subscribe();
                });
            }
        }
        if (form.value.export === true) {
            const url = '/accueil/astreinteXls/' + this.astreintes[0].semaine.debutSemaine + '/' +
                this.astreintes[0].semaine.finSemaine + '/' + this.authService.getVivier();
            this.accueilService.export(url)
                .subscribe(data => {
                    this.exportJson = data;
                    this.formatJsonToXls(this.exportJson)
                });
        }
    }

    saveTableAdminNatXLS(form: NgForm) {
        if (form.value.export === true) {
            this.exportJson = this.astreintes;
            this.formatJsonToXls(this.astreintes);
        }
    }

    saveTableAdminNat(form: NgForm, vivier, exist) {

        const addAstreinte = {
            'user': '/api/utilisateurs/' + form.value.userInscrit,
            'semaine': '/api/semaines/' + this.idSemaine,
            'vivier': '/api/viviers/' + vivier
        };
        console.log(addAstreinte);
        console.log('++++++++++++++++++++++++++++++', exist);
        if (exist === 0) {
            console.log('#######################################################');
            this.accueilService.addAstreinte(addAstreinte).subscribe((val) => {
                console.log('POST call successful value returned in body', val);
                this.getAstreintes();
                this.accueilService.getURL('/accueil/send/confirmation')
                    .subscribe();
            });
        }
        this.accueilService.updateAstreinte(form.value.userInscrit, this.astreintes[0].id)
            .subscribe(() => {
                    this.getAstreintes();

                    this.accueilService.getURL('/accueil/send/confirmation')
                        .subscribe();
                }
            )
        ;
    }


    export(form: NgForm) {
        const url = '/accueil/astreinteXls/' + form.value.dateDebut + '/' + form.value.dateFin + '/' + this.authService.getVivier();
        this.accueilService.export(url)
            .subscribe(data => {
                this.exportJson = data;
                this.formatJsonToXls(this.exportJson)
            });

    }

    existRemplacement(r: Remplacement[], i: number) {
        if ((r != null) && (r.length !== 0)) {
            for (const remp of r) {
                if (remp.num === i) {
                    return true;
                }
            }
        }
        return false;
    }

    getRemplacementUser(r: Remplacement[], i: number) {
        if ((r != null) && (r.length !== 0)) {
            for (const remp of r) {
                if (remp.num === i) {
                    return remp.user['nom'] + ' ' + remp.user['prenom'];
                }
            }
        }
    }

    formatJsonToXls(exportJson) {
        console.log(this.exportJson);
        const astreinteJson: XlsFormatEntity[] = [];
        if (this.exportJson && this.exportJson.length > 0) {
            this.exportJson.forEach((astreinte: any) => {
                if (astreinte.id !== 0) {
                    const a: XlsFormatEntity = {
                        id: 0,
                        user: '',
                        paye: '',
                        rapport: '',
                        semaineDeb: '',
                        semaineFin: '',
                        vivier: '',
                    };
                    a.id = astreinte.id;
                    a.user = astreinte.user.nom + ' ' + astreinte.user.prenom;
                    if (astreinte.paye) {
                        a.paye = astreinte.paye.montant;
                    } else {
                        a.paye = '--'
                    }
                    a.vivier = astreinte.vivier.label;
                    a.semaineDeb = astreinte.semaine.debutSemaine;
                    a.semaineFin = astreinte.semaine.finSemaine;
                    if (astreinte.rapport) {
                        a.rapport = 'rapport effectué';
                    } else {
                        a.rapport = 'rapport non effectué'
                    }
                    console.log('a======', a);
                    astreinteJson.push(a);
                }
            })
        }
        console.log('modified', astreinteJson);
        this.accueilService.exportAsExcelFile(astreinteJson, 'Rapport')
        ;
        console.log('terminéé!!');
    }

}
