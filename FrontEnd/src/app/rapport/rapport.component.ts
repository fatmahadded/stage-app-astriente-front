import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RapportService} from '../service/Rapport.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-rapport',
    templateUrl: './rapport.component.html',
    styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

    RapportForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private  rapportservice: RapportService,
                private router: Router) {
    };

    ngOnInit() {
        this.rapportform();
    }

    rapportform() {
        this.RapportForm = this.formBuilder.group({
            note: [0, Validators.required],
            Interventions: this.formBuilder.array([]),
            entreeAppreciated: ['', Validators.required],
            entreeToImprove: ['', Validators.required],
            moyensAppreciated: ['', Validators.required],
            moyensToImprove: ['', Validators.required],
            interventionBonnePratique: ['', Validators.required],
            interventionDifficultes: ['', Validators.required],
            interventionCommentaires: ['', Validators.required]
        });
    }
    addRapport() {
        const rapportData = this.RapportForm.value;
        return this.rapportservice.addRapport(rapportData).subscribe(date => {
            console.log(date)
        });
       /*return this.router.navigate(['/historique']); */
    }
    add() {
        const intervention = this.RapportForm.controls.Interventions as FormArray;
        intervention.push(this.formBuilder.group({
            label: ['', Validators.required],
            date: ['', Validators.required],
            heureDebut: ['', Validators.required],
            heureFin: ['', Validators.required],
        }));
    }
}
