import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { TableComponent } from '../table/table.component';
import { TreeTableComponent } from '../tree-table/tree-table.component';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { ComposeObjectPipe } from '../../core/pipes/compose-object.pipe';



// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    // TableComponent,
    // TreeTableComponent,
    // ComposeObjectPipe
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    TreeTableModule,
    PaginatorModule,
    ButtonModule,
    InputSwitchModule,
    CheckboxModule,
    TooltipModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    RouterModule,
    // TableComponent,
    TreeTableComponent,
    TranslateModule,
    TableModule,
    TreeTableModule,
    ComposeObjectPipe
  ],
  providers: [
    // TableComponent,
    TreeTableComponent,
  ]
})
export class SharedModule { }
