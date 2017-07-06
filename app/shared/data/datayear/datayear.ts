import { FieldData } from "../../field/field.data";
import { DataMonth } from "../datamonth/datamonth";

export class DataYear {
    year: number;
    fields: FieldData[];
    months: DataMonth[];
    constructor(year: number, fields: FieldData[], months: DataMonth[]) {
        this.year = year;
        this.fields = fields;
        this.months = months;
    }
}