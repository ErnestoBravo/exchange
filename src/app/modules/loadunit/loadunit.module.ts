import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MovarqLanguageModule } from '@mova/movarq-language';
import { InputNumberModule } from 'primeng/inputnumber';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { OperationRoutingModule } from './loadunit-routing.module';
import { LoadUnitMaintainerComponent } from './loadunit-maintainer/loadunit-maintainer.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CreateModifyLoadUnitComponent } from './create-modify-loadunit/create-modify-loadunit.component';
import { ViewLoadUnitComponent } from './view-loadunit/view-loadunit.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';

@NgModule({
    declarations: [
        LoadUnitMaintainerComponent,
        CreateModifyLoadUnitComponent,
        ViewLoadUnitComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        CalendarModule,
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        CheckboxModule,
        InputNumberModule,
        DropdownModule,
        OperationRoutingModule,
        MovarqLanguageModule.forRoot({ isolate: false }),
        AccordionModule,
        InputTextModule,
        CardModule,
    ],
    entryComponents: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },]
})
export class LoadUnitModule {
}