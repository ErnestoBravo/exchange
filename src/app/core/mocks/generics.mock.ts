import { ElementRef } from "@angular/core";

export const MOCK_ROUTER = {
  url: '',
  navigate(commands: any[], extras?: any) {
  },
  getCurrentNavigation() {
    return {
      extras: {
        dueData: {},
        documentType: 'DOCUMENT_TYPE',
        dataDangerousGoods: {
          documents: [
            {
              status: 'DOCUMENT_STATUS_PROVISIONAL'
            }
          ]
        },
        dataDocument: {
          documents: [
            {
              id: 'idDocument'
            }
          ]
        }
      }
    };
  }
};

export const MOCK_AUTH_SERVICE = {
  _Keycloak: {
    tokenParsed: {
      realm_access: {
        roles: [
          'REGISTER_LEAVE#ACCESS',
          'REGISTER_ENTRY#DENY',
          'REGISTER_LEAVE#ADD_CONTINGENCIES',
          'REGISTER_ENTRY#ACCESS',
          'REGISTER_LEAVE#VALIDATE',
          'REGISTERS#ACCESS',
          'REGISTER_LEAVE#DENY',
          'REGISTER_ENTRY#ADD_CONTINGENCIES',
          'REGISTER_ENTRY#VALIDATE'
        ]
      }
    },
    idTokenParsed: {
      localTimeZone: 'Europe/Madrd'
    }
  },
  getemail: () => {
    return 'email';
  },
  getlocale: () => {
    return 'es';
  },
  logout: () => {
    return '';
  },
  getauthorization: () => {
    return;
  },
  getpermissions: () => {
    return;
  },
  getClientes$: () => {
    return {
      subscribe: () => {
      }
    };
  },
  getusername: () => {
    return 'name';
  },
  getname: () => {
    return 'name';
  },
  gettoken: () => {
    return '';
  },
  getsubject: () => {
    return 'user-id-123456';
  }
};

export const MOCK_CONTINGENCY_TYPES = [
  {
    id: 1,
    description: 'PIN_CODE',
    hasRegistration: false,
    hasRemarks: true,
    order: 1
  },
  {
    id: 2,
    description: 'TRUCK_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    order: 2
  },
  {
    id: 3,
    description: 'CONTAINER_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    order: 3
  },
  {
    id: 4,
    description: 'Others',
    hasRegistration: true,
    hasRemarks: false,
    order: 4
  }

];

export const MOCK_CONTINGENCY_LIST = [
  {
    description: 'PIN_CODE',
    registration: null,
    remarks: 'prueba'
  },
  {
    description: 'TRUCK_PLATE',
    registration: 'Camion',
    remarks: 'prueba'
  },
  {
    description: 'CONTAINER_PLATE',
    registration: 'Container',
    remarks: 'prueba'
  },
  {
    description: 'Others',
    registration: 'Otros',
    remarks: 'prueba'
  }
];
export const MOCK_CONTINGENCY_LIST_TYPE = [
  {
    type: 'PIN_CODE',
    registration: null,
    remarks: 'prueba'
  },
  {
    type: 'TRUCK_PLATE',
    registration: 'Camion',
    remarks: 'prueba'
  },
  {
    type: 'CONTAINER_PLATE',
    registration: 'Container',
    remarks: 'prueba'
  },
  {
    type: 'Others',
    registration: 'Otros',
    remarks: 'prueba'
  }
];

export const MOCK_TABLE_LIST = [{
  id: 1,
  atd: '2020-11-26T13:06:25.205+00:00',
  eta: '2020-11-26T13:06:25.205+00:00',
  ideVisit: 'XXX',
  goodsList: [
    {
      reference: 'Referencia Mercancía',
      dangerousGoods: true,
      cooledIndicator: true,
      fullIndicator: false,
      containerPlate: 'Matrícula contenedor',
      iso: 'ISO',
      description: 'Descripción Mercancía',
      goodsType: 'container',
      goodsInfo: {
        unitsNumber: 12,
        weight: null,
        weightVerified: null,
        packageNumber: null
      }
    },
    {
      reference: 'Referencia Mercancía',
      dangerousGoods: false,
      cooledIndicator: false,
      fullIndicator: null,
      containerPlate: null,
      iso: null,
      description: null,
      goodsType: 'general_cargo',
      goodsInfo: {
        unitsNumber: null,
        weight: 33,
        weightVerified: 12,
        packageNumber: 2
      }
    }
  ],
  operationType: ['Prueba'],
  contingencyList: MOCK_CONTINGENCY_LIST,
  comment: ''
}];
export const MOCK_TABLE_LIST_MULTIPLE = [
  {
    id: 1,
    atd: '2020-11-26T13:06:25.205+00:00',
    eta: '2020-11-26T13:06:25.205+00:00',
    ideVisit: 'XXX',
    goodsList: [
      {
        reference: 'Referencia Mercancía',
        dangerousGoods: true,
        cooledIndicator: true,
        fullIndicator: false,
        containerPlate: 'Matrícula contenedor',
        iso: 'ISO',
        description: 'Descripción Mercancía',
        goodsType: 'container',
        goodsInfo: {
          unitsNumber: 12,
          weight: null,
          weightVerified: null,
          packageNumber: null
        }
      },
      {
        reference: 'Referencia Mercancía',
        dangerousGoods: false,
        cooledIndicator: false,
        fullIndicator: null,
        containerPlate: null,
        iso: null,
        description: null,
        goodsType: 'general_cargo',
        goodsInfo: {
          unitsNumber: null,
          weight: 33,
          weightVerified: 12,
          packageNumber: 2
        }
      }
    ],
    operationType: ['Prueba'],
    contingencyList: MOCK_CONTINGENCY_LIST,
    comment: ''
  },
  {
    id: 2,
    atd: '2020-11-26T13:06:25.205+00:00',
    eta: '2020-11-26T13:06:25.205+00:00',
    ideVisit: 'XXX',
    goodsList: [
      {
        reference: 'Referencia Mercancía',
        dangerousGoods: true,
        cooledIndicator: true,
        fullIndicator: false,
        containerPlate: 'Matrícula contenedor',
        iso: 'ISO',
        description: 'Descripción Mercancía',
        goodsType: 'container',
        goodsInfo: {
          unitsNumber: 12,
          weight: null,
          weightVerified: null,
          packageNumber: null
        }
      },
      {
        reference: 'Referencia Mercancía',
        dangerousGoods: false,
        cooledIndicator: false,
        fullIndicator: null,
        containerPlate: null,
        iso: null,
        description: null,
        goodsType: 'general_cargo',
        goodsInfo: {
          unitsNumber: null,
          weight: 33,
          weightVerified: 12,
          packageNumber: 2
        }
      }
    ],
    operationType: ['Prueba'],
    contingencyList: MOCK_CONTINGENCY_LIST,
    comment: ''
  }
];

export const MOCK_ARRAY_DATA = [
  {
    id: 1,
    description: 'PIN_CODE',
    hasRegistration: false,
    hasRemarks: true,
    contingencyOrder: 1
  },
  {
    id: 2,
    description: 'TRUCK_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    contingencyOrder: 2
  },
  {
    id: 3,
    description: 'TRUCK_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    contingencyOrder: 3
  },
  {
    id: 4,
    description: 'TRUCK_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    contingencyOrder: 4
  },
  {
    id: 5,
    description: 'TRUCK_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    contingencyOrder: 5
  },
  {
    id: 6,
    description: 'TRUCK_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    contingencyOrder: null
  },
  {
    id: 7,
    description: 'TRUCK_PLATE',
    hasRegistration: true,
    hasRemarks: true,
    contingencyOrder: null
  }
];

export const MOCK_PARAMS = [
  {
    id: 6,
    name: 'VERSION',
    format: 'String',
    defaultValue: '1.0.0'
  },
  {
    id: 7,
    name: 'TIME_MODAL_CONFIRM',
    format: 'Milliseconds',
    defaultValue: '4000'
  },
  {
    id: 8,
    name: 'SEARCH_PINCODE_NUMBER_ATTEMPS',
    format: 'Number',
    defaultValue: '3'
  },
  {
    id: 9,
    name: 'APPLICATION_DATE_UTC',
    format: 'Boolean',
    defaultValue: 'false'
  }
];

export const MOCKED_CONFG = {
  method: 'get',
  queryString: '?registration=true',
  success: () => {
    return;
  },
  error: () => {
    return;
  }
};

export const MOCKED_CONFIG_GET = {
  method: 'get',
  success: () => {
    return;
  },
  error: () => {
    return;
  }
};

export const MOCK_RESPONSE = [];
export const MOCK_RESPONSE_VALID = {
  head: {
    code: 0,
    description: 'test'
  },
  body: []
};
export const MOCK_RESPONSE_ERROR = {
  header: {
    code: '-1',
    description: 'error text'
  },
  body: null
};

export const MOCK_CONFIG_CONFIRM = {
  icon: 'pi',
  header: 'HEADER',
  message: 'REGISTERS',
  classes: 'extra',
  acceptLabel: 'accept',
  acceptCallBack: () => {
    console.log('');
  },
  rejectLabel: 'reject'
};

// export const MOCK_DIALOG_REF = {
//   close: jasmine.createSpy('close')
// };

export const MOCK_DIALOG_CONFIG = {
  data: {
    message: 'LOADING',
    loading: true
  }
};

export const MOCK_APP_COMPONENT = {
  userPermissions: ['ADSCALE#GET', 'ADSCALE#POST', 'ADSCALE#PUT', 'AUDIT_TRAILS#GET', 'MENU#GET', 'VESSEL#VERIFY', 'VESSEL#GET', 'VESSEL#POST', 'VESSEL#PUT', 'DUE#GET', 'DUE#POST', 'DUE#PUT', 'ADSCALE#CANCEL'],
  calendarLocale: {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Borrar'
  },
  goBackPermission: () => {
    return;
  },
  loadingUXComponent: () => {
  },
  modelToList: () => {
    return [];
  },
  hasPermission: () => {
    return true;
  },
  confirm: () => {
    return;
  },
  logOutPermission: () => {
    return false;
  },
  closeDialog: () => {
    return true;
  },
  errorDialogOpen: () => {
    return {
      close: () => {
      }
    };
  },
  loadingDialogOpen: () => {
    return {
      close: () => {
      },
      destroy: () => {
      }
    };
  },
  dialogOpen: () => {
    return {
      close: () => {
      }
    };
  },
  getUserToken: () => {
    return '';
  },
  getUserName: () => {
    return 'user user';
  },
  getUserMail: () => {
    return 'test@test.com';
  },
  getContainerHeight: () => {
    return 899;
  }
};

export const MOCK_ACTIVATE_ROUTE = {
  snapshot: {
    queryParams: {
      resumeMode: true,
      listMode: 'historic'
    },
    params: {
      id: '0387c888-dd44-4b9b-93af-5daff874afc1',
      resume: 'true',
      dueNumber: '123456',
      idDue: '2',
      documentId: '4',
      type: 'create',
      idDocument: 'idDocument'
    }
  }
};

export const MOCK_USER_GROUPS = [
  {
    name: 'Evaluador'
  }
];

export const MOCK_MENU = {
  main: [
    {
      id: '1',
      label: 'MENU.REGISTERS',
      icon: '../assets/icons/menu_registers.svg',
      url: null,
      routerLink: null,
      routerPath: '/vessel',
      target: null,
      action: null,
      items: [
        {
          id: '2',
          label: 'MENU.VESSEL',
          icon: '',
          url: null,
          routerLink: '/vessel',
          target: null,
          action: null
        },
        {
          id: '4',
          label: 'VESSEL.create',
          icon: '',
          url: '/vessel/create',
          routerLink: null,
          target: '_blank',
          action: null
        }
      ]
    },
    {
      id: '7',
      label: 'MENU.EXTERNAL',
      icon: '../assets/icons/menu_registers.svg',
      url: 'http://www.google.es',
      routerLink: null,
      target: '_blank',
      action: 'closeSubMenu'
    }
  ],
  user: []
};


export const MOCK_AUDIT_TRAIL = {
  user: '000b74f9-a233-4295-9a83-3df22ead6096',
  action: 'LOG_ACTION',
  timestamp: '2021-03-01T10:33:19.768Z'
};


export const MOCK_ROUTES = [
  {
    path: 'registers',
    loadChildren: () => {
    }
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const MOCK_LIB_SERVICE = {
  setUrl: (url) => {
    console.log(url);
  },
  getConfig: () => {
    return {
      subscribe: () => {
      }
    };
  },
  setMyData: (data) => {
    console.log(data);
  },
  getMyData: () => {
    return {
      data: {
        auth_config: {
          urlRedirect: 'http://localhost:4200',
        },
        auth_config_local: {
          urlRedirect: 'http://localhost:4200',
        },
        languajecomponent: {
          langs_: false,
          langs: [
            {
              label: 'Español',
              value: {
                id: 1,
                name: 'Español',
                code: 'es'
              }
            },
            {
              label: 'English',
              value: {
                id: 2,
                name: 'Ingles',
                code: 'en'
              }
            }
          ]
        }
      }
    };
  }
};



export const MOCK_BASE_64 = 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
  'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
  'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
  'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
  'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
  'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
  'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
  'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
  'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
  'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
  'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
  'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
  'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';


export const MOCK_REST_LIST = [
  {
    id: 1,
    name: 'test'
  }
];

export const MOCK_DICCIONARY = {
  en: ['gender_male : male', 'gender_female : female', 'navitagion_type_cabotage : cabotage'],
  es: ['gender_male : male', 'gender_female : female', 'navitagion_type_cabotage : cabotage']
};


export const MOCK_TABLE_COMPONENT = {
  getTablePaginatorReference: () => {
    return {
      changePage: () => {
      }
    }
  }
};

export const MOCK_MODEL_DUMMY = [
  {
    id: 1,
    value: 'dummy_text_01'
  },
  {
    id: 2,
    value: 'dummy_text_02'
  }
];

export const MOCK_DYNAMIC_DIALOG_REF = {
  close: () => { },
  destroy: () => { },
  onClose: () => { },
  onDestroy: () => { }
}





