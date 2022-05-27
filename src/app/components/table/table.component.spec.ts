import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableComponent } from '../table/table.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ConfirmationService } from 'primeng/api';
import { MOCK_AUTH_SERVICE } from 'src/app/core/mocks/generics.mock';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { By } from '@angular/platform-browser';

@Component({
  template: `
  <button type="text" (click)="op1.toggle($event)"></button>
  <button type="text" (click)="op1.toggle($event)"></button>
  <input #potencyProwBOW value="999">
  <input #potencyProwSTERN value="999">
  <p-fileUpload #certificateFiles></p-fileUpload>
  <p-overlayPanel #op1>
      <img src="assets/showcase/images/demo/galleria/galleria1.jpg" alt="Galleria 1" />
  </p-overlayPanel>
  <a (click)="outSideClick()" class="outside-anchor"></a>
  `
})
class BlankComponent { }

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let certificateFiles: FileUpload;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        TableModule,
        PaginatorModule,
        ButtonModule,
        InputSwitchModule,
        HttpClientModule,
        FileUploadModule,
       
      ],
      providers: [
        UtilsService,
        ConfirmationService,
        DeviceDetectorService,
        FileUpload,
        {
          useValue: MOCK_AUTH_SERVICE
        }
      ],
      declarations: [TableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.config = {
      pagination: true,
      paginationType: 'client'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create pagination server', () => {
    component.config = {
      pagination: true,
      paginationType: 'server'
    };
    fixture.detectChanges();

    component.ngOnInit();
  });

  it('should create pagination server for mobile', () => {
    component.isMobile = true;
    component.config = {
      responsive: true,
      pagination: true,
      paginationType: 'server'
    };
    fixture.detectChanges();

    component.ngOnInit();
  });

  it('should call parseCell method with string', () => {
    const COLUMN = { type: 'string' };
    component.utils.parseCell(COLUMN, 'text', false);
  });

  it('should call parseCell method with date string', () => {
    const COLUMN = { type: 'date', format: null };
    component.utils.parseCell(COLUMN, '28/06/2021', false);
  });

  it('should call parseCell method with date', () => {
    const COLUMN = { type: 'date', format: 'DD/MM/YYYY' };
    component.utils.parseCell(COLUMN, new Date(), false);
  });

  it('should call parseCell method with boolean true', () => {
    const COLUMN = { type: 'boolean' };
    component.utils.parseCell(COLUMN, true, false);
  });

  it('should call parseCell method with boolean false', () => {
    const COLUMN = { type: 'boolean' };
    component.utils.parseCell(COLUMN, false, false);
  });

  it('should call onElementSelect method', () => {
    component.isMobile = true;
    component.config.rowAction = () => { };
    component.onElementSelect({ id: 5 }, null);
  });

  it('should call customSort method column ASC', () => {
    component.customSort({ multisortmeta: [{ field: 'DUE', order: 1 }] });
  });

  it('should call customSort method column DESC', () => {
    component.config.customSort = (list) => { };
    component.customSort({ multisortmeta: [{ field: 'DUE', order: 0 }] });
  });

  it('should call getRealSortColumn method column DUE', () => {
    component.config.headers = [
      {
        id: 'DUE',
        orderExtraColumn: 'DUE_REAL'
      },
      {
        id: 'DUE_REAL'
      }
    ];
    component.getRealSortColumn('DUE');
  });

  it('should call getTemplate method with empty model', () => {
    component.model = [];
    fixture.detectChanges();
    component.getTemplate();
  });

  it('should call getTemplate method with none empty model', () => {
    component.model = [{ id: 1 }];
    fixture.detectChanges();
    component.getTemplate();
  });

});
