import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AuthModule} from './pages/auth/auth.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {JwtInterceptor} from "./shared/helper/jwt.interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        SharedModule,
        AuthModule,
        DashboardModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        MatCardModule,
        MatButtonModule,
        FormsModule,
        MatTooltipModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
