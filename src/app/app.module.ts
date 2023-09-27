import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QuarModule } from '@altack/quar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocViewComponent } from './doc-view/doc-view.component';
import { ScanQrCodeComponent } from './scan-qr-code/scan-qr-code.component';

import ISO6391 from 'iso-639-1';
import * as config from '.././assets/config/config.json';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ScanQrCodeComponent,
    DocViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuarModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }
    }),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  languages;
  constructor(translate: TranslateService) {

    translate.setDefaultLang('en');
    this.languages = config.languages;
    var installed_languages = [];

    for (let i = 0; i < this.languages.length; i++) {
      installed_languages.push({
        "code": this.languages[i],
        "name": ISO6391.getNativeName(this.languages[i])
      });
    }

    localStorage.setItem('languages', JSON.stringify(installed_languages));
    translate.addLangs(this.languages);

    if (localStorage.getItem('setLanguage') && this.languages.includes(localStorage.getItem('setLanguage'))) {
      translate.use(localStorage.getItem('setLanguage'));

    } else {
      const browserLang = translate.getBrowserLang();
      let lang = this.languages.includes(browserLang) ? browserLang : 'en';
      translate.use(lang);
      localStorage.setItem('setLanguage', lang);
    }
  }
}
