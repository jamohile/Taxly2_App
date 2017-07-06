import { DataMonth } from './../../../platforms/android/build/intermediates/assets/F0F1/debug/app/shared/data/datamonth/datamonth';
import { RouterExtensions } from 'nativescript-angular';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'color';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { TextView } from "tns-core-modules/ui/text-view"
import { GestureEventData } from 'tns-core-modules/ui/gestures';
import { View } from 'tns-core-modules/ui/layouts/layout-base';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { Page } from 'ui/page';

import { DataService } from "../../shared/data/data.service";
import { DataYear } from "../../shared/data/datayear/datayear";
import { FieldData } from './../../shared/field/field.data';
import { Field } from './../../shared/field/field';
@Component({
    selector: "fields",
    providers: [DataService],
    templateUrl: "pages/fields/fields.html",
    styleUrls: ["pages/fields/fields-common.css"]
})

export class FieldComponent implements OnInit {
    //data arrays;
    types:string[] = ['Income', 'Expense'];
    dataYear: DataYear;
    fields: ObservableArray<FieldData> = new ObservableArray<FieldData>();
    //stores current fields of calling month
    target_fields: FieldData[] = new Array<FieldData>();
    target_fields_registry: Object = new Object();
    months_registry: Object = new Object();
    //stores information about each field, such as whether it is unlocked for editing
    //also acts as a buffer, temporarily storing edits
    fields_meta: Object = new Object();
    month:string;
    constructor(private dataService: DataService, private route: ActivatedRoute, private router:RouterExtensions) {
    }
    //handle long click on field, which unlocks for editing
    unlockForEditing(args: GestureEventData) {
        var id: string = args.view.id;
        //set metadata to allow editing
        this.fields_meta[id].editable = !this.fields_meta[id].editable;
    }
    ngOnInit(): void {
        //get fields, and add to the display
        this.dataYear = this.dataService.getYearFromTransport();
        this.route.params.subscribe(params => {
            this.month = params['month'];
            console.dir(this.dataService.getMonth(this.month));
            this.dataService.getBulkObject(this.month, true).forEach((field: FieldData) => {
                this.target_fields_registry[field.name] = field;
            });
            this.dataYear.fields.forEach((fieldData: FieldData) => {
                this.fields.push(fieldData);
                //add to target if applicable
                var selected = this.target_fields_registry[fieldData.name] != undefined;
                if (selected) {
                    this.target_fields.push(fieldData);
                }
                var meta_data: any = {
                    field: FieldData,
                    buffer: FieldData,
                    editable: false,
                    selected: (selected)
                }
                this.fields_meta[fieldData.name] = meta_data;
                this.fields_meta[fieldData.name].field = fieldData;
                this.fields_meta[fieldData.name].buffer = FieldData.clone(fieldData);
            });
        });
    }
    newField() {
        var newField: FieldData = new FieldData();
        var meta_data: Object = {
            field: FieldData,
            buffer: FieldData,
            editable: true,
            selected: false
        }
        newField.name = "New Field";
        this.fields.push(newField);
        newField.type = 0;
        newField.total = 0;
        newField.mandatory = false;
        this.fields_meta[newField.name] = meta_data;
        this.fields_meta[newField.name].field = newField;
        this.fields_meta[newField.name].buffer = FieldData.clone(newField);
        console.dir(this.fields);
        console.dir(this.fields_meta);
    }
    //this function needs to manage name changes for a field
    saveField(args:GestureEventData, oldName:string) {       
        var changedName:string = this.fields_meta[oldName].buffer.name;
        var type = this.fields_meta[oldName].buffer.type == 0 ? 'income' : 'expense';
        this.target_fields_registry[changedName] = this.target_fields_registry[oldName];
        delete this.target_fields_registry[oldName];

        var object:Object = new Object();
        this.dataService.changeFieldName(oldName, changedName);
        Object.assign(object, this.fields_meta[oldName]);
        Object.assign(object["buffer"], object["field"]);
        this.fields_meta[changedName] = object;
        console.dir(this.fields_meta[changedName]);
        console.dir(changedName);
        //this.fields_meta[changedName].buffer = FieldData.clone(this.fields_meta[changedName].field);
        delete this.fields_meta[oldName];
        this.dataService.setBulkObject(this.month, this.target_fields);
        this.router.navigate(['/month', this.month], {clearHistory : true});
}
    toggleField(args: GestureEventData){
        var newValue:boolean = !this.fields_meta[args.view.id].selected;
        this.fields_meta[args.view.id].selected = newValue;
        if(newValue){
            //add to target
            this.target_fields.push(this.fields_meta[args.view.id].field)
        }else{
            this.target_fields.splice(this.target_fields.indexOf(this.fields_meta[args.view.id].field), 1)
        }
    }
    //send data back to calling month
    select(){
        console.dir(this.target_fields);
        this.dataService.getBulkObject(this.month, false)
        this.dataService.setBulkObject(this.month, this.target_fields);
        this.router.navigate(['/month', this.month], {clearHistory: true});
    }
}