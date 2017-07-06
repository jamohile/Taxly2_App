"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var datamonth_1 = require("./../../shared/data/datamonth/datamonth");
var field_1 = require("./../../shared/field/field");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var dialogs = require("ui/dialogs");
var data_service_1 = require("./../../shared/data/data.service");
var MonthComponent = (function () {
    function MonthComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.month = "January";
        this.fields = new observable_array_1.ObservableArray();
        //relates field names to values
        this.field_values = new Object();
        //indexes fields by month
        this.months = new Object();
    }
    MonthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getYearFromTransport().months.forEach(function (month) {
            _this.months[month.month] = month;
        });
        this.sub = this.route.params.subscribe(function (params) {
            if (_this.dataService.hasBulkObject(params['month'])) {
                _this.selectedMonth = _this.dataService.month_names.indexOf(params['month']);
                _this.populateAddedFields(params['month']);
            }
            else {
                //the param will have length 1 if new month, with number being index
                if (params['month'].toString().length <= 2) {
                    _this.selectedMonth = params['month'];
                    _this.populateNewMonth();
                }
                else {
                    _this.populateDataMonth(params['month']);
                }
            }
        });
    };
    MonthComponent.prototype.populateNewMonth = function () {
        var _this = this;
        this.clearCache();
        //creation of a new month
        this.dataService.getYearFromTransport().fields.forEach(function (field) {
            if (field.mandatory) {
                _this.fields.push(field);
                _this.field_values[field.name] = new field_1.Field(field.name, 0);
            }
        });
    };
    MonthComponent.prototype.populateDataMonth = function (month_name) {
        var _this = this;
        this.clearCache();
        //load data for month
        this.selectedMonth = this.dataService.month_names.indexOf(month_name);
        var month = this.months[month_name];
        //load fields from month
        month.fields.forEach(function (field) {
            //create a new instance of the field to prevent overwriting
            var new_field = new field_1.Field(field.name, field.value);
            _this.field_values[field.name] = new_field;
        });
        this.dataService.getYearFromTransport().fields.forEach(function (field) {
            //this field is contained in the month's data
            if (_this.field_values[field.name] != undefined) {
                _this.fields.push(field);
            }
        });
    };
    MonthComponent.prototype.populateAddedFields = function (month_name) {
        var _this = this;
        this.clearCache();
        var month = this.months[month_name];
        var existingFields = Object();
        month.fields.forEach(function (field) {
            //create a new instance of the field to prevent overwriting
            var new_field = new field_1.Field(field.name, field.value);
            existingFields[field.name] = new_field;
        });
        var fields = this.dataService.getBulkObject(this.dataService.month_names[this.selectedMonth], true);
        fields.forEach(function (field) {
            _this.fields.push(field);
            if (existingFields[field.name] != undefined) {
                _this.field_values[field.name] = new field_1.Field(field.name, existingFields[field.name].value);
            }
            else {
                _this.field_values[field.name] = new field_1.Field(field.name, 0);
            }
        });
    };
    MonthComponent.prototype.clearCache = function () {
        this.fields = new observable_array_1.ObservableArray();
        this.field_values = new Object();
    };
    MonthComponent.prototype.addField = function () {
        //call field with index of month
        this.dataService.setBulkObject(this.dataService.month_names[this.selectedMonth], this.fields["_array"]);
        this.router.navigate(["/fields", this.dataService.month_names[this.selectedMonth]]);
    };
    MonthComponent.prototype.save = function () {
        var _this = this;
        console.log('starting save');
        //save this new month;
        var month = new datamonth_1.DataMonth();
        console.log(this.selectedMonth);
        month.month = this.dataService.month_names[this.selectedMonth];
        //take field values data, and load into an array
        var fields = new Array();
        Object.keys(this.field_values).forEach(function (key) {
            fields.push(_this.field_values[key]);
        });
        month.fields = fields;
        //add the new month's data to the year;
        this.dataService.addMonth(month);
        console.dir(this.dataService.getYearFromTransport());
        this.dataService.save(function () {
            alert('Your data was succesfully saved');
            _this.router.navigate(["/dashboard"], { clearHistory: true });
        });
    };
    MonthComponent.prototype.selectedMonthChanged = function (args) {
        var _this = this;
        var newSelectedMonth = args.newIndex;
        if (newSelectedMonth == this.selectedMonth) {
            return;
        }
        if (this.months[this.dataService.month_names[newSelectedMonth]] != undefined) {
            //data exists for the new month
            dialogs.confirm({ title: 'Changing Month', message: 'Are you sure you want to change the month? You will be overwriting existing data, and any changes you just made will be discarded.', okButtonText: 'I Understand', cancelButtonText: 'No' }).then(function (result) {
                if (result) {
                    _this.selectedMonth = newSelectedMonth;
                    _this.populateDataMonth(_this.dataService.month_names[_this.selectedMonth]);
                }
            });
        }
        else {
            dialogs.confirm({ title: 'Changing Month', message: 'Are you sure you want to change the month? Any changes you just made will be discarded.', okButtonText: 'I Understand', cancelButtonText: 'No' }).then(function (result) {
                if (result) {
                    _this.selectedMonth = newSelectedMonth;
                    _this.populateNewMonth();
                }
            });
        }
    };
    return MonthComponent;
}());
MonthComponent = __decorate([
    core_1.Component({
        selector: "month",
        providers: [data_service_1.DataService],
        templateUrl: "pages/month/month.html",
        styleUrls: ["pages/month/month-common.css"]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, nativescript_angular_1.RouterExtensions, router_1.ActivatedRoute])
], MonthComponent);
exports.MonthComponent = MonthComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9udGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQWlEO0FBQ2pELHFFQUFvRTtBQUVwRSxvREFBbUQ7QUFDbkQsMkVBQXlFO0FBQ3pFLHNDQUF5RTtBQUV6RSw2REFBd0Q7QUFHeEQsb0NBQXNDO0FBRXRDLGlFQUErRDtBQVEvRCxJQUFhLGNBQWM7SUFVdkIsd0JBQW9CLFdBQXdCLEVBQVUsTUFBd0IsRUFBVSxLQUFxQjtRQUF6RixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFSN0csVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUMxQixXQUFNLEdBQStCLElBQUksa0NBQWUsRUFBYSxDQUFDO1FBQ3RFLCtCQUErQjtRQUMvQixpQkFBWSxHQUFXLElBQUksTUFBTSxFQUFFLENBQUM7UUFDcEMseUJBQXlCO1FBQ3pCLFdBQU0sR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBR21GLENBQUM7SUFDbEgsaUNBQVEsR0FBUjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWdCO1lBQ3BFLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN6QyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELEtBQUksQ0FBQyxhQUFh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Q0osT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUseUZBQXlGLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQzlNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsS0FBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDdEMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBbklELElBbUlDO0FBbklZLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDeEIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztLQUM5QyxDQUFDO3FDQVltQywwQkFBVyxFQUFrQix1Q0FBZ0IsRUFBaUIsdUJBQWM7R0FWcEcsY0FBYyxDQW1JMUI7QUFuSVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERhdGFNb250aCB9IGZyb20gJy4vLi4vLi4vc2hhcmVkL2RhdGEvZGF0YW1vbnRoL2RhdGFtb250aCc7XHJcbmltcG9ydCB7IEZpZWxkRGF0YSB9IGZyb20gJy4vLi4vLi4vc2hhcmVkL2ZpZWxkL2ZpZWxkLmRhdGEnO1xyXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4vLi4vLi4vc2hhcmVkL2ZpZWxkL2ZpZWxkJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXknO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWRyb3AtZG93bic7XHJcbmltcG9ydCB7IExpc3RQaWNrZXIgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyJztcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd1aS9kaWFsb2dzJztcclxuXHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQvZGF0YS9kYXRhLnNlcnZpY2UnO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1vbnRoXCIsXHJcbiAgICBwcm92aWRlcnM6IFtEYXRhU2VydmljZV0sXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9tb250aC9tb250aC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL21vbnRoL21vbnRoLWNvbW1vbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNb250aENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBzZWxlY3RlZE1vbnRoOiBudW1iZXI7XHJcbiAgICBtb250aDogU3RyaW5nID0gXCJKYW51YXJ5XCI7XHJcbiAgICBmaWVsZHM6IE9ic2VydmFibGVBcnJheTxGaWVsZERhdGE+ID0gbmV3IE9ic2VydmFibGVBcnJheTxGaWVsZERhdGE+KCk7XHJcbiAgICAvL3JlbGF0ZXMgZmllbGQgbmFtZXMgdG8gdmFsdWVzXHJcbiAgICBmaWVsZF92YWx1ZXM6IE9iamVjdCA9IG5ldyBPYmplY3QoKTtcclxuICAgIC8vaW5kZXhlcyBmaWVsZHMgYnkgbW9udGhcclxuICAgIG1vbnRoczogT2JqZWN0ID0gbmV3IE9iamVjdCgpO1xyXG4gICAgLy9zdWJzY3JpYmVkIHJvdXRlXHJcbiAgICBwcml2YXRlIHN1YjogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgeyB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldFllYXJGcm9tVHJhbnNwb3J0KCkubW9udGhzLmZvckVhY2goKG1vbnRoOiBEYXRhTW9udGgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb250aHNbbW9udGgubW9udGhdID0gbW9udGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVNlcnZpY2UuaGFzQnVsa09iamVjdChwYXJhbXNbJ21vbnRoJ10pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLmRhdGFTZXJ2aWNlLm1vbnRoX25hbWVzLmluZGV4T2YocGFyYW1zWydtb250aCddKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVBZGRlZEZpZWxkcyhwYXJhbXNbJ21vbnRoJ10pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy90aGUgcGFyYW0gd2lsbCBoYXZlIGxlbmd0aCAxIGlmIG5ldyBtb250aCwgd2l0aCBudW1iZXIgYmVpbmcgaW5kZXhcclxuICAgICAgICAgICAgICAgIGlmICgoPHN0cmluZz5wYXJhbXNbJ21vbnRoJ10pLnRvU3RyaW5nKCkubGVuZ3RoIDw9IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSBwYXJhbXNbJ21vbnRoJ107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZU5ld01vbnRoKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVEYXRhTW9udGgocGFyYW1zWydtb250aCddKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcG9wdWxhdGVOZXdNb250aCgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcclxuICAgICAgICAvL2NyZWF0aW9uIG9mIGEgbmV3IG1vbnRoXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5nZXRZZWFyRnJvbVRyYW5zcG9ydCgpLmZpZWxkcy5mb3JFYWNoKChmaWVsZDogRmllbGREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5tYW5kYXRvcnkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZF92YWx1ZXNbZmllbGQubmFtZV0gPSBuZXcgRmllbGQoZmllbGQubmFtZSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHBvcHVsYXRlRGF0YU1vbnRoKG1vbnRoX25hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xyXG4gICAgICAgIC8vbG9hZCBkYXRhIGZvciBtb250aFxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IHRoaXMuZGF0YVNlcnZpY2UubW9udGhfbmFtZXMuaW5kZXhPZihtb250aF9uYW1lKTtcclxuICAgICAgICB2YXIgbW9udGg6IERhdGFNb250aCA9IHRoaXMubW9udGhzW21vbnRoX25hbWVdO1xyXG4gICAgICAgIC8vbG9hZCBmaWVsZHMgZnJvbSBtb250aFxyXG4gICAgICAgIG1vbnRoLmZpZWxkcy5mb3JFYWNoKChmaWVsZDogRmllbGQpID0+IHtcclxuICAgICAgICAgICAgLy9jcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGZpZWxkIHRvIHByZXZlbnQgb3ZlcndyaXRpbmdcclxuICAgICAgICAgICAgdmFyIG5ld19maWVsZDogRmllbGQgPSBuZXcgRmllbGQoZmllbGQubmFtZSwgZmllbGQudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpZWxkX3ZhbHVlc1tmaWVsZC5uYW1lXSA9IG5ld19maWVsZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldFllYXJGcm9tVHJhbnNwb3J0KCkuZmllbGRzLmZvckVhY2goKGZpZWxkOiBGaWVsZERhdGEpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzIGZpZWxkIGlzIGNvbnRhaW5lZCBpbiB0aGUgbW9udGgncyBkYXRhXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkX3ZhbHVlc1tmaWVsZC5uYW1lXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwb3B1bGF0ZUFkZGVkRmllbGRzKG1vbnRoX25hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xyXG4gICAgICAgIHZhciBtb250aDogRGF0YU1vbnRoID0gdGhpcy5tb250aHNbbW9udGhfbmFtZV07XHJcbiAgICAgICAgdmFyIGV4aXN0aW5nRmllbGRzOiBPYmplY3QgPSBPYmplY3QoKTtcclxuICAgICAgICBtb250aC5maWVsZHMuZm9yRWFjaCgoZmllbGQ6IEZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBmaWVsZCB0byBwcmV2ZW50IG92ZXJ3cml0aW5nXHJcbiAgICAgICAgICAgIHZhciBuZXdfZmllbGQ6IEZpZWxkID0gbmV3IEZpZWxkKGZpZWxkLm5hbWUsIGZpZWxkLnZhbHVlKTtcclxuICAgICAgICAgICAgZXhpc3RpbmdGaWVsZHNbZmllbGQubmFtZV0gPSBuZXdfZmllbGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGZpZWxkczogQXJyYXk8RmllbGREYXRhPiA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0QnVsa09iamVjdCh0aGlzLmRhdGFTZXJ2aWNlLm1vbnRoX25hbWVzW3RoaXMuc2VsZWN0ZWRNb250aF0sIHRydWUpO1xyXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogRmllbGREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdGaWVsZHNbZmllbGQubmFtZV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkX3ZhbHVlc1tmaWVsZC5uYW1lXSA9IG5ldyBGaWVsZChmaWVsZC5uYW1lLCBleGlzdGluZ0ZpZWxkc1tmaWVsZC5uYW1lXS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkX3ZhbHVlc1tmaWVsZC5uYW1lXSA9IG5ldyBGaWVsZChmaWVsZC5uYW1lLCAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNsZWFyQ2FjaGUoKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEZpZWxkRGF0YT4oKTtcclxuICAgICAgICB0aGlzLmZpZWxkX3ZhbHVlcyA9IG5ldyBPYmplY3QoKTtcclxuICAgIH1cclxuICAgIGFkZEZpZWxkKCkge1xyXG4gICAgICAgIC8vY2FsbCBmaWVsZCB3aXRoIGluZGV4IG9mIG1vbnRoXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXRCdWxrT2JqZWN0KHRoaXMuZGF0YVNlcnZpY2UubW9udGhfbmFtZXNbdGhpcy5zZWxlY3RlZE1vbnRoXSwgdGhpcy5maWVsZHNbXCJfYXJyYXlcIl0pO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9maWVsZHNcIiwgdGhpcy5kYXRhU2VydmljZS5tb250aF9uYW1lc1t0aGlzLnNlbGVjdGVkTW9udGhdXSk7XHJcbiAgICB9XHJcbiAgICBzYXZlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFydGluZyBzYXZlJyk7XHJcbiAgICAgICAgLy9zYXZlIHRoaXMgbmV3IG1vbnRoO1xyXG4gICAgICAgIHZhciBtb250aDogRGF0YU1vbnRoID0gbmV3IERhdGFNb250aCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRNb250aCk7XHJcbiAgICAgICAgbW9udGgubW9udGggPSB0aGlzLmRhdGFTZXJ2aWNlLm1vbnRoX25hbWVzW3RoaXMuc2VsZWN0ZWRNb250aF07XHJcbiAgICAgICAgLy90YWtlIGZpZWxkIHZhbHVlcyBkYXRhLCBhbmQgbG9hZCBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgdmFyIGZpZWxkczogRmllbGRbXSA9IG5ldyBBcnJheTxGaWVsZD4oKTtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZpZWxkX3ZhbHVlcykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKHRoaXMuZmllbGRfdmFsdWVzW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1vbnRoLmZpZWxkcyA9IGZpZWxkcztcclxuICAgICAgICAvL2FkZCB0aGUgbmV3IG1vbnRoJ3MgZGF0YSB0byB0aGUgeWVhcjtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZE1vbnRoKG1vbnRoKTtcclxuICAgICAgICBjb25zb2xlLmRpcih0aGlzLmRhdGFTZXJ2aWNlLmdldFllYXJGcm9tVHJhbnNwb3J0KCkpO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2F2ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdZb3VyIGRhdGEgd2FzIHN1Y2Nlc2Z1bGx5IHNhdmVkJyk7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9kYXNoYm9hcmRcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZE1vbnRoQ2hhbmdlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIHZhciBuZXdTZWxlY3RlZE1vbnRoID0gYXJncy5uZXdJbmRleDtcclxuXHJcbiAgICAgICAgaWYgKG5ld1NlbGVjdGVkTW9udGggPT0gdGhpcy5zZWxlY3RlZE1vbnRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW9udGhzW3RoaXMuZGF0YVNlcnZpY2UubW9udGhfbmFtZXNbbmV3U2VsZWN0ZWRNb250aF1dICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvL2RhdGEgZXhpc3RzIGZvciB0aGUgbmV3IG1vbnRoXHJcbiAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybSh7IHRpdGxlOiAnQ2hhbmdpbmcgTW9udGgnLCBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgbW9udGg/IFlvdSB3aWxsIGJlIG92ZXJ3cml0aW5nIGV4aXN0aW5nIGRhdGEsIGFuZCBhbnkgY2hhbmdlcyB5b3UganVzdCBtYWRlIHdpbGwgYmUgZGlzY2FyZGVkLicsIG9rQnV0dG9uVGV4dDogJ0kgVW5kZXJzdGFuZCcsIGNhbmNlbEJ1dHRvblRleHQ6ICdObycgfSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IG5ld1NlbGVjdGVkTW9udGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZURhdGFNb250aCh0aGlzLmRhdGFTZXJ2aWNlLm1vbnRoX25hbWVzW3RoaXMuc2VsZWN0ZWRNb250aF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0oeyB0aXRsZTogJ0NoYW5naW5nIE1vbnRoJywgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIG1vbnRoPyBBbnkgY2hhbmdlcyB5b3UganVzdCBtYWRlIHdpbGwgYmUgZGlzY2FyZGVkLicsIG9rQnV0dG9uVGV4dDogJ0kgVW5kZXJzdGFuZCcsIGNhbmNlbEJ1dHRvblRleHQ6ICdObycgfSkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IG5ld1NlbGVjdGVkTW9udGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZU5ld01vbnRoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==