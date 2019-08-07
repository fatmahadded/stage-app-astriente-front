import {Component, OnInit} from '@angular/core';
import {ROLE_USER, USER_ROLES, UserService, UtilisateurForm} from '../../Service/user.service';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {UserAddComponent} from '../user-add/user-add.component';
import {EntiteAddComponent} from '../entite-add/entite-add.component';
import {VivierAddComponent} from '../vivier-add/vivier-add.component';
import {Utilisateur} from '../../Entity/utilisateur.entity';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public users: Utilisateur[] = [];
    selectedRole = ROLE_USER;
    private roles = USER_ROLES;

    constructor(private _userService: UserService,
                private _modalService: NgbModal) {
    }

    ngOnInit() {
        this.fetchUsersByRole();
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

    updateUser(selectedUser: UtilisateurForm, userIndex: number) {
        const modalRef = this._modalService.open(UserEditComponent);
        modalRef.componentInstance.user = selectedUser;
        modalRef.componentInstance.updatedUser.subscribe((updatedUser: Utilisateur) => {
            console.log('updatedUser ', updatedUser);
            // const index = this.users.findIndex((user: Utilisateur) => {
            //     return user.id === updatedUser.id;
            // });
            console.log('index', userIndex);
            this.users[userIndex] = updatedUser;
        })
    }

    addUser() {
        const modalRef = this._modalService.open(UserAddComponent);
    }

    addEntite() {
        const modalRef = this._modalService.open(EntiteAddComponent);
    }

    addVivier() {
        const modalRef = this._modalService.open(VivierAddComponent);
    }

    onUserRoleChange(event: any) {
        this.selectedRole = event.target.value;
        this.fetchUsersByRole();
    }

    private fetchUsersByRole() {
        this._userService.getUsersByRole(this.selectedRole)
            .subscribe((data: Utilisateur[]) => {
                this.users = data;
            })
    }

}
