import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProgressBarModule } from 'angular-progress-bar';
import { NgxAnimateCssGridModule } from 'ngx-animate-css-grid';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

import {IMaskModule} from 'angular-imask';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreditConveyorComponent } from './pages/credit-conveyor/credit-conveyor.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { MainComponent } from './pages/main/main.component';
import { ConveyorTableComponent } from './pages/credit-conveyor/components/conveyor-table/conveyor-table.component';
import { PagerComponent } from './components/shared/pager/pager.component';
import { SearchPageComponent } from './pages/credit-conveyor/components/msb-credits/search-page/search-page.component';
import { MsbCreditsComponent } from './pages/credit-conveyor/components/msb-credits/msb-credits.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ListPageComponent } from './pages/credit-conveyor/components/msb-credits/list-page/list-page.component';
import { StatementPageComponent } from './pages/credit-conveyor/components/msb-credits/statement-page/statement-page.component';
import { ApplicationInfoComponent } from './pages/credit-conveyor/components/msb-credits/application-info/application-info.component';
import { QuestionnairePageComponent } from './pages/credit-conveyor/components/msb-credits/questionnaire-page/questionnaire-page.component';
import { DecisionsPageComponent } from './pages/credit-conveyor/components/msb-credits/decisions-page/decisions-page.component';
import { ConclusionsPageComponent } from './pages/credit-conveyor/components/msb-credits/conclusions-page/conclusions-page.component';
import { MsbCardDialogComponent } from './pages/credit-conveyor/components/msb-credits/msb-card-dialog/msb-card-dialog.component';
import { MsbCardComponent } from './pages/credit-conveyor/components/msb-credits/msb-card/msb-card.component';
import { FormFieldComponent } from './components/form/form-field/form-field.component';
import { FilesPageComponent } from './pages/credit-conveyor/components/msb-credits/files-page/files-page.component';
import { DownloadDialogComponent } from './pages/credit-conveyor/components/msb-credits/files-page/download-dialog/download-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {FileUploadModule} from "ng2-file-upload";
import { LoginComponent } from './pages/login/login.component';
import { ContentComponent } from './pages/content/content.component';
import { MsbDocumentsDialogComponent } from './pages/credit-conveyor/components/msb-credits/msb-documents-dialog/msb-documents-dialog.component';
import { DocumentListComponent } from './pages/credit-conveyor/components/msb-credits/files-page/document-list/document-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CreditConveyorComponent,
    NotificationsComponent,
    MainComponent,
    ConveyorTableComponent,
    PagerComponent,
    SearchPageComponent,
    MsbCreditsComponent,
    BreadcrumbComponent,
    ListPageComponent,
    StatementPageComponent,
    ApplicationInfoComponent,
    QuestionnairePageComponent,
    DecisionsPageComponent,
    ConclusionsPageComponent,
    MsbCardDialogComponent,
    MsbCardComponent,
    FormFieldComponent,
    FilesPageComponent,
    DownloadDialogComponent,
    LoginComponent,
    ContentComponent,
    MsbDocumentsDialogComponent,
    DocumentListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    ProgressBarModule,
    NgxAnimateCssGridModule,
    MatDialogModule,
    MatMenuModule,
    AngularMyDatePickerModule,
    IMaskModule,
    MatTooltipModule,
    FileUploadModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
