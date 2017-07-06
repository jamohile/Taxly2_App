import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {MonthComponent} from "./pages/month/month.component";
import {FieldComponent} from "./pages/fields/fields.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent},
    { path: "month/:month", component: MonthComponent},
    { path: "fields/:month", component: FieldComponent}
];
export const navigatableComponents = [
    LoginComponent,
    DashboardComponent,
    MonthComponent,
    FieldComponent

]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }