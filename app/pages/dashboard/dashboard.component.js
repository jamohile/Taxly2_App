"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var data_service_1 = require("../../shared/data/data.service");
var DashboardComponent = (function () {
    function DashboardComponent(dataService, page, router) {
        this.dataService = dataService;
        this.router = router;
        //allows views to access data outside their object
        this.name_to_fields = new Object();
        page.bindingContext = this.fields;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.load(2017, function (dataYear) {
            _this.dataYear = dataYear;
            _this.dataService.setYearForTransport(dataYear);
            _this.fields = new observable_array_1.ObservableArray(dataYear.fields);
            _this.months = new observable_array_1.ObservableArray(dataYear.months);
            _this.dataYear.fields.forEach(function (field) {
                field.total = 0;
                _this.name_to_fields[field.name] = field;
            });
            _this.months.forEach(function (month) {
                month.fields.forEach(function (field) {
                    _this.name_to_fields[field.name].total = +_this.name_to_fields[field.name].total + +field.value;
                });
            });
        });
    };
    DashboardComponent.prototype.addMonth = function () {
        this.router.navigate(["/month", this.months.length.toString()]);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: "dashboard",
        providers: [data_service_1.DataService],
        templateUrl: "pages/dashboard/dashboard.html",
        styleUrls: ["pages/dashboard/dashboard-common.css"]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, page_1.Page, router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0U7QUFDeEUsMENBQXVDO0FBQ3ZDLGdDQUE2QjtBQUU3QiwyRUFBeUU7QUFHekUsK0RBQTZEO0FBYTdELElBQWEsa0JBQWtCO0lBTzNCLDRCQUFvQixXQUF1QixFQUFFLElBQVMsRUFBVSxNQUFhO1FBQXpELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQXFCLFdBQU0sR0FBTixNQUFNLENBQU87UUFIN0Usa0RBQWtEO1FBQ2xELG1CQUFjLEdBQVUsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxRQUFpQjtZQUMxQyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixLQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZTtnQkFDekMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZTtnQkFDaEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFXO29CQUM3QixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUksQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNuRyxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0QscUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDO0FBL0JZLGtCQUFrQjtJQVA5QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztRQUN4QixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO0tBQ3RELENBQUM7cUNBU2tDLDBCQUFXLEVBQU8sV0FBSSxFQUFpQixlQUFNO0dBUHBFLGtCQUFrQixDQStCOUI7QUEvQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge0NvbG9yfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVllYXJ9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXRhL2RhdGF5ZWFyL2RhdGF5ZWFyJztcclxuaW1wb3J0IHsgRGF0YU1vbnRoIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhL2RhdGFtb250aC9kYXRhbW9udGhcIjtcclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2ZpZWxkL2ZpZWxkXCI7XHJcbmltcG9ydCB7IEZpZWxkRGF0YSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZmllbGQvZmllbGQuZGF0YVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJkYXNoYm9hcmRcIixcclxuICAgIHByb3ZpZGVyczogW0RhdGFTZXJ2aWNlXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLWNvbW1vbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgICBkYXRhWWVhcjpEYXRhWWVhcjtcclxuICAgIGZpZWxkczogT2JzZXJ2YWJsZUFycmF5PEZpZWxkRGF0YT47XHJcbiAgICBtb250aHM6IE9ic2VydmFibGVBcnJheTxEYXRhTW9udGg+O1xyXG4gICAgLy9hbGxvd3Mgdmlld3MgdG8gYWNjZXNzIGRhdGEgb3V0c2lkZSB0aGVpciBvYmplY3RcclxuICAgIG5hbWVfdG9fZmllbGRzOk9iamVjdCA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOkRhdGFTZXJ2aWNlLCBwYWdlOlBhZ2UsIHByaXZhdGUgcm91dGVyOlJvdXRlcikge1xyXG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB0aGlzLmZpZWxkcztcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgIHRoaXMuZGF0YVNlcnZpY2UubG9hZCgyMDE3LCAoZGF0YVllYXI6RGF0YVllYXIpID0+IHtcclxuICAgICAgICAgICB0aGlzLmRhdGFZZWFyID0gZGF0YVllYXI7XHJcbiAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRZZWFyRm9yVHJhbnNwb3J0KGRhdGFZZWFyKTtcclxuICAgICAgICAgICB0aGlzLmZpZWxkcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoZGF0YVllYXIuZmllbGRzKTtcclxuICAgICAgICAgICB0aGlzLm1vbnRocyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoZGF0YVllYXIubW9udGhzKTtcclxuICAgICAgICAgICB0aGlzLmRhdGFZZWFyLmZpZWxkcy5mb3JFYWNoKChmaWVsZDpGaWVsZERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgZmllbGQudG90YWwgPSAwO1xyXG4gICAgICAgICAgICAgICB0aGlzLm5hbWVfdG9fZmllbGRzW2ZpZWxkLm5hbWVdID0gZmllbGQ7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgdGhpcy5tb250aHMuZm9yRWFjaCgobW9udGg6RGF0YU1vbnRoKSA9PiB7XHJcbiAgICAgICAgICAgICAgIG1vbnRoLmZpZWxkcy5mb3JFYWNoKChmaWVsZDpGaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lX3RvX2ZpZWxkc1tmaWVsZC5uYW1lXS50b3RhbCA9ICArdGhpcy5uYW1lX3RvX2ZpZWxkc1tmaWVsZC5uYW1lXS50b3RhbCArICtmaWVsZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICB9KTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkTW9udGgoKXtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbW9udGhcIiwgdGhpcy5tb250aHMubGVuZ3RoLnRvU3RyaW5nKCldKTtcclxuICAgIH1cclxufSJdfQ==