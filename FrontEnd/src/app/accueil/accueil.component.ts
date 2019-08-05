import {Component, OnInit} from '@angular/core';
import {AstreinteService} from '../astreinte.service';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

    public semaines: any[] = [];

    constructor(private astreinteService: AstreinteService) {
    }

    ngOnInit() {
        this.astreinteService.getSemaines()
            .subscribe(data => {
                this.semaines = data;
            });
        // this.semaines = this.astreinteService.getSem();
        if (this.semaines && this.semaines.length > 0) {
            this.semaines.forEach((semaine: any) => {
                console.log('testtttt' + semaine.id);
            })
        }
    }

}
