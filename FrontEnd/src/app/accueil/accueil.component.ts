import {Component, OnInit} from '@angular/core';
import {AccueilService} from '../../Service/accueil.service';
import {NgForm} from '@angular/forms';
import {Astreinte} from '../../Entity/astreinte.entity';
import {XlsFormatEntity} from '../../Entity/xlsFormat.entity'
import {Remplacement} from '../../Entity/remplacement.entity';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

    public semaines: any;
    public astreintes: Astreinte[];
    public idVivier = 1;
    public idSemaine: any ;
    private results: Object;
    private exportJson: any;
    console = console;



    constructor(private accueilService: AccueilService) {
    }

    ngOnInit() {
        this.accueilService.getSemaines()
            .subscribe(data => this.semaines = data);
    }

    refreshTable(form: NgForm) {
        this.idSemaine = form.value.semaineChoisi;
        this.accueilService.getAstreintes(this.idSemaine, this.idVivier)
            .subscribe(data => this.astreintes = data);
    }
    getURL(url) {
        this.accueilService.getURL(url).subscribe(data => this.results = data);
        return this.results;
    }
    saveTable(form: NgForm) {
        for (let i = 0 ; i < 14 ; i++) {
            const r = 'remplacement' + i ;
            if ( form.value[r] === true) {
                console.log('remplacement à faire' + i );
                let seance: string;
                if (i % 2 !== 0 ) { seance = 'Afternoon'} else {  seance = 'Morning'}
                const add = i / 2 ;
                const dateR = new Date();
                const current = new Date(this.astreintes[0].semaine.debutSemaine);
                dateR.setDate(current.getDate() + add);
                console.log(dateR);
                const json = {
                    'user': '/api/utilisateurs/2',
                    'astreinte': 'api/astreintes/' + this.astreintes[0].id,
                    'seance': seance,
                    'date': dateR,
                    'num': i
                };
                console.log(json);
                this.accueilService.addRemplacement(json).subscribe((val) => {
                    console.log('POST call add remplacement success', val);
                    this.accueilService.getAstreintes(this.idSemaine, this.idVivier)
                        .subscribe(data => this.astreintes = data);
                });
            }
        }
        if ( form.value.inscrire === true) {
            const addAstreinte = {'user': '/api/utilisateurs/1',
                    'semaine': '/api/semaines/' + this.idSemaine,
                    'vivier': '/api/viviers/1'};
            this.accueilService.addAstreinte(addAstreinte).subscribe((val) => {
                console.log('POST call successful value returned in body', val);
                this.accueilService.getAstreintes(this.idSemaine, this.idVivier)
                    .subscribe(data => this.astreintes = data);

                this.accueilService.getURL('/accueil/send/confirmation')
                    .subscribe(); });
        }
        if ( form.value.export === true ) {
            const url = '/accueil/astreinteXls/' + this.astreintes[0].semaine.debutSemaine + '/' +
                this.astreintes[0].semaine.finSemaine + '/1';
            this.accueilService.export(url)
                .subscribe( data => {
                    this.exportJson = data;
                    this.formatJsonToXls(this.exportJson)});
        }
    }

    export(form: NgForm) {
        const url = '/accueil/astreinteXls/' + form.value.dateDebut + '/' + form.value.dateFin + '/1';
        this.accueilService.export(url)
            .subscribe( data => {
                this.exportJson = data;
            this.formatJsonToXls(this.exportJson)});

    }
    existRemplacement(r: Remplacement[], i: number) {
        if ((r != null) && (r.length !== 0)) {
            for ( const remp of r ) {
                if (remp.num === i ) { return true; }
            }
        }
        return false;
    }
    getRemplacementUser(r: Remplacement[], i: number) {
        if ((r != null) && (r.length !== 0)) {
            for ( const remp of r ) {
                if (remp.num === i ) {
                    return remp.user['nom'] + ' ' + remp.user['prenom'];
                }
            }
        }
    }
    formatJsonToXls(exportJson) {
    console.log(this.exportJson);
    const astreinteJson: XlsFormatEntity[] = new Array();
    if (this.exportJson && this.exportJson.length > 0) {
    this.exportJson.forEach((astreinte: any) => {
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
    if (astreinte.paye) { a.paye = astreinte.paye.montant; } else { a.paye = '--'}
            a.vivier = astreinte.vivier.label;
            a.semaineDeb =  astreinte.semaine.debutSemaine ;
            a.semaineFin = astreinte.semaine.finSemaine ;
            if (astreinte.rapport) { a.rapport = 'rapport effectué'; } else { a.rapport = 'rapport non effectué'}
            console.log('a======', a);
            astreinteJson.push(a);
            })
            }
    console.log('modified', astreinteJson);
    this.accueilService.exportAsExcelFile(astreinteJson, 'Rapport')
    ;
    console.log('terminéé!!');
            }

}
