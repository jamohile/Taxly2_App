"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var config_1 = require("../config");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    //returns an observable response
    UserService.prototype.signIn = function (user, valid, invalid) {
        var headers = new http_1.Headers;
        headers.append("Content-Type", "application/json");
        this.http.post(config_1.Config.url + "users/signin", JSON.stringify({
            email: user.email,
            password: user.password
        }), { headers: headers }).toPromise().then(function (response) {
            config_1.Config.token = response.headers.get('auth_token');
            config_1.Config.user = user;
            valid();
        }, function (response) {
            invalid(response.status);
        });
    };
    UserService.prototype.signUp = function (user, successful, unsuccesful) {
        var headers = new http_1.Headers;
        headers.append("Content-Type", "application/json");
        this.http.post(config_1.Config.url + "users/signup", JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password
        }), { headers: headers }).toPromise().then(function (response) {
            //registration was successful
            successful();
        }, function (response) {
            //registration was unsuccesful
            unsuccesful(response.status);
        });
    };
    UserService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCw4QkFBcUM7QUFHckMsb0NBQW1DO0FBSW5DLElBQWEsV0FBVztJQUNwQixxQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBQ25DLGdDQUFnQztJQUNoQyw0QkFBTSxHQUFOLFVBQU8sSUFBVSxFQUFFLEtBQWdCLEVBQUUsT0FBK0I7UUFDaEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUM7UUFDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDVixlQUFNLENBQUMsR0FBRyxHQUFHLGNBQWMsRUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxFQUNGLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUN2QixDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQWlCO1lBQ2pDLGVBQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbEQsZUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUM7UUFDWixDQUFDLEVBQUUsVUFBQyxRQUFpQjtZQUNqQixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDRCQUFNLEdBQU4sVUFBTyxJQUFTLEVBQUUsVUFBcUIsRUFBRSxXQUFtQztRQUN4RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQztRQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNWLGVBQU0sQ0FBQyxHQUFHLEdBQUcsY0FBYyxFQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQixDQUFDLEVBQ0YsRUFBQyxPQUFPLEVBQUcsT0FBTyxFQUFDLENBQ3RCLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBaUI7WUFDakMsNkJBQTZCO1lBQzdCLFVBQVUsRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxVQUFDLFFBQWlCO1lBQ2pCLDhCQUE4QjtZQUM5QixXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELGtDQUFZLEdBQVosVUFBYSxLQUFlO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksV0FBVztJQUZ2QixpQkFBVSxFQUFFO3FDQUdpQixXQUFJO0dBRHJCLFdBQVcsQ0E0Q3ZCO0FBNUNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vdXNlclwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcblxyXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuICAgIC8vcmV0dXJucyBhbiBvYnNlcnZhYmxlIHJlc3BvbnNlXHJcbiAgICBzaWduSW4odXNlcjogVXNlciwgdmFsaWQ6KCkgPT4gdm9pZCwgaW52YWxpZD86KGVycm9yOm51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnM7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICBDb25maWcudXJsICsgXCJ1c2Vycy9zaWduaW5cIixcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgeyBoZWFkZXJzOiBoZWFkZXJzIH1cclxuICAgICAgICApLnRvUHJvbWlzZSgpLnRoZW4oKHJlc3BvbnNlOlJlc3BvbnNlKSA9PntcclxuICAgICAgICAgICAgQ29uZmlnLnRva2VuID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2F1dGhfdG9rZW4nKTtcclxuICAgICAgICAgICAgQ29uZmlnLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB2YWxpZCgpO1xyXG4gICAgICAgIH0sIChyZXNwb25zZTpSZXNwb25zZSkgPT57XHJcbiAgICAgICAgICAgIGludmFsaWQocmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNpZ25VcCh1c2VyOlVzZXIsIHN1Y2Nlc3NmdWw6KCkgPT4gdm9pZCwgdW5zdWNjZXNmdWw6KHN0YXR1czpudW1iZXIpID0+IHZvaWQpe1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnM7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICAgICAgICBDb25maWcudXJsICsgXCJ1c2Vycy9zaWdudXBcIixcclxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAge2hlYWRlcnMgOiBoZWFkZXJzfVxyXG4gICAgICAgICkudG9Qcm9taXNlKCkudGhlbigocmVzcG9uc2U6UmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgLy9yZWdpc3RyYXRpb24gd2FzIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgc3VjY2Vzc2Z1bCgpO1xyXG4gICAgICAgIH0sIChyZXNwb25zZTpSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAvL3JlZ2lzdHJhdGlvbiB3YXMgdW5zdWNjZXNmdWxcclxuICAgICAgICAgICAgdW5zdWNjZXNmdWwocmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcclxuICAgIH1cclxufSJdfQ==