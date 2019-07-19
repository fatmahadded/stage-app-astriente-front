import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

  interventions = [];
  i = 0;
  constructor() { }
  ngOnInit() {
  }

  add() {
    this.i++;
    this.interventions.push({value: 'intervention' + this.i});
  }

  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    // alert(`Old Value:${$event.oldValue},
    //   New Value: ${$event.newValue},
    //   Checked Color: ${$event.starRating.checkedcolor},
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }


}
