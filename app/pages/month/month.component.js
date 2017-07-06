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
        this.month_names = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
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
            //the param will have length 1 if new month, with number being index
            if (params['month'].toString().length <= 2) {
                _this.selectedMonth = params['month'];
                _this.populateNewMonth();
            }
            else {
                _this.populateDataMonth(params['month']);
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
        this.selectedMonth = this.month_names.indexOf(month_name);
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
    MonthComponent.prototype.clearCache = function () {
        this.fields = new observable_array_1.ObservableArray();
        this.field_values = new Object();
    };
    MonthComponent.prototype.addField = function () {
        //call field with index of month
        this.router.navigate(["/fields", this.selectedMonth]);
    };
    MonthComponent.prototype.save = function () {
        var _this = this;
        console.log('starting save');
        //save this new month;
        var month = new datamonth_1.DataMonth();
        console.log(this.selectedMonth);
        month.month = this.month_names[this.selectedMonth];
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
        if (this.months[this.month_names[newSelectedMonth]] != undefined) {
            //data exists for the new month
            dialogs.confirm({ title: 'Changing Month', message: 'Are you sure you want to change the month? You will be overwriting existing data, and any changes you just made will be discarded.', okButtonText: 'I Understand', cancelButtonText: 'No' }).then(function (result) {
                if (result) {
                    _this.selectedMonth = newSelectedMonth;
                    _this.populateDataMonth(_this.month_names[_this.selectedMonth]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9udGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQWlEO0FBQ2pELHFFQUFvRTtBQUVwRSxvREFBbUQ7QUFDbkQsMkVBQXlFO0FBQ3pFLHNDQUF5RTtBQUV6RSw2REFBd0Q7QUFHeEQsb0NBQXNDO0FBRXRDLGlFQUErRDtBQVEvRCxJQUFhLGNBQWM7SUFZdkIsd0JBQW9CLFdBQXdCLEVBQVUsTUFBd0IsRUFBVSxLQUFxQjtRQUF6RixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFYN0csZ0JBQVcsR0FBYTtZQUNwQixTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7U0FBQyxDQUFDO1FBRTlILFVBQUssR0FBVyxTQUFTLENBQUM7UUFDMUIsV0FBTSxHQUErQixJQUFJLGtDQUFlLEVBQWEsQ0FBQztRQUN0RSwrQkFBK0I7UUFDL0IsaUJBQVksR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3BDLHlCQUF5QjtRQUN6QixXQUFNLEdBQVcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUdtRixDQUFDO0lBQ2xILGlDQUFRLEdBQVI7UUFBQSxpQkFhQztRQVpHLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBZ0I7WUFDcEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxD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Q3hCLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDOUMsQ0FBQztxQ0FjbUMsMEJBQVcsRUFBa0IsdUNBQWdCLEVBQWlCLHVCQUFjO0dBWnBHLGNBQWMsQ0EyRzFCO0FBM0dZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBEYXRhTW9udGggfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9kYXRhL2RhdGFtb250aC9kYXRhbW9udGgnO1xyXG5pbXBvcnQgeyBGaWVsZERhdGEgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9maWVsZC9maWVsZC5kYXRhJztcclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9maWVsZC9maWVsZCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5JztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1kcm9wLWRvd24nO1xyXG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlcic7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSAndWkvZGlhbG9ncyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2hhcmVkL2RhdGEvZGF0YS5zZXJ2aWNlJztcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtb250aFwiLFxyXG4gICAgcHJvdmlkZXJzOiBbRGF0YVNlcnZpY2VdLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbW9udGgvbW9udGguaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9tb250aC9tb250aC1jb21tb24uY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTW9udGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgbW9udGhfbmFtZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl07XHJcbiAgICBzZWxlY3RlZE1vbnRoOiBudW1iZXI7XHJcbiAgICBtb250aDogU3RyaW5nID0gXCJKYW51YXJ5XCI7XHJcbiAgICBmaWVsZHM6IE9ic2VydmFibGVBcnJheTxGaWVsZERhdGE+ID0gbmV3IE9ic2VydmFibGVBcnJheTxGaWVsZERhdGE+KCk7XHJcbiAgICAvL3JlbGF0ZXMgZmllbGQgbmFtZXMgdG8gdmFsdWVzXHJcbiAgICBmaWVsZF92YWx1ZXM6IE9iamVjdCA9IG5ldyBPYmplY3QoKTtcclxuICAgIC8vaW5kZXhlcyBmaWVsZHMgYnkgbW9udGhcclxuICAgIG1vbnRoczogT2JqZWN0ID0gbmV3IE9iamVjdCgpO1xyXG4gICAgLy9zdWJzY3JpYmVkIHJvdXRlXHJcbiAgICBwcml2YXRlIHN1YjogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkgeyB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldFllYXJGcm9tVHJhbnNwb3J0KCkubW9udGhzLmZvckVhY2goKG1vbnRoOiBEYXRhTW9udGgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb250aHNbbW9udGgubW9udGhdID0gbW9udGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgLy90aGUgcGFyYW0gd2lsbCBoYXZlIGxlbmd0aCAxIGlmIG5ldyBtb250aCwgd2l0aCBudW1iZXIgYmVpbmcgaW5kZXhcclxuICAgICAgICAgICAgaWYgKCg8c3RyaW5nPnBhcmFtc1snbW9udGgnXSkudG9TdHJpbmcoKS5sZW5ndGggPD0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gcGFyYW1zWydtb250aCddO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZU5ld01vbnRoKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlRGF0YU1vbnRoKHBhcmFtc1snbW9udGgnXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHBvcHVsYXRlTmV3TW9udGgoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhY2hlKCk7XHJcbiAgICAgICAgLy9jcmVhdGlvbiBvZiBhIG5ldyBtb250aFxyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZ2V0WWVhckZyb21UcmFuc3BvcnQoKS5maWVsZHMuZm9yRWFjaCgoZmllbGQ6IEZpZWxkRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQubWFuZGF0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRfdmFsdWVzW2ZpZWxkLm5hbWVdID0gbmV3IEZpZWxkKGZpZWxkLm5hbWUsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwb3B1bGF0ZURhdGFNb250aChtb250aF9uYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcclxuICAgICAgICAvL2xvYWQgZGF0YSBmb3IgbW9udGhcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLm1vbnRoX25hbWVzLmluZGV4T2YobW9udGhfbmFtZSk7XHJcbiAgICAgICAgdmFyIG1vbnRoOiBEYXRhTW9udGggPSB0aGlzLm1vbnRoc1ttb250aF9uYW1lXTtcclxuICAgICAgICAvL2xvYWQgZmllbGRzIGZyb20gbW9udGhcclxuICAgICAgICBtb250aC5maWVsZHMuZm9yRWFjaCgoZmllbGQ6IEZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBmaWVsZCB0byBwcmV2ZW50IG92ZXJ3cml0aW5nXHJcbiAgICAgICAgICAgIHZhciBuZXdfZmllbGQ6IEZpZWxkID0gbmV3IEZpZWxkKGZpZWxkLm5hbWUsIGZpZWxkLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maWVsZF92YWx1ZXNbZmllbGQubmFtZV0gPSBuZXdfZmllbGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5nZXRZZWFyRnJvbVRyYW5zcG9ydCgpLmZpZWxkcy5mb3JFYWNoKChmaWVsZDogRmllbGREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vdGhpcyBmaWVsZCBpcyBjb250YWluZWQgaW4gdGhlIG1vbnRoJ3MgZGF0YVxyXG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZF92YWx1ZXNbZmllbGQubmFtZV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2xlYXJDYWNoZSgpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RmllbGREYXRhPigpO1xyXG4gICAgICAgIHRoaXMuZmllbGRfdmFsdWVzID0gbmV3IE9iamVjdCgpO1xyXG4gICAgfVxyXG4gICAgYWRkRmllbGQoKSB7XHJcbiAgICAgICAgLy9jYWxsIGZpZWxkIHdpdGggaW5kZXggb2YgbW9udGhcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZmllbGRzXCIsIHRoaXMuc2VsZWN0ZWRNb250aF0pO1xyXG4gICAgfVxyXG4gICAgc2F2ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgc2F2ZScpO1xyXG4gICAgICAgIC8vc2F2ZSB0aGlzIG5ldyBtb250aDtcclxuICAgICAgICB2YXIgbW9udGg6IERhdGFNb250aCA9IG5ldyBEYXRhTW9udGgoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkTW9udGgpO1xyXG4gICAgICAgIG1vbnRoLm1vbnRoID0gdGhpcy5tb250aF9uYW1lc1t0aGlzLnNlbGVjdGVkTW9udGhdO1xyXG4gICAgICAgIC8vdGFrZSBmaWVsZCB2YWx1ZXMgZGF0YSwgYW5kIGxvYWQgaW50byBhbiBhcnJheVxyXG4gICAgICAgIHZhciBmaWVsZHM6IEZpZWxkW10gPSBuZXcgQXJyYXk8RmllbGQ+KCk7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5maWVsZF92YWx1ZXMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBmaWVsZHMucHVzaCh0aGlzLmZpZWxkX3ZhbHVlc1trZXldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtb250aC5maWVsZHMgPSBmaWVsZHM7XHJcbiAgICAgICAgLy9hZGQgdGhlIG5ldyBtb250aCdzIGRhdGEgdG8gdGhlIHllYXI7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRNb250aChtb250aCk7XHJcbiAgICAgICAgY29uc29sZS5kaXIodGhpcy5kYXRhU2VydmljZS5nZXRZZWFyRnJvbVRyYW5zcG9ydCgpKTtcclxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnNhdmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBhbGVydCgnWW91ciBkYXRhIHdhcyBzdWNjZXNmdWxseSBzYXZlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZGFzaGJvYXJkXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0ZWRNb250aENoYW5nZWQoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICB2YXIgbmV3U2VsZWN0ZWRNb250aCA9IGFyZ3MubmV3SW5kZXg7XHJcblxyXG4gICAgICAgIGlmIChuZXdTZWxlY3RlZE1vbnRoID09IHRoaXMuc2VsZWN0ZWRNb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1vbnRoc1t0aGlzLm1vbnRoX25hbWVzW25ld1NlbGVjdGVkTW9udGhdXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy9kYXRhIGV4aXN0cyBmb3IgdGhlIG5ldyBtb250aFxyXG4gICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0oeyB0aXRsZTogJ0NoYW5naW5nIE1vbnRoJywgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIG1vbnRoPyBZb3Ugd2lsbCBiZSBvdmVyd3JpdGluZyBleGlzdGluZyBkYXRhLCBhbmQgYW55IGNoYW5nZXMgeW91IGp1c3QgbWFkZSB3aWxsIGJlIGRpc2NhcmRlZC4nLCBva0J1dHRvblRleHQ6ICdJIFVuZGVyc3RhbmQnLCBjYW5jZWxCdXR0b25UZXh0OiAnTm8nIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSBuZXdTZWxlY3RlZE1vbnRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVEYXRhTW9udGgodGhpcy5tb250aF9uYW1lc1t0aGlzLnNlbGVjdGVkTW9udGhdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKHsgdGl0bGU6ICdDaGFuZ2luZyBNb250aCcsIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHRoZSBtb250aD8gQW55IGNoYW5nZXMgeW91IGp1c3QgbWFkZSB3aWxsIGJlIGRpc2NhcmRlZC4nLCBva0J1dHRvblRleHQ6ICdJIFVuZGVyc3RhbmQnLCBjYW5jZWxCdXR0b25UZXh0OiAnTm8nIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSBuZXdTZWxlY3RlZE1vbnRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVOZXdNb250aCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=