import { Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";
import {Color} from "color";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { UserService } from '../../shared/user/user.service';
import { DataService } from '../../shared/data/data.service';
import { DataYear} from '../../shared/data/datayear/datayear';
import { DataMonth } from "../../shared/data/datamonth/datamonth";
import { Field } from "../../shared/field/field";
import { FieldData } from "../../shared/field/field.data";

@Component({
    selector: "dashboard",
    providers: [DataService],
    templateUrl: "pages/dashboard/dashboard.html",
    styleUrls: ["pages/dashboard/dashboard-common.css"]
})

export class DashboardComponent implements OnInit{
    dataYear:DataYear;
    fields: ObservableArray<FieldData>;
    months: ObservableArray<DataMonth>;
    //allows views to access data outside their object
    name_to_fields:Object = new Object();

    constructor(private dataService:DataService, page:Page, private router:Router) {
        page.bindingContext = this.fields;
    }

    ngOnInit(): void {
       this.dataService.load(2017, (dataYear:DataYear) => {
           this.dataYear = dataYear;
           this.dataService.setYearForTransport(dataYear);
           this.fields = new ObservableArray(dataYear.fields);
           this.months = new ObservableArray(dataYear.months);
           this.dataYear.fields.forEach((field:FieldData) => {
               field.total = 0;
               this.name_to_fields[field.name] = field;
           });
           this.months.forEach((month:DataMonth) => {
               month.fields.forEach((field:Field) => {
                   this.name_to_fields[field.name].total =  +this.name_to_fields[field.name].total + +field.value;
               })
           });
       });
    }
    addMonth(){
        this.router.navigate(["/month", this.months.length.toString()]);
    }
}