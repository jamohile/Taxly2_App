import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule, navigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {LoginComponent} from "./pages/login/login.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import {NativeScriptUIListViewModule} from "nativescript-telerik-ui/listview/angular";
import { DropDownModule } from "nativescript-drop-down/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUIListViewModule,
        DropDownModule
    ],
    declarations: [
        AppComponent,
        ...navigatableComponents
    ],
    providers: [

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
