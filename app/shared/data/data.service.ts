import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { User } from "../user/user";
import { Config } from "../config";
import { DataYear } from "../data/datayear/datayear";
import { DataMonth } from "../data/datamonth/datamonth";

@Injectable()

export class DataService {
    //a year can be statically saved, for transfer between pages
    static dataYear: DataYear;
    constructor(private http: Http) { }
    load(year: number, successful: (dataYear: DataYear) => void) {
        let headers = new Headers();
        headers.append('auth_token', Config.token);
        this.http.get(
            Config.url + "data/" + year,
            { headers: headers }
        ).toPromise().then((response: any) => {
            var dataYear: DataYear = new DataYear(response._body.year, response._body.fields, response._body.months);
            successful(dataYear);
        });
    }
    save(successful: () => void) {
        let headers = new Headers();
        headers.append('auth_token', Config.token);
        headers.append('mode', 'update');
        this.http.post(
            Config.url + "data/" + DataService.dataYear.year,
            DataService.dataYear,
            { headers: headers }
        ).toPromise().then((response: Response) => {
            successful();
        });
    }
    addMonth(newDataMonth: DataMonth) {
        this.removeDuplicateMonth(newDataMonth.month);
        DataService.dataYear.months.push(newDataMonth);
    }
    removeDuplicateMonth(month: string) {
        DataService.dataYear.months.forEach((dataMonth: DataMonth) => {
            if (dataMonth.month == month) {
                DataService.dataYear.months.splice(DataService.dataYear.months.indexOf(dataMonth), 1);
                return;
            }
        });
    }
    setYearForTransport(dataYear: DataYear) {
        DataService.dataYear = dataYear;
    }
    getYearFromTransport(): DataYear {
        return DataService.dataYear;
    }
}