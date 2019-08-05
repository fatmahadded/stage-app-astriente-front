import {Component, OnInit} from '@angular/core';
import {AstreinteService} from '../astreinte.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-historique',
    templateUrl: './historique.component.html',
    styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
    public astreintes: any[] = [];
    searchForm: FormGroup;

    constructor(private astreinteService: AstreinteService,
                private _formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.astreinteService.getUserAstreintes()
            .subscribe(data => {
                this.astreintes = data;
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
            });
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
