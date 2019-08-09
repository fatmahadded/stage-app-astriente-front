import {Component, OnInit} from '@angular/core';
import {Vivier} from '../../Entity/vivier.entity';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VivierService} from '../../Service/vivier.service';

@Component({
    selector: 'app-vivier-add',
    templateUrl: './vivier-add.component.html',
    styleUrls: ['./vivier-add.component.scss']
})
export class VivierAddComponent implements OnInit {

    vivier: Vivier;
    vivierForm: FormGroup;
    entities: any[] = [];


    constructor(public modal: NgbActiveModal, private vivierService: VivierService, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.vivierService.getAllEntites().subscribe(data => {
            this.entities = data;
            console.log(this.entities)
        });
        this.createForm();
    }

    createForm() {
        this.vivierForm = this._formBuilder.group({
            label: ['', [Validators.required]],
            entite: ['', [Validators.required]],
        })
    }

    vivierAdd() {
        let temp = null;
        this.vivierService.addViviers(this.vivierForm.value)
            .subscribe(data => {
                temp = data;
            })
        this.modal.dismiss('Cross click');

    }


}
