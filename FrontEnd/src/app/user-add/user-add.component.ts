import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Utilisateur} from '../../Entity/utilisateur.entity';
import {UserService} from '../../Service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

    user: Utilisateur;
    userForm: FormGroup;
    viviers: any[] = [];


    constructor(public modal: NgbActiveModal, private userService: UserService, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.userService.getAllViviers().subscribe(data => {
            this.viviers = data;
            console.log(this.viviers)
        });
        this.createForm();
    }

    createForm() {
        this.userForm = this._formBuilder.group({
            nom: ['', [Validators.required]],
            prenom: ['', [Validators.required]],
            mail: ['', [Validators.required]],
            roles: ['', [Validators.required]],
            vivier: ['', [Validators.required]],
            password: ['', [Validators.required]],
        })
    }

    userAdd() {
        let temp = null;
        this.userService.addUser(this.userForm.value)
            .subscribe(data => {
                temp = data;
            })
        this.modal.dismiss('Cross click');

    }

}
