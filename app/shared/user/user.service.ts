import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { User } from "./user";
import { Config } from "../config";

@Injectable()

export class UserService {
    constructor(private http: Http) { }
    //returns an observable response
    signIn(user: User, valid:() => void, invalid?:(error:number) => void) {
        let headers = new Headers;
        headers.append("Content-Type", "application/json");
        this.http.post(
            Config.url + "users/signin",
            JSON.stringify({
                email: user.email,
                password: user.password
            }),
            { headers: headers }
        ).toPromise().then((response:Response) =>{
            Config.token = response.headers.get('auth_token');
            Config.user = user;
            valid();
        }, (response:Response) =>{
            invalid(response.status);
        });
    }
    signUp(user:User, successful:() => void, unsuccesful:(status:number) => void){
        let headers = new Headers;
        headers.append("Content-Type", "application/json");
        this.http.post(
            Config.url + "users/signup",
            JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password
            }),
            {headers : headers}
        ).toPromise().then((response:Response) => {
            //registration was successful
            successful();
        }, (response:Response) => {
            //registration was unsuccesful
            unsuccesful(response.status);
        })
    }
    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}