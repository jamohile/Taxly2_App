import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { User } from "../user/user";
import { Config } from "../config";
import { DataYear } from "../data/datayear/datayear";
import { DataMonth } from "../data/datamonth/datamonth";
import { Field } from "../field/field";
import { FieldData } from "../field/field.data";

@Injectable()

export class DataService {
    //a year can be statically saved, for transfer between pages
    month_names: string[] = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    static dataYear: DataYear;
    //used to transfer open-ended data between pages
    static bulk: Object = new Object();
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
    getMonth(month_name: string): DataMonth {
        for (var x = 0; x < DataService.dataYear.months.length; x++) {
            var month: DataMonth = DataService.dataYear.months[x];
            if (month.month == month_name) {
                return month;
            }
        }
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
    setBulkObject(name: string, object: FieldData[]) {
        DataService.bulk[name] = object;
    }
    getBulkObject(name: string, remove: boolean): FieldData[] {
        console.log(name);
        console.dir(DataService.bulk[name]);
        var object = DataService.bulk[name];
        if (remove) {
            delete DataService.bulk[name];
        }
        return object;
    }
    hasBulkObject(name: string): boolean {
        return DataService.bulk[name] != undefined;
    }
    changeFieldName(old: string, changed: string) {
        DataService.dataYear.fields.forEach((field: FieldData) => {
            if (field.name == old) {
                field.name = changed;
            }
        });
        DataService.dataYear.months.forEach((month: DataMonth) => {
            month.fields.forEach((field: Field) => {
                if (field.name == old) {
                    field.name = changed;
                }
            })
        });
    }
}