import { ActivatedRoute } from '@angular/router';
import { DataMonth } from './../../shared/data/datamonth/datamonth';
import { FieldData } from './../../shared/field/field.data';
import { Field } from './../../shared/field/field';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { ListPicker } from 'tns-core-modules/ui/list-picker';
import * as dialogs from 'ui/dialogs';

import { DataService } from './../../shared/data/data.service';
@Component({
    selector: "month",
    providers: [DataService],
    templateUrl: "pages/month/month.html",
    styleUrls: ["pages/month/month-common.css"]
})

export class MonthComponent implements OnInit {
    selectedMonth: number;
    month: String = "January";
    fields: ObservableArray<FieldData> = new ObservableArray<FieldData>();
    //relates field names to values
    field_values: Object = new Object();
    //indexes fields by month
    months: Object = new Object();
    //subscribed route
    private sub: any;
    constructor(private dataService: DataService, private router: RouterExtensions, private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.dataService.getYearFromTransport().months.forEach((month: DataMonth) => {
            this.months[month.month] = month;
        });
        this.sub = this.route.params.subscribe(params => {
            if (this.dataService.hasBulkObject(params['month'])) {
                this.selectedMonth = this.dataService.month_names.indexOf(params['month']);
                this.populateAddedFields(params['month']);
            } else {
                //the param will have length 1 if new month, with number being index
                if ((<string>params['month']).toString().length <= 2) {
                    this.selectedMonth = params['month'];
                    this.populateNewMonth();
                } else {
                    this.populateDataMonth(params['month']);
                }
            }
        });
    }
    populateNewMonth() {
        this.clearCache();
        //creation of a new month
        this.dataService.getYearFromTransport().fields.forEach((field: FieldData) => {
            if (field.mandatory) {
                this.fields.push(field);
                this.field_values[field.name] = new Field(field.name, 0);
            }
        });
    }
    populateDataMonth(month_name: string) {
        this.clearCache();
        //load data for month
        this.selectedMonth = this.dataService.month_names.indexOf(month_name);
        var month: DataMonth = this.months[month_name];
        //load fields from month
        month.fields.forEach((field: Field) => {
            //create a new instance of the field to prevent overwriting
            var new_field: Field = new Field(field.name, field.value);
            this.field_values[field.name] = new_field;
        });
        this.dataService.getYearFromTransport().fields.forEach((field: FieldData) => {
            //this field is contained in the month's data
            if (this.field_values[field.name] != undefined) {
                this.fields.push(field);
            }
        });
    }
    populateAddedFields(month_name: string) {
        this.clearCache();
        var month: DataMonth = this.months[month_name];
        var existingFields: Object = Object();
        month.fields.forEach((field: Field) => {
            //create a new instance of the field to prevent overwriting
            var new_field: Field = new Field(field.name, field.value);
            existingFields[field.name] = new_field;
        });
        var fields: Array<FieldData> = this.dataService.getBulkObject(this.dataService.month_names[this.selectedMonth], true);
        fields.forEach((field: FieldData) => {
            this.fields.push(field);
            if (existingFields[field.name] != undefined) {
                this.field_values[field.name] = new Field(field.name, existingFields[field.name].value);
            } else {
                this.field_values[field.name] = new Field(field.name, 0);
            }

        });
    }
    clearCache() {
        this.fields = new ObservableArray<FieldData>();
        this.field_values = new Object();
    }
    addField() {
        //call field with index of month
        this.dataService.setBulkObject(this.dataService.month_names[this.selectedMonth], this.fields["_array"]);
        this.router.navigate(["/fields", this.dataService.month_names[this.selectedMonth]]);
    }
    save() {
        console.log('starting save');
        //save this new month;
        var month: DataMonth = new DataMonth();
        console.log(this.selectedMonth);
        month.month = this.dataService.month_names[this.selectedMonth];
        //take field values data, and load into an array
        var fields: Field[] = new Array<Field>();
        Object.keys(this.field_values).forEach((key) => {
            fields.push(this.field_values[key]);
        });
        month.fields = fields;
        //add the new month's data to the year;
        this.dataService.addMonth(month);
        console.dir(this.dataService.getYearFromTransport());
        this.dataService.save(() => {
            alert('Your data was succesfully saved');
            this.router.navigate(["/dashboard"], { clearHistory: true })
        })
    }

    selectedMonthChanged(args: SelectedIndexChangedEventData) {
        var newSelectedMonth = args.newIndex;

        if (newSelectedMonth == this.selectedMonth) {
            return;
        }
        if (this.months[this.dataService.month_names[newSelectedMonth]] != undefined) {
            //data exists for the new month
            dialogs.confirm({ title: 'Changing Month', message: 'Are you sure you want to change the month? You will be overwriting existing data, and any changes you just made will be discarded.', okButtonText: 'I Understand', cancelButtonText: 'No' }).then(result => {
                if (result) {
                    this.selectedMonth = newSelectedMonth;
                    this.populateDataMonth(this.dataService.month_names[this.selectedMonth]);
                }
            });
        } else {
            dialogs.confirm({ title: 'Changing Month', message: 'Are you sure you want to change the month? Any changes you just made will be discarded.', okButtonText: 'I Understand', cancelButtonText: 'No' }).then(result => {
                if (result) {
                    this.selectedMonth = newSelectedMonth;
                    this.populateNewMonth();
                }
            });
        }
    }
}