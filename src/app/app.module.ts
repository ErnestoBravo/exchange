import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarkdownModule } from 'ngx-markdown';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabViewModule } from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MovarqMenu2Module } from '@mova/movarq-menu2';
import { CardModule, InputclearboxModule, PopoverModule, SearchboxModule } from '@mova/movarq-commons';
import { LibLoggerModule, LoggerModuleMova, LoggerService, ProvideLoggerModuleConf } from '@mova/lib-logger';
import { MovarqLanguageModule, MovarqLanguageService, ProvideLanguageModuleConf } from '@mova/movarq-language';
import { AuthFactory, AuthService } from '@mova/lib-auth';
import { MovarqAuthModule } from '@mova/movarq-auth';

// iport locales
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeHe from '@angular/common/locales/he';


import { MovarqTopbar2Module } from '@mova/movarq-topbar2';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../app/core/interceptors/token.interceptor';

import { LibStylesModule } from '@mova/lib-styles';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { APP_BASE_HREF } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserModule } from '@angular/platform-browser';


registerLocaleData(localeHe, 'he');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    AppComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    LibStylesModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    LibLoggerModule,
    LoggerModuleMova.forRoot(),
    MovarqLanguageModule,
    MovarqLanguageModule.forRoot({ isolate: false }),
    MovarqAuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    PopoverModule,
    InputclearboxModule,
    ToolbarModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    MovarqTopbar2Module,
    OverlayPanelModule,
    MovarqMenu2Module,
    PanelMenuModule,
    CardModule,
    SearchboxModule,
    ConfirmDialogModule,
    DialogModule,
    DynamicDialogModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    MenubarModule,
    RadioButtonModule,
    InputTextareaModule,
    InputNumberModule
  ],
  entryComponents: [
    ModalDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MovarqLanguageService,
    ConfirmationService,
    DialogService,
    { provide: APP_BASE_HREF, useValue: window['base-href'] },
    { provide: AuthService, useFactory: AuthFactory, deps: [LoggerService] },
    { provide: ProvideLanguageModuleConf, useValue: { _prefix: './assets/i18n/', _suffix: '.json' } },
    { provide: ProvideLoggerModuleConf, useValue: { loggerClass: 'NGX' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}