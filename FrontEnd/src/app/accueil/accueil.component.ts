import {Component, OnInit} from '@angular/core';
import {AccueilService} from '../../Service/accueil.service';
import {NgForm} from '@angular/forms';
import {Astreinte} from '../../Entity/astreinte.entity';
import {XlsFormatEntity} from '../../Entity/xlsFormat.entity'

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
        if ( form.value.inscrire === true) {
            const addAstreinte = {'user': '/api/utilisateurs/1',
                    'semaine': '/api/semaines/' + this.idSemaine,
                    'vivier': '/api/viviers/1'};
            this.accueilService.addAstreinte(addAstreinte).subscribe((val) => {
                console.log('POST call successful value returned in body',
                    val)});
            this.accueilService.getAstreintes(this.idSemaine, this.idVivier)
                .subscribe(data => this.astreintes = data);

            this.accueilService.getURL('/accueil/send/confirmation')
                .subscribe();
        }
    }

    export(form: NgForm) {
        const url = '/accueil/astreinteXls/' + form.value.dateDebut + '/' + form.value.dateFin + '/1';
        this.accueilService.export(url)
            .subscribe( data => {
                this.exportJson = data;
            this.formatJsonToXls(this.exportJson)});

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
