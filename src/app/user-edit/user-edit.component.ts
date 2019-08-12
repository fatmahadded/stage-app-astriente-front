import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService, UtilisateurForm} from '../../Service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserListComponent} from '../user-list/user-list.component';
import {Utilisateur} from '../../Entity/utilisateur.entity';

@Component({
    providers: [UserListComponent],
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    user: UtilisateurForm;
    userForm: FormGroup;
    updatedUser: EventEmitter<Utilisateur> = new EventEmitter();


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
        this.userservice.putUser(this.userForm.value)
            .subscribe((user: Utilisateur) => {
                this.updatedUser.emit(user);
            });
        this.modal.dismiss('Cross click');

    }
}
