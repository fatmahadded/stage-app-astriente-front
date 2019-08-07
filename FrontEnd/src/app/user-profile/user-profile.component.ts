import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../Service/user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.resetForm();
    }

    resetForm(form?: NgForm) {
        if (form != null) {
            form.resetForm();
        }
        this.userService.formData = {
            id: null,
            nom: '',
            prenom: '',
            mail: '',
            password: '',
        }
    }

    updateUser(form: NgForm) {
        this.userService.putUser(form.value).subscribe(res => {
            this.resetForm(form);
            this.userService.getUsers();
        });
    }
}
