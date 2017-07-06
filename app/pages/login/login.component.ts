import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
    selector: "taxly",
    providers: [UserService],
    templateUrl: "pages/login/login.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class LoginComponent implements OnInit {
    user: User;
    isSigningUp = false;
    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User;
        this.user.email = "jamohile@gmail.com";
        this.user.password = "abc";
    }
    submit() {
        if (this.isSigningUp) {
            //handle a new registration
            this.userService.signUp(this.user, () => {
                alert('Your account was succesfully created');
            }, (status:number) => {
                switch(status){
                    case 409:
                        alert('An account with that email already exists.');
                        break;
                    case 500:
                        alert("Sorry, our servers aren't available at the moment.");
                }
            });
        } else {
            //handle a sign in
            this.userService.signIn(this.user, () => {
                this.router.navigate(["/dashboard"]);
            }, (status:number) => {
                switch(status){
                    case 401:
                        alert('Sorry, those credentials are incorrect.');
                        break;
                    case 500:
                        alert("Sorry, our servers aren't available at the moment.");
                        break;
            }
            });
        }
    }
    toggle() {
        this.isSigningUp = !this.isSigningUp;
    }
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.backgroundColor = new Color("white");
    }
}