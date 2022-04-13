import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '@mova/lib-auth';
import { DeviceDetectorService } from 'ngx-device-detector';

import { TreeTableComponent } from './tree-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MOCK_AUTH_SERVICE } from 'src/app/core/mocks/generics.mock';

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeTableComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        UtilsService,
        ConfirmationService,
        DeviceDetectorService,
        {
          provide: AuthService,
          useValue: MOCK_AUTH_SERVICE
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTableComponent);
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

  it('should call customSort method column ASC', () => {
    component.customSort({ multisortmeta: [{ field: 'DUE', order: 1 }] });
  });

  it('should call getTemplate method with empty model', () => {
    component.model = [];
    fixture.detectChanges();
    component.getTemplate();
  });

  it('should call onElementSelect method', () => {
    component.isMobile = true;
    component.config.rowAction = () => { };
    component.onElementSelect({ id: 5 }, null);
  });

});
