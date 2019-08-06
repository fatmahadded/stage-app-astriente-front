import {Component, OnInit} from '@angular/core';
import {Utilisateur} from '../../Entity/utilisateur.entity';
import {UserService, UtilisateurForm} from '../../Service/user.service';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {UserAddComponent} from '../user-add/user-add.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public users: any[] = [];

    constructor(private _userService: UserService,
                private _modalService: NgbModal) {
    }

    ngOnInit() {
        this._userService.getUsers().subscribe(data => {
            this.users = data;
        })
    }

    resetForm(form?: NgForm) {
        if (form != null) {
            form.resetForm();
        }

        this._userService.formData = {
            id: null,
            nom: '',
            prenom: '',
            mail: '',
            password: '',
        }
    }

    onDelete(id: number) {
        if (confirm('Are you sure to delete this user?')) {
            this._userService.deleteUser(id).subscribe(res => {
                // this.users = this.users.filter(user => user.id !== id);
                // console.log(this.users)
                this._userService.getUsers().subscribe(data => {
                    this.users = data;
                })
            });
        }
    }

    updateUser(user: UtilisateurForm) {
        const modalRef = this._modalService.open(UserEditComponent);
        modalRef.componentInstance.user = user;
    }

    addUser() {
        const modalRef = this._modalService.open(UserAddComponent);
    }
}
