const enum fieldTypes{
    income,
    expense
}
export class FieldData{
    mandatory: boolean;
    type: number;
    name: string;
    total: number;
    constructor(){}
    static clone(fieldData:FieldData):FieldData{
        var output:FieldData = new FieldData();
        Object.assign(output, fieldData);
        return output;
    }
}
