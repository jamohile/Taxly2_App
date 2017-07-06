"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var color_1 = require("color");
var user_1 = require("../../shared/user/user");
var user_service_1 = require("../../shared/user/user.service");
var LoginComponent = (function () {
    function LoginComponent(router, userService, page) {
        this.router = router;
        this.userService = userService;
        this.page = page;
        this.isSigningUp = false;
        this.user = new user_1.User;
        this.user.email = "jamohile@gmail.com";
        this.user.password = "abc";
    }
    LoginComponent.prototype.submit = function () {
        var _this = this;
        if (this.isSigningUp) {
            //handle a new registration
            this.userService.signUp(this.user, function () {
                alert('Your account was succesfully created');
            }, function (status) {
                switch (status) {
                    case 409:
                        alert('An account with that email already exists.');
                        break;
                    case 500:
                        alert("Sorry, our servers aren't available at the moment.");
                }
            });
        }
        else {
            //handle a sign in
            this.userService.signIn(this.user, function () {
                _this.router.navigate(["/dashboard"]);
            }, function (status) {
                switch (status) {
                    case 401:
                        alert('Sorry, those credentials are incorrect.');
                        break;
                    case 500:
                        alert("Sorry, our servers aren't available at the moment.");
                        break;
                }
            });
        }
    };
    LoginComponent.prototype.toggle = function () {
        this.isSigningUp = !this.isSigningUp;
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.page.backgroundColor = new color_1.Color("white");
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "taxly",
        providers: [user_service_1.UserService],
        templateUrl: "pages/login/login.html",
        styleUrls: ["pages/login/login-common.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, page_1.Page])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFDL0IsK0JBQThCO0FBRTlCLCtDQUE4QztBQUM5QywrREFBNkQ7QUFTN0QsSUFBYSxjQUFjO0lBR3ZCLHdCQUFvQixNQUFjLEVBQVUsV0FBd0IsRUFBVSxJQUFVO1FBQXBFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFEeEYsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUNELCtCQUFNLEdBQU47UUFBQSxpQkE2QkM7UUE1QkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQy9CLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBQ2xELENBQUMsRUFBRSxVQUFDLE1BQWE7Z0JBQ2IsTUFBTSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztvQkFDWCxLQUFLLEdBQUc7d0JBQ0osS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7d0JBQ3BELEtBQUssQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ0osS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7Z0JBQ3BFLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxFQUFFLFVBQUMsTUFBYTtnQkFDYixNQUFNLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO29CQUNYLEtBQUssR0FBRzt3QkFDSixLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQzt3QkFDakQsS0FBSyxDQUFDO29CQUNWLEtBQUssR0FBRzt3QkFDSixLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQzt3QkFDNUQsS0FBSyxDQUFDO2dCQUNsQixDQUFDO1lBQ0QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUNELCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDO0FBN0NZLGNBQWM7SUFQMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFDeEIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztLQUM5QyxDQUFDO3FDQUs4QixlQUFNLEVBQXVCLDBCQUFXLEVBQWdCLFdBQUk7R0FIL0UsY0FBYyxDQTZDMUI7QUE3Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3VzZXIvdXNlclwiO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidGF4bHlcIixcclxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcclxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHVzZXI6IFVzZXI7XHJcbiAgICBpc1NpZ25pbmdVcCA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgcGFnZTogUGFnZSkge1xyXG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyO1xyXG4gICAgICAgIHRoaXMudXNlci5lbWFpbCA9IFwiamFtb2hpbGVAZ21haWwuY29tXCI7XHJcbiAgICAgICAgdGhpcy51c2VyLnBhc3N3b3JkID0gXCJhYmNcIjtcclxuICAgIH1cclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1NpZ25pbmdVcCkge1xyXG4gICAgICAgICAgICAvL2hhbmRsZSBhIG5ldyByZWdpc3RyYXRpb25cclxuICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5zaWduVXAodGhpcy51c2VyLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnWW91ciBhY2NvdW50IHdhcyBzdWNjZXNmdWxseSBjcmVhdGVkJyk7XHJcbiAgICAgICAgICAgIH0sIChzdGF0dXM6bnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0FuIGFjY291bnQgd2l0aCB0aGF0IGVtYWlsIGFscmVhZHkgZXhpc3RzLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJTb3JyeSwgb3VyIHNlcnZlcnMgYXJlbid0IGF2YWlsYWJsZSBhdCB0aGUgbW9tZW50LlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9oYW5kbGUgYSBzaWduIGluXHJcbiAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2Uuc2lnbkluKHRoaXMudXNlciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2Rhc2hib2FyZFwiXSk7XHJcbiAgICAgICAgICAgIH0sIChzdGF0dXM6bnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQwMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1NvcnJ5LCB0aG9zZSBjcmVkZW50aWFscyBhcmUgaW5jb3JyZWN0LicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJTb3JyeSwgb3VyIHNlcnZlcnMgYXJlbid0IGF2YWlsYWJsZSBhdCB0aGUgbW9tZW50LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9nZ2xlKCkge1xyXG4gICAgICAgIHRoaXMuaXNTaWduaW5nVXAgPSAhdGhpcy5pc1NpZ25pbmdVcDtcclxuICAgIH1cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCJ3aGl0ZVwiKTtcclxuICAgIH1cclxufSJdfQ==