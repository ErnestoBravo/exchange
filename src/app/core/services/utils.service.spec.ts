import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { UtilsService } from './utils.service';
// import { AuthService, AuthEvents } from '@mova/lib-auth';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MOCK_ARRAY_DATA, MOCK_AUTH_SERVICE, MOCK_BASE_64, MOCK_PARAMS, MOCK_REST_LIST } from 'src/app/core/mocks/generics.mock';
import { of } from 'rxjs';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService } from 'primeng/api';

describe('UtilsService', () => {
  let service: UtilsService;
  const FORM_BUILDER: FormBuilder = new FormBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        // TranslateModule.forRoot({
        //   loader: {
        //     provide: TranslateLoader,
        //     useFactory: (http: HttpClient) => {
        //       return new TranslateHttpLoader(http);
        //     },
        //     deps: [HttpClient]
        //   }
        // }),
      ],
      providers: [
        HttpHandler,
        HttpClient,
        ConfirmationService,
        {
          // provide: AuthService,
          useValue: MOCK_AUTH_SERVICE
        },
        {
          provide: FormBuilder,
          useValue: FORM_BUILDER
        },
        {
          // provide: AuthEvents,
          useValue: {
            AuthEventsSuccess: 5,
            AuthEventsLogout: 2,
            AuthEventsTokenRefreshError: 4,
            AuthEventsPermissionsChanged: 7
          }
        }
      ]
    });

    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call parseDate', () => {
    expect(service.parseDate('2020-11-25T09:21:35.830+0000', 'DD/mm/YYYY', false)).toString();
  });

  it('parseDate with null timeStamp', () => {
    expect(service.parseDate(null, 'DD/mm/YYYY', false)).toString();
  });

  it('parseDate utc', () => {
    expect(service.parseDate(null, 'DD/mm/YYYY', true)).toString();
  });

  it('should call setParams', () => {
    expect(service.setParams(MOCK_PARAMS));
  });

  it('should call getPageHeight method', () => {
    service.getPageHeight();
  });

  it('should call setTimeZone method', () => {
    sessionStorage.setItem('KEYCLOACK_TIMEZONE', 'true');
    sessionStorage.setItem('TIMEZONE', 'Europe/Madrid');

    service.setTimeZone();
  });

  it('should call setTimeZone method without sessionStorage', () => {
    sessionStorage.removeItem('KEYCLOACK_TIMEZONE');
    sessionStorage.removeItem('TIMEZONE');
    service.setTimeZone();
  });

  it('should call getParam milliseconds', () => {
    service.setParams(MOCK_PARAMS);
    expect(service.getParam('TIME_MODAL_CONFIRM', null));
  });

  it('should call getParam string', () => {
    service.setParams(MOCK_PARAMS);
    expect(service.getParam('VERSION', null));
  });

  it('should call getParam numbers', () => {
    service.setParams(MOCK_PARAMS);
    expect(service.getParam('SEARCH_PINCODE_NUMBER_ATTEMPS', null));
  });

  it('should call getParam numbers and default', () => {
    service.setParams(MOCK_PARAMS);
    expect(service.getParam('TEST', 'TEST'));
  });

  it('should call getParam boolean', () => {
    service.setParams(MOCK_PARAMS);
    expect(service.getParam('APPLICATION_DATE_UTC', null));
  });

  it('should call restService widthout config', () => {
    expect(service.restService('registration', undefined));
  });

  it('should order array', () => {
    MOCK_ARRAY_DATA.multipleSortNatural(MOCK_ARRAY_DATA, ['contingencyOrder']);
  });

  it('should reverse order array', () => {
    MOCK_ARRAY_DATA.multipleSortNatural(MOCK_ARRAY_DATA, ['-contingencyOrder']);
  });

  it('should reverse array without field', () => {
    MOCK_ARRAY_DATA[0].contingencyOrder = undefined;
    MOCK_ARRAY_DATA.multipleSortNatural(MOCK_ARRAY_DATA, ['-contingencyOrder']);
  });

  it('should reverse array without field', () => {
    MOCK_ARRAY_DATA[0].contingencyOrder = undefined;
    MOCK_ARRAY_DATA.multipleSortNatural(MOCK_ARRAY_DATA, ['contingencyOrder']);
  });

  it('should call transformData method', () => {
    const DATA = {
      text1: 'texto',
      text2: 2,
      number1: 'texto',
      number2: 25,
      number3: '25.33',
      number4: '25,12'
    };

    const STRING_LIST = ['text1', 'text2'];
    const NUMBER_LIST = ['number1', 'number2', 'number3', 'number4'];

    service.transformData(DATA, STRING_LIST, NUMBER_LIST);
  });

  it('should call getAutocompleteValue method', () => {
    const FORM_CONTROL = FORM_BUILDER.group({
      test: []
    });
    const MODEL = [{ id: 1, value: 'Test' }];
    FORM_CONTROL.controls.test.setValue({ label: 'test', value: 1 });

    service.getAutocompleteValue(FORM_CONTROL.controls, 'test', MODEL, null);
  });

  it('should call getAutocompleteValue method by id', () => {
    const FORM_CONTROL = FORM_BUILDER.group({
      test: []
    });
    const MODEL = [{ id: 1, value: 'Test' }];
    FORM_CONTROL.controls.test.setValue({ label: 'test', value: 1 });

    service.getAutocompleteValue(FORM_CONTROL.controls, 'test', MODEL, true);
  });

  it('should call loadList method', () => {
    spyOn(service, 'restService').and.returnValue(of({
      body: MOCK_REST_LIST
    }));

    service.loadList('name', () => {
      return MOCK_REST_LIST;
    });
  });

  it('should call loadList method with error', () => {
    spyOn(service, 'restService').and.returnValue(of({
      error: {}
    }));

    service.loadList('name', () => {
      return MOCK_REST_LIST;
    });
  });

  it('should call getDropdownValue method', () => {
    const CONTROLER = {
      name: {
        value: {
          label: 'pepe',
          value: 1
        }
      }
    };

    service.getDropdownValue(CONTROLER, 'name', false, true);
  });

  it('should call dataToFinalFormat method', () => {
    service.dataToFinalFormat('22/10/2021 - 15:40', true);
  });

  it('should call updateDropDownLists method', () => {
    service.dropdownList = {
      name: {
        data: [{ id: 1, value: 'texto' }]
      }
    };
    service.updateDropDownLists();
  });

  it('should call modelToList method', () => {
    service.dropdownList = {
      name: {
        data: [{ id: 1, value: 'texto' }]
      }
    };
    service.modelToList('name', [{ id: 1, value: 'texto' }], 'value', true);
  });

  it('should call setValidData method limiterONEDecimal', () => {
    const FORM_CONTROL = FORM_BUILDER.group({
      test: []
    });

    FORM_CONTROL.controls.test.setValue(99.99);
    service.setValidData(FORM_CONTROL, 'test', 'limiterONEDecimal');
  });

  it('should call setValidData method limiterTWODecimal', () => {
    const FORM_CONTROL = FORM_BUILDER.group({
      test: []
    });

    FORM_CONTROL.controls.test.setValue(99.99);
    service.setValidData(FORM_CONTROL, 'test', 'limiterTWODecimal');
  });

  it('should call setValidData method max', () => {
    const FORM_CONTROL = FORM_BUILDER.group({
      test: [null, Validators.max(99)]
    });

    FORM_CONTROL.controls.test.setValue(99.99);
    service.setValidData(FORM_CONTROL, 'test', 'limiterTWODecimal');
  });

  it('should call parseCell method boolean true', () => {
    const COLUMN = { type: 'boolean' };
    expect(service.parseCell(COLUMN, true, false)).not.toBeNull();
  });

  it('should call parseCell method boolean false', () => {
    const COLUMN = { type: 'boolean' };
    expect(service.parseCell(COLUMN, false, false)).not.toBeNull();
  });

  it('should call filterDropDown method', () => {
    service.dropdownList = {
      name: {
        list: [{ id: 1, label: 'texto' }]
      }
    };
    service.filterDropDown({ query: 'text' }, 'name');
  });

  it('should call openDocument method', () => {
    const DATA = {
      file: [{
        base64: 'data:application/pdf;base64,' + MOCK_BASE_64
      }]
    };
    service.openDocument(DATA);
  });

  it(`should call loadingUXComponent method with true`, () => {
    service.loadingUXComponent(true);
  });

  it(`should call loadingUXComponent method with false`, () => {
    service.loadingUXComponent(false);
  });

  it(`should call loadingUXComponent method with null`, () => {
    service.loadingUXComponent(null);
  });

});
