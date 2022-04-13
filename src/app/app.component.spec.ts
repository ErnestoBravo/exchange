import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';
import { LoggerService } from '@mova/lib-logger';
import { MovarqLanguageService } from '@mova/movarq-language';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService, AuthEvents } from '@mova/lib-auth';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LibConfigService } from '@mova/lib-config';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { Subscription, of } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import {
  MOCK_APP_COMPONENT, MOCK_AUTH_SERVICE, MOCK_CONFIG_CONFIRM, MOCK_DICCIONARY, MOCK_LIB_SERVICE, MOCK_MENU,
  MOCK_RESPONSE, MOCK_RESPONSE_ERROR, MOCK_ROUTES, MOCK_USER_GROUPS
} from './core/mocks/generics.mock';
import { AppRoutingModule } from './app-routing.module';
import { DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

require('moment-timezone');

@Component({
  template: `
    <div class="test"></div>
    <p-overlayPanel #op1>
      <img src="assets/showcase/images/demo/galleria/galleria1.jpg" alt="Galleria 1"/>
    </p-overlayPanel>
    <a (click)="outSideClick()" class="outside-anchor"></a>
  `
})

class TestOverlayPanelComponent {
  outSideClick() {
  }
}

describe('AppComponent', () => {
  let overlaypanel: OverlayPanel;
  let translate: TranslateService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let httpMock;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        OverlayPanelModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        AppComponent,
        TestOverlayPanelComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/vessel',
            events: of(new NavigationEnd(0, 'http://localhost:4200/vessel', 'http://localhost:4200/users')),
            navigate: jasmine.createSpy('navigate'),
            config: MOCK_ROUTES
          }
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/cp2/'
        },
        {
          provide: Subscription,
          useValue: {
            unsubscribe: () => {
              return;
            }
          }
        },
        {
          provide: AuthService,
          useValue: MOCK_AUTH_SERVICE
        },
        {
          provide: LibConfigService,
          useValue: MOCK_LIB_SERVICE
        },
        DialogService,
        AppRoutingModule,
        ConfirmationService,
        TranslateService,
        MovarqLanguageService,
        {
          provide: AuthEvents,
          useValue: {
            AuthEventsSuccess: 5,
            AuthEventsLogout: 2,
            AuthEventsTokenRefreshError: 4,
            AuthEventsPermissionsChanged: 7
          }
        },
        {
          provide: LoggerService,
          useValue: {
            log: (text) => {
              console.log(text);
            }
          }
        }
      ]
    }).compileComponents();
    router = TestBed.get(Router);
    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(AppComponent);
    httpMock = TestBed.get(HttpTestingController);
    app = fixture.componentInstance;

    const fixtureOverLay = TestBed.createComponent(TestOverlayPanelComponent);
    overlaypanel = fixtureOverLay.debugElement.query(By.css('p-overlayPanel')).componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call ngOnInit method production true', () => {
    spyOn(app, 'getRequest').and.returnValue(of({
      body: MOCK_RESPONSE
    }));
    app.ngOnInit();
  });

  it('should call initializeAPP method production true', () => {
    app.URL_KEYCLOAK = '';
    app.REALM = '';
    app.URL_REDIRECT = '';

    spyOn(MOCK_AUTH_SERVICE, 'getClientes$').and.returnValue(of(MOCK_RESPONSE));
    spyOn(MOCK_LIB_SERVICE, 'getConfig').and.returnValue(of(MOCK_RESPONSE));

    environment.production = true;
    environment.localHMI = false;
    app.initializeAPP();
  });

  it('should call initializeAPP method local true', () => {
    spyOn(MOCK_AUTH_SERVICE, 'getClientes$').and.returnValue(of(MOCK_RESPONSE));
    spyOn(MOCK_LIB_SERVICE, 'getConfig').and.returnValue(of(MOCK_RESPONSE));
    environment.production = false;
    environment.localHMI = true;

    app.initializeAPP();
  });

  it(`should call get searchModel`, () => {
    expect(app.searchModel);
  });

  it(`should call set searchModel`, () => {
    app.searchModel = '42';
    expect(app.searchModel).toBe('42');
  });

  it(`should call setInitialPage method`, () => {
    app.setInitialPage();
  });

  it(`should call event method with AuthEventsSuccess`, () => {
    app.event({ _event: 5 });
  });

  it(`should call event method with AuthEventsTokenRefreshError`, () => {
    expect(app.event({ _event: 4 }));
  });

  it(`should call event method with AuthEventsLogout`, () => {
    expect(app.event({ _event: 2 }));
  });

  it(`should call event method with AuthEventsPermissionsChanged`, () => {
    expect(app.event({ _event: 7 }));
  });

  it(`should call menuClickHandler method without target or command`, () => {
    app.menuClickHandler(MOCK_MENU.main[0]);
  });

  it(`should call menuClickHandler method target blank and command`, () => {
    app.menuClickHandler(MOCK_MENU.main[1]);
  });

  it(`should call menuClickHandler method target self and command`, () => {
    app.menuClickHandler(MOCK_MENU.main[2]);
  });

  it(`should call menuClickHandler method target blank, url and command`, () => {
    app.menuClickHandler(MOCK_MENU.main[3]);
  });

  it(`should call menuClickHandler method without item`, () => {
    app.menuClickHandler(null);
  });

  it(`should call closeDialog method`, () => {
    app.closeDialog();
  });

  it(`should call openSubMenu method`, () => {
    app.openSubMenu({ items: null });
  });

  it(`should call closeSubMenu method`, () => {
    app.closeSubMenu();
  });

  it(`should call subMenuButtonsAction method`, () => {
    const BUTTON = {
      action: 'closeSubMenu'
    };
    app.subMenuButtonsAction(BUTTON);
  });

  it(`should call dialogOpen method`, () => {
    app.dialogOpen({ header: 'header', message: 'message' });
  });

  it(`should call loadingDialogOpen method`, () => {
    app.loadingDialogOpen('MESSAGE');
  });

  it(`should call loadingDialogOpen method without message`, () => {
    app.loadingDialogOpen(null);
  });

  it(`should call errorDialogOpen method`, () => {
    app.errorDialogOpen(null);
  });

  it(`should call errorDialogOpen method with message`, () => {
    app.errorDialogOpen({ error: { errors: ['E001'] } });
  });

  it(`should call logOutPermission method`, () => {
    jasmine.clock().install();  // First install the clock
    app.logOutPermission();
    jasmine.clock().tick(4000);
    // expect(app.logOut).toBeTruthy();
    jasmine.clock().uninstall(); // uninstall clock when done
  });

  it(`should call confirm method accept button`, () => {
    const confirmService = fixture.debugElement.injector.get(ConfirmationService);
    spyOn<any>(confirmService, 'confirm').and.callFake((params: any) => {
      params.accept();
    });
    app.confirm(MOCK_CONFIG_CONFIRM);
    fixture.detectChanges();
  });

  it(`should call searchHandler method`, () => {
    expect(app.searchHandler('test'));
  });

  it(`should call getDiccionary method`, () => {
    spyOn(app.utils, 'restService').and.returnValue(of({
      body: MOCK_DICCIONARY
    }));

    app.getDiccionary();
  });

  it(`should call getDiccionary method`, () => {
    spyOn(app.utils, 'restService').and.returnValue(of(MOCK_DICCIONARY));
    app.getDiccionary();
  });

  it(`should call getDiccionary method with error`, () => {
    spyOn(app.utils, 'restService').and.returnValue(of(MOCK_RESPONSE_ERROR));
    app.getDiccionary();
  });

  it(`should call addToDiccionary method`, () => {
    app.translate['translate'].store.currentLang = 'es';
    app.translate['translate'].store.translations['es'] = {
      GENERICS: {
        test: 'test'
      }
    };

    app.addToDiccionary(MOCK_DICCIONARY['es']);
  });

  it(`should call modelToList method`, () => {
    const DATA = [{ id: 1, description: 'test' }];
    app.modelToList('type', DATA, 'description', false);
  });

  it(`should call modelToList method error`, () => {
    const DATA = [{ id: 1, description: 'test' }];
    app.dropdownList = undefined;
    app.modelToList('type', DATA, 'description', false);
  });

  it(`should call updateDropDownLists method`, () => {
    const DATA = [{ id: 1, description: 'test' }];
    app.dropdownList['type'] = {
      data: DATA,
      attr: 'description',
      translate: false,
      list: []
    };
    app.updateDropDownLists();
  });


  it(`should call changeDiccionary method`, () => {
    app.userMenu = JSON.parse(JSON.stringify(MOCK_MENU));
    app.extraDiccionary = { es: [], en: [] };
    app.changeDiccionary();
  });

  it(`should call filterDropDown method empty list`, () => {
    app.filterDropDown({ query: '' }, 'name');
  });







  it(`should call logOutApp method`, () => {
    spyOn(app.utils, 'restService').and.returnValue(of({
      response: ''
    }));

    fixture.detectChanges();
    app.logOutApp();
  });

  it(`should call logOutApp method with error`, () => {
    spyOn(app.utils, 'restService').and.returnValue(of(MOCK_RESPONSE_ERROR));
    fixture.detectChanges();
    app.logOutApp();
  });

  it(`should call filterDropDown method with text`, () => {
    app.dropdownList = {
      name: {
        list: [
          {
            label: 'task'
          }
        ]
      }
    };
    app.filterDropDown({ query: '' }, 'name');
  });

  it(`should call filterDropDown method with text`, () => {
    app.dropdownList = {
      name: {
        list: [
          {
            label: 'task'
          }
        ]
      }
    };
    app.filterDropDown({ query: 'a' }, 'name');
  });

  it(`should call getUserToken method`, () => {
    app.getUserToken();
  });

  it(`should call getUserName method`, () => {
    app.getUserName();
  });

  it(`should call getUserMail method`, () => {
    app.getUserMail();
  });

  it(`should call getUserMenu method`, () => {
    spyOn(app.utils, 'restService').and.returnValue(of({
      body: MOCK_MENU
    }));
    fixture.detectChanges();
    app.getUserMenu();
  });

  it(`should call getUserMenu method without data menu`, () => {
    const returnData = JSON.parse(JSON.stringify(MOCK_MENU));
    returnData.main = [];
    spyOn(app.utils, 'restService').and.returnValue(of({
      body: returnData
    }));
    app.getUserMenu();
  });

  it(`should call getUserMenu method with error`, () => {
    spyOn(app.utils, 'restService').and.returnValue(of({
      header: {
        code: '-1',
        description: 'error text'
      },
      body: null
    }));
    app.getUserMenu();
  });

  it(`should call parseUserMenu method idHome = 2`, () => {
    const TEMP_ID_HOME = '2';
    app.menu = MOCK_MENU.main;
    fixture.detectChanges();
    app.parseUserMenu(app.menu, TEMP_ID_HOME);
  });

  it(`should call parseUserMenu method idHome = 4`, () => {
    const TEMP_ID_HOME = '4';
    app.parseUserMenu(MOCK_MENU.main, TEMP_ID_HOME);
  });

  it(`should call parseUserMenu method idHome = 100`, () => {
    const TEMP_ID_HOME = '100';
    app.parseUserMenu(MOCK_MENU.main, TEMP_ID_HOME);
  });

  it(`should call parseUserMenu method without idHome`, () => {
    app.parseUserMenu(app.menu, null);
  });


});