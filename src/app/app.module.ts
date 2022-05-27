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


// iport locales
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeHe from '@angular/common/locales/he';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../app/core/interceptors/token.interceptor';

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
import {AccordionModule} from 'primeng/accordion';
import {CarouselModule} from 'primeng/carousel';


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
    HttpClientModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ToolbarModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    OverlayPanelModule,
    PanelMenuModule,
    ConfirmDialogModule,
    DialogModule,
    DynamicDialogModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    MenubarModule,
    RadioButtonModule,
    InputTextareaModule,
    InputNumberModule,
    AccordionModule,
    CarouselModule,
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
    ConfirmationService,
    DialogService,
    { provide: APP_BASE_HREF, useValue: window['base-href'] },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

