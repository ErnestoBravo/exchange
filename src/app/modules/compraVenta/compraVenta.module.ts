import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { MovarqLanguageModule } from '@mova/movarq-language';
import { InputNumberModule } from 'primeng/inputnumber';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { CompraVentaRoutingModule } from './compraVenta-routing.module';
import { CompraVentaMainComponent } from './compraVenta-main/compraVenta-main.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';


@NgModule({
    declarations: [
        CompraVentaMainComponent
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
        CompraVentaRoutingModule,
        // MovarqLanguageModule.forRoot({ isolate: false }),
        AccordionModule,
        InputTextModule,
        CardModule,
        TabMenuModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },]
})
export class CompraVentaModule {
}