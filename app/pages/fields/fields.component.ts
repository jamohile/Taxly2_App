import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'color';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { GestureEventData } from 'tns-core-modules/ui/gestures';
import { View } from 'tns-core-modules/ui/layouts/layout-base';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { ActivatedRoute } from '@angular/router';
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
    dataYear: DataYear;
    fields: ObservableArray<FieldData> = new ObservableArray<FieldData>();
    //stores current fields of calling month
    target_fields:string[] = new Array<string>();
    //stores information about each field, such as whether it is unlocked for editing
    //also acts as a buffer, temporarily storing edits
    fields_meta: Object = new Object();
    constructor(private dataService: DataService, private route: ActivatedRoute) {
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
            var month: number = params['month'];
            this.dataYear.months[month].fields.forEach((field:Field) => {
                this.target_fields.push(field.name);
            });
            console.log(this.target_fields.indexOf('sdf'));
            this.dataYear.fields.forEach((fieldData: FieldData) => {
                this.fields.push(fieldData);
                var meta_data: Object = {
                    field: FieldData,
                    buffer: FieldData,
                    editable: false,
                    selected: (this)
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
            editable: true
        }
        newField.name = "New Field";
        this.fields.push(newField);
        this.fields_meta[newField.name] = meta_data;
        this.fields_meta[newField.name].field = newField;
        this.fields_meta[newField.name].buffer = FieldData.clone(newField);
    }
    //this function needs to manage name changes for a field
    saveField() {

    }
}