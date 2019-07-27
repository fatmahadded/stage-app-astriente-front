import {Component, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {StarRatingComponent} from 'ng-starrating';
import {RetourService} from '../service/Retour.service';
import {Retour} from '../models/Retour.model'


@Component({
    selector: 'app-rapport',
    templateUrl: './rapport.component.html',
    styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

    confirmFrom: FormGroup;
    interventions = [];
    i = 0;

// parmoi//
    constructor(private formBuilder: FormBuilder, private  retourService: RetourService) {
    };

    rowData: Retour[];

    ngOnInit() {
        this.initform();
       /* this.retourService.getRetour().subscribe(
            reponse => {
                this.rowData = reponse;
            },
            err => {
                this.rowData = null;
            }
        );*/
    }

    initform() {
        this.confirmFrom = this.formBuilder.group({
            entreeAppreciated: ['', Validators.required],
            entreeToImprove: ['', Validators.required],
            moyensAppreciated: ['', Validators.required],
            moyensToImprove: ['', Validators.required],
            interventionBonnePratique: ['', Validators.required],
            interventionDifficultes: ['', Validators.required],
            interventionCommentaires: ['', Validators.required]
        });
    }

    add() {
        this.i++;
        this.interventions.push({value: 'intervention' + this.i});
    }

    onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
        // alert(`Old Value:${$event.oldValue},
        //   New Value: ${$event.newValue},
        //   Checked Color: ${$event.starRating.checkedcolor},
        //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);

    }

    addRetour() {
        const formData = this.confirmFrom.value;
        console.log(formData);
        return this.retourService.addRetour(formData).subscribe(data => {
            console.log(data);
        });

    }

    addRapport() {
        console.log('addRapport');
    }
}
