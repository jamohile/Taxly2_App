"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_angular_1 = require("nativescript-angular");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var data_service_1 = require("../../shared/data/data.service");
var field_data_1 = require("./../../shared/field/field.data");
var FieldComponent = (function () {
    function FieldComponent(dataService, route, router) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        //data arrays;
        this.types = ['Income', 'Expense'];
        this.fields = new observable_array_1.ObservableArray();
        //stores current fields of calling month
        this.target_fields = new Array();
        this.target_fields_registry = new Object();
        this.months_registry = new Object();
        //stores information about each field, such as whether it is unlocked for editing
        //also acts as a buffer, temporarily storing edits
        this.fields_meta = new Object();
    }
    //handle long click on field, which unlocks for editing
    FieldComponent.prototype.unlockForEditing = function (args) {
        var id = args.view.id;
        //set metadata to allow editing
        this.fields_meta[id].editable = !this.fields_meta[id].editable;
    };
    FieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get fields, and add to the display
        this.dataYear = this.dataService.getYearFromTransport();
        this.route.params.subscribe(function (params) {
            _this.month = params['month'];
            console.dir(_this.dataService.getMonth(_this.month));
            _this.dataService.getBulkObject(_this.month, true).forEach(function (field) {
                _this.target_fields_registry[field.name] = field;
            });
            _this.dataYear.fields.forEach(function (fieldData) {
                _this.fields.push(fieldData);
                //add to target if applicable
                var selected = _this.target_fields_registry[fieldData.name] != undefined;
                if (selected) {
                    _this.target_fields.push(fieldData);
                }
                var meta_data = {
                    field: field_data_1.FieldData,
                    buffer: field_data_1.FieldData,
                    editable: false,
                    selected: (selected)
                };
                _this.fields_meta[fieldData.name] = meta_data;
                _this.fields_meta[fieldData.name].field = fieldData;
                _this.fields_meta[fieldData.name].buffer = field_data_1.FieldData.clone(fieldData);
            });
        });
    };
    FieldComponent.prototype.newField = function () {
        var newField = new field_data_1.FieldData();
        var meta_data = {
            field: field_data_1.FieldData,
            buffer: field_data_1.FieldData,
            editable: true,
            selected: false
        };
        newField.name = "New Field";
        this.fields.push(newField);
        newField.type = 0;
        newField.total = 0;
        newField.mandatory = false;
        this.fields_meta[newField.name] = meta_data;
        this.fields_meta[newField.name].field = newField;
        this.fields_meta[newField.name].buffer = field_data_1.FieldData.clone(newField);
        console.dir(this.fields);
        console.dir(this.fields_meta);
    };
    //this function needs to manage name changes for a field
    FieldComponent.prototype.saveField = function (args, oldName) {
        var changedName = this.fields_meta[oldName].buffer.name;
        var type = this.fields_meta[oldName].buffer.type == 0 ? 'income' : 'expense';
        this.target_fields_registry[changedName] = this.target_fields_registry[oldName];
        delete this.target_fields_registry[oldName];
        var object = new Object();
        this.dataService.changeFieldName(oldName, changedName);
        Object.assign(object, this.fields_meta[oldName]);
        Object.assign(object["buffer"], object["field"]);
        this.fields_meta[changedName] = object;
        console.dir(this.fields_meta[changedName]);
        console.dir(changedName);
        //this.fields_meta[changedName].buffer = FieldData.clone(this.fields_meta[changedName].field);
        delete this.fields_meta[oldName];
        this.dataService.setBulkObject(this.month, this.target_fields);
        this.router.navigate(['/month', this.month], { clearHistory: true });
    };
    FieldComponent.prototype.toggleField = function (args) {
        var newValue = !this.fields_meta[args.view.id].selected;
        this.fields_meta[args.view.id].selected = newValue;
        if (newValue) {
            //add to target
            this.target_fields.push(this.fields_meta[args.view.id].field);
        }
        else {
            this.target_fields.splice(this.target_fields.indexOf(this.fields_meta[args.view.id].field), 1);
        }
    };
    //send data back to calling month
    FieldComponent.prototype.select = function () {
        console.dir(this.target_fields);
        this.dataService.getBulkObject(this.month, false);
        this.dataService.setBulkObject(this.month, this.target_fields);
        this.router.navigate(['/month', this.month], { clearHistory: true });
    };
    return FieldComponent;
}());
FieldComponent = __decorate([
    core_1.Component({
        selector: "fields",
        providers: [data_service_1.DataService],
        templateUrl: "pages/fields/fields.html",
        styleUrls: ["pages/fields/fields-common.css"]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, nativescript_angular_1.RouterExtensions])
], FieldComponent);
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpZWxkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2REFBd0Q7QUFDeEQsc0NBQXVHO0FBRXZHLDBDQUFpRDtBQUVqRCwyRUFBeUU7QUFPekUsK0RBQTZEO0FBRTdELDhEQUE0RDtBQVM1RCxJQUFhLGNBQWM7SUFhdkIsd0JBQW9CLFdBQXdCLEVBQVUsS0FBcUIsRUFBVSxNQUF1QjtRQUF4RixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFaNUcsY0FBYztRQUNkLFVBQUssR0FBWSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV2QyxXQUFNLEdBQStCLElBQUksa0NBQWUsRUFBYSxDQUFDO1FBQ3RFLHdDQUF3QztRQUN4QyxrQkFBYSxHQUFnQixJQUFJLEtBQUssRUFBYSxDQUFDO1FBQ3BELDJCQUFzQixHQUFXLElBQUksTUFBTSxFQUFFLENBQUM7UUFDOUMsb0JBQWUsR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3ZDLGlGQUFpRjtRQUNqRixrREFBa0Q7UUFDbEQsZ0JBQVcsR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBR25DLENBQUM7SUFDRCx1REFBdUQ7SUFDdkQseUNBQWdCLEdBQWhCLFVBQWlCLElBQXNCO1FBQ25DLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzlCLCtCQUErQjtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ25FLENBQUM7SUFDRCxpQ0FBUSxHQUFSO1FBQUEsaUJBMkJDO1FBMUJHLG9DQUFvQztRQUNwQyxJQUFJLENBQUMs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QUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBeEdELElBd0dDO0FBeEdZLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDeEIsV0FBVyxFQUFFLDBCQUEwQjtRQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztLQUNoRCxDQUFDO3FDQWVtQywwQkFBVyxFQUFpQix1QkFBYyxFQUFpQix1Q0FBZ0I7R0FibkcsY0FBYyxDQXdHMUI7QUF4R1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhTW9udGggfSBmcm9tICcuLy4uLy4uLy4uL3BsYXRmb3Jtcy9hbmRyb2lkL2J1aWxkL2ludGVybWVkaWF0ZXMvYXNzZXRzL0YwRjEvZGVidWcvYXBwL3NoYXJlZC9kYXRhL2RhdGFtb250aC9kYXRhbW9udGgnO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xyXG5pbXBvcnQgeyBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5JztcclxuaW1wb3J0IHsgVGV4dFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIlxyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlcyc7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvbGF5b3V0LWJhc2UnO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVllYXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2RhdGEvZGF0YXllYXIvZGF0YXllYXJcIjtcclxuaW1wb3J0IHsgRmllbGREYXRhIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQvZmllbGQvZmllbGQuZGF0YSc7XHJcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQvZmllbGQvZmllbGQnO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImZpZWxkc1wiLFxyXG4gICAgcHJvdmlkZXJzOiBbRGF0YVNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvZmllbGRzL2ZpZWxkcy5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL2ZpZWxkcy9maWVsZHMtY29tbW9uLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8vZGF0YSBhcnJheXM7XHJcbiAgICB0eXBlczpzdHJpbmdbXSA9IFsnSW5jb21lJywgJ0V4cGVuc2UnXTtcclxuICAgIGRhdGFZZWFyOiBEYXRhWWVhcjtcclxuICAgIGZpZWxkczogT2JzZXJ2YWJsZUFycmF5PEZpZWxkRGF0YT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZpZWxkRGF0YT4oKTtcclxuICAgIC8vc3RvcmVzIGN1cnJlbnQgZmllbGRzIG9mIGNhbGxpbmcgbW9udGhcclxuICAgIHRhcmdldF9maWVsZHM6IEZpZWxkRGF0YVtdID0gbmV3IEFycmF5PEZpZWxkRGF0YT4oKTtcclxuICAgIHRhcmdldF9maWVsZHNfcmVnaXN0cnk6IE9iamVjdCA9IG5ldyBPYmplY3QoKTtcclxuICAgIG1vbnRoc19yZWdpc3RyeTogT2JqZWN0ID0gbmV3IE9iamVjdCgpO1xyXG4gICAgLy9zdG9yZXMgaW5mb3JtYXRpb24gYWJvdXQgZWFjaCBmaWVsZCwgc3VjaCBhcyB3aGV0aGVyIGl0IGlzIHVubG9ja2VkIGZvciBlZGl0aW5nXHJcbiAgICAvL2Fsc28gYWN0cyBhcyBhIGJ1ZmZlciwgdGVtcG9yYXJpbHkgc3RvcmluZyBlZGl0c1xyXG4gICAgZmllbGRzX21ldGE6IE9iamVjdCA9IG5ldyBPYmplY3QoKTtcclxuICAgIG1vbnRoOnN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6Um91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgfVxyXG4gICAgLy9oYW5kbGUgbG9uZyBjbGljayBvbiBmaWVsZCwgd2hpY2ggdW5sb2NrcyBmb3IgZWRpdGluZ1xyXG4gICAgdW5sb2NrRm9yRWRpdGluZyhhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdmFyIGlkOiBzdHJpbmcgPSBhcmdzLnZpZXcuaWQ7XHJcbiAgICAgICAgLy9zZXQgbWV0YWRhdGEgdG8gYWxsb3cgZWRpdGluZ1xyXG4gICAgICAgIHRoaXMuZmllbGRzX21ldGFbaWRdLmVkaXRhYmxlID0gIXRoaXMuZmllbGRzX21ldGFbaWRdLmVkaXRhYmxlO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9nZXQgZmllbGRzLCBhbmQgYWRkIHRvIHRoZSBkaXNwbGF5XHJcbiAgICAgICAgdGhpcy5kYXRhWWVhciA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0WWVhckZyb21UcmFuc3BvcnQoKTtcclxuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb250aCA9IHBhcmFtc1snbW9udGgnXTtcclxuICAgICAgICAgICAgY29uc29sZS5kaXIodGhpcy5kYXRhU2VydmljZS5nZXRNb250aCh0aGlzLm1vbnRoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZ2V0QnVsa09iamVjdCh0aGlzLm1vbnRoLCB0cnVlKS5mb3JFYWNoKChmaWVsZDogRmllbGREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9maWVsZHNfcmVnaXN0cnlbZmllbGQubmFtZV0gPSBmaWVsZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVllYXIuZmllbGRzLmZvckVhY2goKGZpZWxkRGF0YTogRmllbGREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGZpZWxkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvL2FkZCB0byB0YXJnZXQgaWYgYXBwbGljYWJsZVxyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy50YXJnZXRfZmllbGRzX3JlZ2lzdHJ5W2ZpZWxkRGF0YS5uYW1lXSAhPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldF9maWVsZHMucHVzaChmaWVsZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG1ldGFfZGF0YTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBGaWVsZERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBGaWVsZERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAoc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc19tZXRhW2ZpZWxkRGF0YS5uYW1lXSA9IG1ldGFfZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzX21ldGFbZmllbGREYXRhLm5hbWVdLmZpZWxkID0gZmllbGREYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNfbWV0YVtmaWVsZERhdGEubmFtZV0uYnVmZmVyID0gRmllbGREYXRhLmNsb25lKGZpZWxkRGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbmV3RmllbGQoKSB7XHJcbiAgICAgICAgdmFyIG5ld0ZpZWxkOiBGaWVsZERhdGEgPSBuZXcgRmllbGREYXRhKCk7XHJcbiAgICAgICAgdmFyIG1ldGFfZGF0YTogT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBmaWVsZDogRmllbGREYXRhLFxyXG4gICAgICAgICAgICBidWZmZXI6IEZpZWxkRGF0YSxcclxuICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdGaWVsZC5uYW1lID0gXCJOZXcgRmllbGRcIjtcclxuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKG5ld0ZpZWxkKTtcclxuICAgICAgICBuZXdGaWVsZC50eXBlID0gMDtcclxuICAgICAgICBuZXdGaWVsZC50b3RhbCA9IDA7XHJcbiAgICAgICAgbmV3RmllbGQubWFuZGF0b3J5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5maWVsZHNfbWV0YVtuZXdGaWVsZC5uYW1lXSA9IG1ldGFfZGF0YTtcclxuICAgICAgICB0aGlzLmZpZWxkc19tZXRhW25ld0ZpZWxkLm5hbWVdLmZpZWxkID0gbmV3RmllbGQ7XHJcbiAgICAgICAgdGhpcy5maWVsZHNfbWV0YVtuZXdGaWVsZC5uYW1lXS5idWZmZXIgPSBGaWVsZERhdGEuY2xvbmUobmV3RmllbGQpO1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMuZmllbGRzKTtcclxuICAgICAgICBjb25zb2xlLmRpcih0aGlzLmZpZWxkc19tZXRhKTtcclxuICAgIH1cclxuICAgIC8vdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBtYW5hZ2UgbmFtZSBjaGFuZ2VzIGZvciBhIGZpZWxkXHJcbiAgICBzYXZlRmllbGQoYXJnczpHZXN0dXJlRXZlbnREYXRhLCBvbGROYW1lOnN0cmluZykgeyAgICAgICBcclxuICAgICAgICB2YXIgY2hhbmdlZE5hbWU6c3RyaW5nID0gdGhpcy5maWVsZHNfbWV0YVtvbGROYW1lXS5idWZmZXIubmFtZTtcclxuICAgICAgICB2YXIgdHlwZSA9IHRoaXMuZmllbGRzX21ldGFbb2xkTmFtZV0uYnVmZmVyLnR5cGUgPT0gMCA/ICdpbmNvbWUnIDogJ2V4cGVuc2UnO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0X2ZpZWxkc19yZWdpc3RyeVtjaGFuZ2VkTmFtZV0gPSB0aGlzLnRhcmdldF9maWVsZHNfcmVnaXN0cnlbb2xkTmFtZV07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMudGFyZ2V0X2ZpZWxkc19yZWdpc3RyeVtvbGROYW1lXTtcclxuXHJcbiAgICAgICAgdmFyIG9iamVjdDpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jaGFuZ2VGaWVsZE5hbWUob2xkTmFtZSwgY2hhbmdlZE5hbWUpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24ob2JqZWN0LCB0aGlzLmZpZWxkc19tZXRhW29sZE5hbWVdKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKG9iamVjdFtcImJ1ZmZlclwiXSwgb2JqZWN0W1wiZmllbGRcIl0pO1xyXG4gICAgICAgIHRoaXMuZmllbGRzX21ldGFbY2hhbmdlZE5hbWVdID0gb2JqZWN0O1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMuZmllbGRzX21ldGFbY2hhbmdlZE5hbWVdKTtcclxuICAgICAgICBjb25zb2xlLmRpcihjaGFuZ2VkTmFtZSk7XHJcbiAgICAgICAgLy90aGlzLmZpZWxkc19tZXRhW2NoYW5nZWROYW1lXS5idWZmZXIgPSBGaWVsZERhdGEuY2xvbmUodGhpcy5maWVsZHNfbWV0YVtjaGFuZ2VkTmFtZV0uZmllbGQpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmZpZWxkc19tZXRhW29sZE5hbWVdO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0QnVsa09iamVjdCh0aGlzLm1vbnRoLCB0aGlzLnRhcmdldF9maWVsZHMpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL21vbnRoJywgdGhpcy5tb250aF0sIHtjbGVhckhpc3RvcnkgOiB0cnVlfSk7XHJcbn1cclxuICAgIHRvZ2dsZUZpZWxkKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpe1xyXG4gICAgICAgIHZhciBuZXdWYWx1ZTpib29sZWFuID0gIXRoaXMuZmllbGRzX21ldGFbYXJncy52aWV3LmlkXS5zZWxlY3RlZDtcclxuICAgICAgICB0aGlzLmZpZWxkc19tZXRhW2FyZ3Mudmlldy5pZF0uc2VsZWN0ZWQgPSBuZXdWYWx1ZTtcclxuICAgICAgICBpZihuZXdWYWx1ZSl7XHJcbiAgICAgICAgICAgIC8vYWRkIHRvIHRhcmdldFxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldF9maWVsZHMucHVzaCh0aGlzLmZpZWxkc19tZXRhW2FyZ3Mudmlldy5pZF0uZmllbGQpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0X2ZpZWxkcy5zcGxpY2UodGhpcy50YXJnZXRfZmllbGRzLmluZGV4T2YodGhpcy5maWVsZHNfbWV0YVthcmdzLnZpZXcuaWRdLmZpZWxkKSwgMSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL3NlbmQgZGF0YSBiYWNrIHRvIGNhbGxpbmcgbW9udGhcclxuICAgIHNlbGVjdCgpe1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMudGFyZ2V0X2ZpZWxkcyk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5nZXRCdWxrT2JqZWN0KHRoaXMubW9udGgsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0QnVsa09iamVjdCh0aGlzLm1vbnRoLCB0aGlzLnRhcmdldF9maWVsZHMpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL21vbnRoJywgdGhpcy5tb250aF0sIHtjbGVhckhpc3Rvcnk6IHRydWV9KTtcclxuICAgIH1cclxufSJdfQ==