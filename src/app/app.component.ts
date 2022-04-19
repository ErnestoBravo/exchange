import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { LoggerService } from '@mova/lib-logger';
import { MovarqLanguageService } from '@mova/movarq-language';
import { AuthService, AuthEvents, IAuthEvent } from '@mova/lib-auth';
import { MovarqMenu2SubmenuComponent } from '@mova/movarq-menu2';
import { LibConfigService } from '@mova/lib-config';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { UtilsService } from 'src/app/core/services/utils.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalDialogComponent } from 'src/app/components/modal-dialog/modal-dialog.component';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

export interface AuditTrail {
  user: string;
  action: string;
  timestamp: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('submenu') submenu: Array<MovarqMenu2SubmenuComponent>;
  title = 'Exchange';
  previousUrl = 'exchange_hmi_page_home';

  menu = [];

  logos = ['assets/icons/logo.PNG', 'assets/icons/LOGO_TOPBAR.PNG'];
  /** Auth configuration */
  // tslint:disable-next-line: variable-name
  auth_config: any;
  configLan: any;
  showLangActive: boolean;
  isLogged: boolean;
  clientes$: Observable<IAuthEvent>;
  errorModal = false;
  version = '';
  keycloakName = '_Keycloak';
  translateName = 'translate';
  configModal = {
    loading: false,
    header: null,
    message: null,
    buttons: null
  };
  extraClasses = '';
  filteredItems$: MenuItem[];
  socket;
  stompClient;
  logOut = false;
  userMenu;
  initialPage;
  appPath;
  extraDiccionary;
  dropdownList = {};
  autoCompleteLists = {};
  userName = '';
  userPermissions;

  localeDefault = 'es';

  private searchValueSubject = new Subject<string>();

  private searchValue: string;

  set searchModel(value: string) {
    this.searchValueSubject.next(value);
    this.searchValue = value;
  }

  get searchModel(): string {
    return this.searchValue;
  }

  private subscription: Subscription;
  config: any;

  notifications = 0;

  URL_KEYCLOAK;
  REALM;
  URL_REDIRECT;
  constructor(
    private logger: LoggerService,
    public translate: MovarqLanguageService,
    public auth: AuthService,
    private libconfigService: LibConfigService,
    public router: Router,
    private renderer: Renderer2,
    public confirmationService: ConfirmationService,
    public utils: UtilsService,
    public routing: AppRoutingModule,
    public dialogService: DialogService,
    public httpClient: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {
    // save previous page if exist
    if (location.pathname !== '/') {
      sessionStorage.setItem('INIT_PAGE', location.pathname);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.appPath = event.url;

        const locationRoute = event.urlAfterRedirects.slice(1).replace('/', '_');
        if (this.previousUrl && locationRoute !== '') {
          this.renderer.removeClass(document.body, this.previousUrl);
        }

        if (locationRoute !== '') {
          const currentUrlSlug = 'exchange_hmi_page_' + locationRoute.split('#')[0].split('/')[0].split('?')[0];
          if (currentUrlSlug) {
            this.renderer.addClass(document.body, currentUrlSlug);
          }
          this.previousUrl = currentUrlSlug;
        }
      }
    });
  }

  ngOnInit() {
    // get params
    if (typeof environment !== 'undefined' && environment !== null) {
      const URL = environment.keycloakParams;
      this.getRequest(URL).subscribe((data: any) => {

        if (typeof data !== 'undefined' && data !== null) {
          this.URL_KEYCLOAK = data.keycloakUrl;
          this.REALM = data.realm;
          this.URL_REDIRECT = data.redirectUri;

          this.initializeAPP();
        }
      });
    }
  }

  public getRequest(url) {
    return this.httpClient.get(url);
  }

  public initializeAPP(): void {
    this.isLogged = false;
    this.showLangActive = true;

    this.translate.use(this.localeDefault);
    this.clientes$ = this.auth.getClientes$();
    this.clientes$.subscribe((clientes) => {
      this.event(clientes);

      // get initial page
      this.setInitialPage();
    });
    this.libconfigService.setUrl('assets/configs/configuration.json');
    this.subscription = this.libconfigService.getConfig().subscribe(
      data => {
        const URL_REDIRECT = location.protocol + '//' + location.host;

        this.libconfigService.setMyData(data);
        this.config = this.libconfigService.getMyData();
        this.configLan = this.config.data.languajecomponent.langs;
        this.showLangActive = this.config.data.languajecomponent.langs_;

        // set navigator lang default
        // this.config.data.auth_config_local.locale = lang;
        // set url redirect by location
        if (typeof environment.localHMI === 'undefined' || (typeof environment.localHMI !== 'undefined' && !environment.localHMI)) {
          this.auth_config = this.config.data.auth_config;
          this.auth_config.urlRedirect = this.URL_REDIRECT;
        } else {
          this.config.data.auth_config_local.urlRedirect = URL_REDIRECT;
          this.auth_config = this.config.data.auth_config_local;
        }

        // set url keycloak only for server
        if (typeof this.auth_config !== 'undefined' && this.auth_config !== null && (location.host !== 'localhost:4200'
          || (typeof environment.forceSetKeycloak !== 'undefined' && environment.forceSetKeycloak === true))) {

            console.log("URL KEY CLOACK : "+this.URL_KEYCLOAK)
          this.auth_config.url = this.URL_KEYCLOAK;
          this.auth_config.realm = this.REALM;
        }

      },
      error => {
        this.logger.log('[ERROR CONFIG FILE]');
        this.logger.log(error);
      }
    );

    this.translate.onLangLocaleChange().subscribe(
      data => {
        this.changeDiccionary();
      }
    );
  }

  public changeDiccionary(): void {
    if (typeof this.extraDiccionary !== 'undefined') {
      const CURRENT_LANG = this.translate[this.translateName].store.currentLang;
      const DICCIONARY_CURRENT = this.extraDiccionary[CURRENT_LANG];

      // add server diccionary to local diccionary
      this.addToDiccionary(DICCIONARY_CURRENT);

      // update all dropdownd labels
      this.updateDropDownLists();
    }
  }

  public getDiccionary(): void {
    this.utils.restService('labels', {
      method: 'get',
      error: (err) => {
        this.errorDialogOpen(null);
      }
    }).subscribe(
      (returnData) => {
        if (typeof returnData.body !== 'undefined' && returnData.body !== null) {
          this.extraDiccionary = returnData.body;
        } else {
          this.extraDiccionary = returnData;
        }

        const CURRENT_LANG = this.translate[this.translateName].store.currentLang;
        const DICCIONARY_CURRENT = this.extraDiccionary[CURRENT_LANG];

        // add server diccionary to local diccionary
        this.addToDiccionary(DICCIONARY_CURRENT);
      }
    );
  }

  public addToDiccionary(items): void {
    const CURRENT_LANG = this.translate[this.translateName].store.currentLang;
    const DICCIONARY = this.translate[this.translateName].store.translations[CURRENT_LANG];
    const NAME = 'GENERICS';

    if (typeof DICCIONARY !== 'undefined' && DICCIONARY !== null && typeof items !== 'undefined' && items !== null) {
      items.forEach(element => {
        // set key and value
        const KEY = element.split(' : ')[0];
        const VALUE = element.split(' : ')[1];

        // insert if not exist
        if (typeof DICCIONARY[NAME][KEY] === 'undefined') {
          DICCIONARY[NAME][KEY] = VALUE;
        }
      });
    }
  }

  public setInitialPage(): void {
    let initPage = '';

    this.logger.log('BASE HEREF: ', this.baseHref);

    if (sessionStorage.getItem('INIT_PAGE') !== null) {
      initPage = sessionStorage.getItem('INIT_PAGE');
    }

    if (initPage.split(this.baseHref).length > 1) {
      initPage = initPage.split(this.baseHref)[1];
    }

    // set on routing
    this.routing.setInitialPage(initPage);

    sessionStorage.removeItem('INIT_PAGE');
  }

  public updateDropDownLists(): void {
    Object.keys(this.dropdownList).forEach((key) => {
      this.modelToList(key, this.dropdownList[key].data, this.dropdownList[key].attr, this.dropdownList[key].translate);
    });
  }

  public modelToList(nameList, data, attr, translate): any {
    if (typeof this.dropdownList !== 'undefined') {
      this.dropdownList[nameList] = [];
      if (typeof data !== 'undefined' && data !== null && typeof data.length !== 'undefined') {
        this.dropdownList[nameList] = {
          data,
          attr,
          translate,
          list: []
        };
        let label = '';
        data.forEach(element => {
          label = this.translate.instant('GENERICS.' + element[attr]);

          if (!translate) {
            label = element[attr];
          }

          this.dropdownList[nameList].list.push({
            label,
            value: element.id
          });
        });
      }
      return this.dropdownList[nameList].list;
    } else {
      return [];
    }
  }

  public event(num) {
    this.logger.log('Next num: ' + num._event);

    if (num._event === AuthEvents.AuthEventsSuccess) {
      this.logger.log('AuthEventsSuccess');
      this.auth.getemail();
      this.userName = this.auth.getusername();

      // save user permissions
      this.setUserPermissions();

      if (typeof this.auth !== 'undefined') {
        const locale = this.auth.getlocale();
        if (typeof locale === 'undefined' || locale === null || locale === 'undefined') {
          this.auth.setlocale(this.localeDefault);
        }

        this.logger.log('locale:', this.auth.getlocale());
        this.translate.use(this.auth.getlocale());
      }

      this.isLogged = true;

      this.getDiccionary();

    } else if (num._event === AuthEvents.AuthEventsLogout) {
      this.auth.logout();
    } else if (num._event === AuthEvents.AuthEventsTokenRefreshError) {
      // location.href = 'http://localhost:4200';
      this.logger.log('AuthEventsTokenRefreshError');
    } else if (num._event === AuthEvents.AuthEventsPermissionsChanged) {
      this.logger.log('cliente', num._client);
      this.logger.log('autorizacion:', this.auth.getauthorization('PUT', 'resource1', 'back'));
      const po = this.auth.getpermissions(['back']);
      // console.log('result:', po);
    }
  }

  menuClickHandler(item): void {
    if (typeof item !== 'undefined' && item !== null) {

      if (typeof item.target === 'undefined' || item.target === null || item.target === '_self') {
        this.router.navigate([item.routerLink || item.url]);
      } else if (typeof item.target !== 'undefined' && item.target !== null && item.target === '_blank') {
        window.open(item.routerLink || item.url, '_blank');
      }

      if (typeof item.command !== 'undefined' && item.command !== null) {
        item.command();
      }
    }
  }

  public closeDialog(): void {
    this.errorModal = false;
  }

  public openSubMenu(item): void {
    // set selected submenu items
    this.filteredItems$ = item.items;
  }

  public closeSubMenu(): void {
    if (typeof this.submenu !== 'undefined') {
      this.submenu.forEach((item) => {
        item.close();
      });
    }
  }

  public subMenuButtonsAction(button): void {
    if (button.action !== null) {
      this[button.action]();
    }
  }
  public dialogOpen(config): DynamicDialogRef {
    return this.dialogService.open(ModalDialogComponent, {
      closable: true,
      styleClass: 'success-dialog',
      data: {
        buttons: [{
          label: this.translate.instant('GENERICS.confirm'),
          class: ''
        }],
        header: config.header,
        message: config.message,
        loading: false
      }
    });
  }

  public loadingDialogOpen(message): DynamicDialogRef {
    return this.dialogService.open(ModalDialogComponent, {
      styleClass: 'ui-loading',
      closable: false,
      data: {
        message: message || this.translate.instant('GENERICS.loading'),
        loading: true
      }
    });
  }
  public errorDialogOpen(err): DynamicDialogRef {

    let header = this.translate.instant('GENERICS.error_TITLE');
    let message = this.translate.instant('GENERICS.error');

    if (typeof err !== 'undefined' && err !== null) {
      header = this.translate.instant('GENERICS.error_TITLE');
      message = '';

      if (typeof err.error !== 'undefined' && err.error !== null && typeof err.error.errors !== 'undefined' && err.error.errors !== null) {
        if (err.error.errors.length === 1) {
          err.error.errors.forEach(element => {
            if (element !== null) {
              if (element.indexOf('#') !== -1) {
                const firstError = element.split('#').shift();
                let errors = element.split('#');
                errors.shift();
                errors = errors.map(a => a = this.translate.instant('GENERICS.' + a));
                const msg = this.translate.instant('GENERICS.' + firstError, Object.assign({}, errors));
                message += msg + '\n\n';
              } else {
                const msg = this.translate.instant('GENERICS.' + element);
                message += msg + '\n\n';
              }
            }
          });

        }
      }
    }

    if (message === '') {
      message = this.translate.instant('GENERICS.error');
    }

    // return this.dialogService.open(ModalDialogComponent, {
    //   closable: true,
    //   styleClass: 'error-dialog',
    //   data: {
    //     buttons: [{
    //       label: this.translate.instant('GENERICS.confirm'),
    //       class: ''
    //     }],
    //     header,
    //     message,
    //     loading: false
    //   }
    // });
    return null;
  }

  public logOutPermission(): void {
    this.dialogService.open(ModalDialogComponent, {
      closable: false,
      data: {
        message: this.translate.instant('ERRORS.permissions'),
        loading: false
      }
    });

    setTimeout(() => {
      this.logOut = true;
      this.logOutApp();
    }, 5000);
  }

  public logOutApp() {
    const MSG = this.translate.instant('GENERICS.closeSession');
    const DIALOG = this.loadingDialogOpen(MSG);
    const ITEM_KEYCLOAK = this.auth[this.keycloakName];

    if (typeof ITEM_KEYCLOAK !== 'undefined' && ITEM_KEYCLOAK !== null) {
      const LOG_OUT = {
        token: ITEM_KEYCLOAK.token,
        refreshToken: ITEM_KEYCLOAK.refreshToken,
        idToken: ITEM_KEYCLOAK.idToken
      };

      this.utils.restService('logout', {
        method: 'post',
        params: LOG_OUT,
        error: (err) => {
          // close dialog
          DIALOG.destroy();

          this.errorDialogOpen(null);
        }
      }).subscribe(
        (returnData) => {
          this.auth.logout();
        }
      );
    }
  }

  public confirm(config): void {
    let icon = 'pi pi-times';
    let header = null;
    this.extraClasses = '';
    this.utils.extraClasses = '';

    if (typeof config.icon !== 'undefined' && config.icon !== null) {
      icon = config.icon;
    }

    if (typeof config.header !== 'undefined' && config.header !== null) {
      header = config.header;
    }

    if (typeof config.classes !== 'undefined' && config.classes !== null) {
      this.extraClasses = config.classes;
    }
    const objectConfirmConfig = {
      header,
      key: config.key || 'first',
      message: config.message,
      icon,
      acceptIcon: 'null',
      acceptLabel: config.acceptLabel,
      accept: () => {
        if (config.acceptCallBack) {
          config.acceptCallBack();
        } else {
          return;
        }
      },
      rejectIcon: 'null',
      rejectLabel: config.rejectLabel,
      rejectButtonStyleClass: 'ui-button-outlined',
      reject: () => {
        return;
      }
    };

    if (typeof config.rejectLabel === 'undefined' || config.rejectLabel) {
      objectConfirmConfig.rejectButtonStyleClass = 'ui-button-outlined ui-hidden';
    }

    this.confirmationService.confirm(objectConfirmConfig);
  }

  searchHandler(search: string) {
    console.log('manual search handler');
  }


  public setUserPermissions(): void {
    // console.log('setUserPermissions -> ', this.auth, this.keycloakName, this.auth[this.keycloakName], this.getUserToken());
    this.userPermissions = this.auth[this.keycloakName].tokenParsed.realm_access.roles;
  }

  public getUserName(): any {
    return this.auth.getname();
  }

  public getUserMail(): any {
    return this.auth.getemail();
  }

  public getUserToken(): any {
    return this.auth.gettoken();
  }

  public getUserTokenParsed(): any {
    return this.auth && this.keycloakName && this.auth[this.keycloakName] && this.auth[this.keycloakName].idTokenParsed;
  }

  public filterDropDown(event, list): void {
    if (typeof event !== 'undefined' && event != null) {
      const SEARCH = event.query;

      this.autoCompleteLists[list] = [];
      if (typeof this.dropdownList[list] !== 'undefined' && this.dropdownList[list] !== null
        && typeof this.dropdownList[list].list !== 'undefined' && this.dropdownList[list].list !== null) {
        if (SEARCH !== '') {
          this.dropdownList[list].list.forEach((item) => {
            if (item.label.toLowerCase().indexOf(SEARCH.toLowerCase()) !== -1) {
              this.autoCompleteLists[list].push(item);
            }
          });
        } else {
          this.autoCompleteLists[list] = JSON.parse(JSON.stringify(this.dropdownList[list].list));
        }
      }
    }
  }

  public getUserMenu(): void {
    const QUERY_STRING = '/' + this.auth.getsubject();
    this.utils.restService('user', {
      queryString: QUERY_STRING,
      method: 'get',
      error: () => {
        // show error page
        location.href = '../assets/error.html';
      }
    }).subscribe(
      (data) => {
        if (data !== null && typeof data.body !== 'undefined' && data.body !== null) {
          if (typeof data.body.main !== 'undefined' && data.body.main !== null && data.body.main.length > 0) {
            /** TEMP */
            const TEMP_ID_HOME = 1;
            /** TEMP */
            // get main menu
            this.userMenu = data.body.main;
            // parse items to primeng format
            this.parseUserMenu(this.userMenu, TEMP_ID_HOME);
            // set menu
            this.menu = this.userMenu;
            // get initial page
            //this.getInitialPage();
          } else { // without permissions
            this.logOutPermission();
          }
        }
      }
    );
  }
  public parseUserMenu(list, idHome): void {
    if (typeof list !== 'undefined' && list !== null) {
      list.forEach(element => {
        if (typeof element !== 'undefined' && element !== null) {
          // set initial home page by id
          if (element.id === idHome) {
            this.initialPage = element.routerLink || element.url;
          }
          // set labe by lang
          if (typeof element.label !== 'undefined' && element.label !== null) {
            element.label = this.translate.instant(element.label);
          }
          // set command
          if (typeof element.action !== 'undefined' && element.action !== null) {
            element.command = () => {
              this[element.action]();
            };
          }
          // set attr routerLinkActiveOptions
          element.routerLinkActiveOptions = { exact: true };
          if (typeof element.items !== 'undefined' && element.items !== null) {
            this.parseUserMenu(element.items, idHome);
          }
        }
      });
    }
  }

  viewLoadUnit() {
    this.router.navigate(['loadunit/']);
}
}

