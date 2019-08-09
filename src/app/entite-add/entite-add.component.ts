import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Entite} from '../../Entity/entite.entity';
import {EntiteService} from '../../Service/entite.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-entite-add',
    templateUrl: './entite-add.component.html',
    styleUrls: ['./entite-add.component.scss']
})
export class EntiteAddComponent implements OnInit {

    entite: Entite;
    entiteForm: FormGroup;


    constructor(public modal: NgbActiveModal, private entiteService: EntiteService, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.entiteForm = this._formBuilder.group({
            label: ['', [Validators.required]],
        })
    }

    entiteAdd() {
        let temp = null;
        this.entiteService.addEntites(this.entiteForm.value)
            .subscribe(data => {
                temp = data;
            })
        this.modal.dismiss('Cross click');

    }
}
