import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur} from '../../Entity/utilisateur.entity';
import {UserService, UtilisateurForm} from '../../Service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserListComponent} from '../user-list/user-list.component';

@Component({
    providers: [ UserListComponent ],
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    user: UtilisateurForm;
    userForm: FormGroup;

    constructor(public modal: NgbActiveModal,
                private _formBuilder: FormBuilder,
                private userservice: UserService) {
    }

    ngOnInit() {
        console.log(this.user);
        this.createForm();
    }

    createForm() {
        this.userForm = this._formBuilder.group({
            nom: [this.user.nom, [Validators.required]],
            prenom: [this.user.prenom, [Validators.required]],
            mail: [this.user.mail, [Validators.required]],
            id: [this.user.id, [Validators.required]],
        })
    }

    editUser() {
        let temp = null;
        console.log(this.userForm.value);
        this.userservice.putUser(this.userForm.value)
            .subscribe(data => {temp = data; console.log('test' + temp); });
        this.modal.dismiss('Cross click');
    }
}
