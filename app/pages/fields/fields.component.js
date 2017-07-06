"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var router_1 = require("@angular/router");
var data_service_1 = require("../../shared/data/data.service");
var field_data_1 = require("./../../shared/field/field.data");
var FieldComponent = (function () {
    function FieldComponent(dataService, route) {
        this.dataService = dataService;
        this.route = route;
        this.fields = new observable_array_1.ObservableArray();
        //stores current fields of calling month
        this.target_fields = new Array();
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
            var month = params['month'];
            _this.dataYear.months[month].fields.forEach(function (field) {
                _this.target_fields.push(field.name);
            });
            console.log(_this.target_fields.indexOf('sdf'));
            _this.dataYear.fields.forEach(function (fieldData) {
                _this.fields.push(fieldData);
                var meta_data = {
                    field: field_data_1.FieldData,
                    buffer: field_data_1.FieldData,
                    editable: false,
                    selected: (_this)
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
            editable: true
        };
        newField.name = "New Field";
        this.fields.push(newField);
        this.fields_meta[newField.name] = meta_data;
        this.fields_meta[newField.name].field = newField;
        this.fields_meta[newField.name].buffer = field_data_1.FieldData.clone(newField);
    };
    //this function needs to manage name changes for a field
    FieldComponent.prototype.saveField = function () {
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
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute])
], FieldComponent);
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpZWxkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFHekUsMkVBQXlFO0FBSXpFLDBDQUFpRDtBQUdqRCwrREFBNkQ7QUFFN0QsOERBQTREO0FBUzVELElBQWEsY0FBYztJQVF2Qix3QkFBb0IsV0FBd0IsRUFBVSxLQUFxQjtRQUF2RCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBTjNFLFdBQU0sR0FBK0IsSUFBSSxrQ0FBZSxFQUFhLENBQUM7UUFDdEUsd0NBQXdDO1FBQ3hDLGtCQUFhLEdBQVksSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUM3QyxpRkFBaUY7UUFDakYsa0RBQWtEO1FBQ2xELGdCQUFXLEdBQVcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUVuQyxDQUFDO0lBQ0QsdURBQXVEO0lBQ3ZELHlDQUFnQixHQUFoQixVQUFpQixJQUFzQjtRQUNuQyxJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM5QiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNuRSxDQUFDO0lBQ0QsaUNBQVEsR0FBUjtRQUFBLGlCQXNCQztRQXJCRyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM5QixJQUFJLEtBQUssR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQVc7Z0JBQ25ELEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFvQjtnQkFDOUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLElBQUksU0FBUyxHQUFXO29CQUNwQixLQUFLLEVBQUUsc0JBQVM7b0JBQ2hCLE1BQU0sRUFBRSxzQkFBUztvQkFDakIsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsUUFBUSxFQUFFLENBQUMsS0FBSSxDQUFDO2lCQUN2QixDQUFBO2dCQUNHLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDN0MsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDbkQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLHNCQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsaUNBQVEsR0FBUjtRQUNJLElBQUksUUFBUSxHQUFjLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQzFDLElBQUksU0FBUyxHQUFXO1lBQ3BCLEtBQUssRUFBRSxzQkFBUztZQUNoQixNQUFNLEVBQUUsc0JBQVM7WUFDakIsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQTtRQUNELFFBQVEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxzQkFBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0Qsd0RBQXdEO0lBQ3hELGtDQUFTLEdBQVQ7SUFFQSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBeERELElBd0RDO0FBeERZLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDeEIsV0FBVyxFQUFFLDBCQUEwQjtRQUN2QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztLQUNoRCxDQUFDO3FDQVVtQywwQkFBVyxFQUFpQix1QkFBYztHQVJsRSxjQUFjLENBd0QxQjtBQXhEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjb2xvcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5JztcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMnO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2xheW91dC1iYXNlJztcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0JztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVllYXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2RhdGEvZGF0YXllYXIvZGF0YXllYXJcIjtcclxuaW1wb3J0IHsgRmllbGREYXRhIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQvZmllbGQvZmllbGQuZGF0YSc7XHJcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQvZmllbGQvZmllbGQnO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImZpZWxkc1wiLFxyXG4gICAgcHJvdmlkZXJzOiBbRGF0YVNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvZmllbGRzL2ZpZWxkcy5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL2ZpZWxkcy9maWVsZHMtY29tbW9uLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGRhdGFZZWFyOiBEYXRhWWVhcjtcclxuICAgIGZpZWxkczogT2JzZXJ2YWJsZUFycmF5PEZpZWxkRGF0YT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZpZWxkRGF0YT4oKTtcclxuICAgIC8vc3RvcmVzIGN1cnJlbnQgZmllbGRzIG9mIGNhbGxpbmcgbW9udGhcclxuICAgIHRhcmdldF9maWVsZHM6c3RyaW5nW10gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgLy9zdG9yZXMgaW5mb3JtYXRpb24gYWJvdXQgZWFjaCBmaWVsZCwgc3VjaCBhcyB3aGV0aGVyIGl0IGlzIHVubG9ja2VkIGZvciBlZGl0aW5nXHJcbiAgICAvL2Fsc28gYWN0cyBhcyBhIGJ1ZmZlciwgdGVtcG9yYXJpbHkgc3RvcmluZyBlZGl0c1xyXG4gICAgZmllbGRzX21ldGE6IE9iamVjdCA9IG5ldyBPYmplY3QoKTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgfVxyXG4gICAgLy9oYW5kbGUgbG9uZyBjbGljayBvbiBmaWVsZCwgd2hpY2ggdW5sb2NrcyBmb3IgZWRpdGluZ1xyXG4gICAgdW5sb2NrRm9yRWRpdGluZyhhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdmFyIGlkOiBzdHJpbmcgPSBhcmdzLnZpZXcuaWQ7XHJcbiAgICAgICAgLy9zZXQgbWV0YWRhdGEgdG8gYWxsb3cgZWRpdGluZ1xyXG4gICAgICAgIHRoaXMuZmllbGRzX21ldGFbaWRdLmVkaXRhYmxlID0gIXRoaXMuZmllbGRzX21ldGFbaWRdLmVkaXRhYmxlO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9nZXQgZmllbGRzLCBhbmQgYWRkIHRvIHRoZSBkaXNwbGF5XHJcbiAgICAgICAgdGhpcy5kYXRhWWVhciA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0WWVhckZyb21UcmFuc3BvcnQoKTtcclxuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdmFyIG1vbnRoOiBudW1iZXIgPSBwYXJhbXNbJ21vbnRoJ107XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVllYXIubW9udGhzW21vbnRoXS5maWVsZHMuZm9yRWFjaCgoZmllbGQ6RmllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0X2ZpZWxkcy5wdXNoKGZpZWxkLm5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50YXJnZXRfZmllbGRzLmluZGV4T2YoJ3NkZicpKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhWWVhci5maWVsZHMuZm9yRWFjaCgoZmllbGREYXRhOiBGaWVsZERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goZmllbGREYXRhKTtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRhX2RhdGE6IE9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogRmllbGREYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogRmllbGREYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogKHRoaXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzX21ldGFbZmllbGREYXRhLm5hbWVdID0gbWV0YV9kYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNfbWV0YVtmaWVsZERhdGEubmFtZV0uZmllbGQgPSBmaWVsZERhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc19tZXRhW2ZpZWxkRGF0YS5uYW1lXS5idWZmZXIgPSBGaWVsZERhdGEuY2xvbmUoZmllbGREYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBuZXdGaWVsZCgpIHtcclxuICAgICAgICB2YXIgbmV3RmllbGQ6IEZpZWxkRGF0YSA9IG5ldyBGaWVsZERhdGEoKTtcclxuICAgICAgICB2YXIgbWV0YV9kYXRhOiBPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIGZpZWxkOiBGaWVsZERhdGEsXHJcbiAgICAgICAgICAgIGJ1ZmZlcjogRmllbGREYXRhLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdGaWVsZC5uYW1lID0gXCJOZXcgRmllbGRcIjtcclxuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKG5ld0ZpZWxkKTtcclxuICAgICAgICB0aGlzLmZpZWxkc19tZXRhW25ld0ZpZWxkLm5hbWVdID0gbWV0YV9kYXRhO1xyXG4gICAgICAgIHRoaXMuZmllbGRzX21ldGFbbmV3RmllbGQubmFtZV0uZmllbGQgPSBuZXdGaWVsZDtcclxuICAgICAgICB0aGlzLmZpZWxkc19tZXRhW25ld0ZpZWxkLm5hbWVdLmJ1ZmZlciA9IEZpZWxkRGF0YS5jbG9uZShuZXdGaWVsZCk7XHJcbiAgICB9XHJcbiAgICAvL3RoaXMgZnVuY3Rpb24gbmVlZHMgdG8gbWFuYWdlIG5hbWUgY2hhbmdlcyBmb3IgYSBmaWVsZFxyXG4gICAgc2F2ZUZpZWxkKCkge1xyXG5cclxuICAgIH1cclxufSJdfQ==