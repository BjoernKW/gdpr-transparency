import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from './main/main.component';
import { ProcessingActivitiesComponent } from './processing-activities/processing-activities.component';
import { MeasuresComponent } from './measures/measures.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { DataImportExportComponent } from './data-import-export/data-import-export.component';

import { registerLocaleData } from '@angular/common';
import localeEN from '@angular/common/locales/en';
import localeDE from '@angular/common/locales/de';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';

registerLocaleData(localeEN);
registerLocaleData(localeDE);

export function HttpLoaderFactory(http: HttpClient) {
  return environment.production ? new TranslateHttpLoader(http, '/gdpr-transparency/assets/i18n/') : new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProcessingActivitiesComponent,
    MeasuresComponent,
    MasterDataComponent,
    DataImportExportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TabViewModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    FontAwesomeModule,
    InputSwitchModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
