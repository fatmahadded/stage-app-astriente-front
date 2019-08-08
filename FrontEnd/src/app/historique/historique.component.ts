import {Component, OnInit} from '@angular/core';
import {AstreinteService} from '../astreinte.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Astreinte} from '../../Entity/astreinte.entity';

@Component({
    selector: 'app-historique',
    templateUrl: './historique.component.html',
    styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
    public astreintes: any[] = [];
    searchForm: FormGroup;
    reposTotal = 0;
    reliquatTotal = 0;
    salaireTotal = 0;
    nombreDejourTotal = 0;

    constructor(private astreinteService: AstreinteService,
                private _formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.astreinteService.getUserAstreintes()
            .subscribe(data => {
                this.astreintes = data;
                this.caclulReposTotal();
            });
    }

    createForm() {
        this.searchForm = this._formBuilder.group({
            year: ['', [Validators.required]]
        })
    }

    onSearch() {
        this.astreinteService.getUserAstreintes(this.searchForm.value.year)
            .subscribe(data => {
                this.astreintes = data;
                this.reposTotal = 0;
                this.salaireTotal = 0;
                this.nombreDejourTotal = 0;
                this.caclulReposTotal();
            });
    }

    caclulReposTotal() {
        this.astreintes.forEach((astreinte: Astreinte) => {
            if (astreinte.repos) {
                this.reposTotal += astreinte.repos.nombreHeures;
                this.salaireTotal += astreinte.repos.repoSalaire;
            }
        });
        this.reliquatTotal = this.reposTotal % 4;
        this.nombreDejourTotal = (this.reposTotal - this.reliquatTotal) / 8;

    }
}

// export class HistoriqueComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
