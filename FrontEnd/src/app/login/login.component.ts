import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../Service/auth.service';
import {AlertService} from '../../Service/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private alertService: AlertService) {
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });
    }

    login() {
        this.authService.login(
            {
                mail: this.f.username.value,
                password: this.f.password.value
            }
        )
            .subscribe(data => {

                    this.router.navigate(['/accueil'])

                })

    }


}
