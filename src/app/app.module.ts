import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerifyModule } from 'vc-verification';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { VerifyCertificateComponent } from './verify-certificate/verify-certificate.component';
import { LoginComponent } from './login/login.component';
import { BenefitComponent } from './benefit/benefit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// let baseConfig = require('../assets/config/config.json')

// let configData = {
//   baseUrl: baseConfig['baseUrl']
// }

let configData = {
  baseUrl: `${environment.baseUrl}/auth`
}



@NgModule({
  declarations: [
    AppComponent,
    VerifyCertificateComponent,
    LoginComponent,
    BenefitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VerifyModule.forChild(configData),
    ZXingScannerModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
