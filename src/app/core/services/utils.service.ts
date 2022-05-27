import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AuthService } from '@mova/lib-auth';
import * as moment from 'moment';
import 'moment-timezone';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
// import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
declare global {
  interface Array<T> {
    multipleSortNatural(data, columns);
  }
}

if (!Array.prototype.multipleSortNatural) {
  Array.prototype.multipleSortNatural = (data, columns) => {
    const NUMBER_GROUPS = /(-?\d*\.?\d+)/g;

    const naturalSort = (a, b, columnname, reverse) => {
      let aField1 = a[columnname];
      let bField1 = b[columnname];
      let aa;
      let bb;

      const collator = Intl.Collator(['es-ES'], {
        numeric: true,
        sensitivity: 'base',
        usage: 'sort'
      });


      // undefined, null and white values are the same
      if (typeof aField1 === 'undefined') {
        aField1 = a;
      } else if (aField1 === null || aField1 === '') {
        aField1 = '-1';
      }

      if (typeof bField1 === 'undefined') {
        bField1 = b;
      } else if (bField1 === null || bField1 === '') {
        bField1 = '-1';
      }

      aa = String(aField1).split(NUMBER_GROUPS);
      bb = String(bField1).split(NUMBER_GROUPS);

      if (reverse === 1) {
        return collator.compare(aa, bb) * (-1 * reverse);
      } else {
        return collator.compare(aa, bb);
      }
    };

    data.sort((a, b) => {
      let result;
      let reverse = -1;

      for (let column of columns) {
        reverse = -1;

        if (column[0] === '-') {
          column = column.substring(1);
          reverse = 1;
        }

        result = naturalSort(a, b, column, reverse);
        if (result !== 0) {
          return result;
        }
      }
      // If both are exactly the same
      return 0;
    });
  };
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public params = null;
  public contingencies = null;
  public timeZone = 'Europe/Madrid';
  public keycloak;
  public es;
  public tablePaginator = {};
  public maxFileSize = 10490000; // 10.00 MB
  public extraClasses = '';
  public defaultNumResults = 10;
  public rowsPerPage = [1, 5, 10, 25, 50];
  dropdownList = {};
  autoCompleteLists = {};
  isLoading = false;
  dataFile$ = new ReplaySubject<any>();
  auth: any;
  translate: any;

  constructor(
    public http: HttpClient,
    // private auth: AuthService,
    // public translate: TranslateService,
    public confirmationService: ConfirmationService
  ) {
  }

  public setTimeZone(): void {

    if (sessionStorage.getItem('TIMEZONE') === null || sessionStorage.getItem('KEYCLOACK_TIMEZONE') === null) {
      this.timeZone = this.getParam('LOCAL_TIME_ZONE', 'Europe/Madrid');
      sessionStorage.setItem('TIMEZONE', this.timeZone);
    } else {
      this.timeZone = sessionStorage.getItem('TIMEZONE');
    }
  }

  public getParam(name: string, byDefault: any) {
    let value = null;

    if (typeof this.params !== 'undefined' && this.params !== null) {
      this.params.forEach(element => {
        if (typeof element.name !== 'undefined' && element.name === name) {
          value = element.defaultValue;

          if (element.format.toLowerCase() === 'milliseconds' || element.format.toLowerCase() === 'number') {
            value = parseInt(value, 10);
          }

          if (element.format.toLowerCase() === 'boolean') {
            value = (value === 'true' || value === true);
          }
        }
      });

      if (value === null && byDefault !== null) {
        value = byDefault;
      }
    }
    return value;
  }

  public setParams(params): void {
    this.params = params;
  }

  public parseDate(date: string, format: string, itsUTC): string {
    // get autentication locale
    const TIME_ZONE = moment.tz.guess();
    const LOCALE = this.auth.getlocale();
    let auxDate;

    if (date === null) {
      date = undefined;
    }

    // parse date on locale
    if (itsUTC) {
      date = moment.utc(date).locale(LOCALE).format(format);
    } else {
      auxDate = moment(date);
      auxDate = auxDate.tz(TIME_ZONE).locale(LOCALE).format(format);

      date = auxDate;
    }

    return date;
  }

  public restService(name: string, config: any): Observable<any> {
    let url = environment[name];

    if (typeof config !== 'undefined') {
      const DATA = config.params || {};
      let method = config.method;

      if (config.queryString) {
        url = url + config.queryString;
      }

      /** TEMP */
      // if (environment.localHMI && environment.byDummies && !environment.production && name !== 'passengersList') {
      //   url = environment[name];
      //   method = 'get';
      // }
      /** TEMP */
      console.log(url);
      return this.http[method]<any>(url, DATA).pipe(
        map((data: any) => {
          if (typeof data !== 'undefined' && data !== null) {
            if (data.header && data.header.code && (data.header.code !== 0 && data.header.code !== '0')) {
              if (config.error && (data.header.code === -1 || data.header.code === '-1')) {
                console.log('--------------');
                console.log('ERROR ON ', name, 'SERVICE: ', data.header.description);
                console.log('--------------');
                config.error(data);
                return of(data);
              }
            } else {
              return data;
            }
          }
        }),
        catchError((err) => {
          if (config.error) {
            console.log('--------------1',config.error);
            console.log('ERROR ON', name, 'SERVICE: ', err);
            console.log('--------------');

            config.error(err);
          }
          return of(err);
        })
      );
    }
  }

  public transformData(dataItem, stringsList, numbersList): void {
    const DATA = dataItem;
    if (typeof DATA !== 'undefined' && DATA !== null) {
      // transform to strings
      stringsList.forEach((key) => {
        if (typeof DATA[key] !== 'undefined' && DATA[key] !== null && DATA[key] !== '') {
          DATA[key] = DATA[key].toString();
        }
      });

      // transfor to valid number
      numbersList.forEach((key) => {
        if (typeof DATA[key] !== 'undefined' && DATA[key] !== null && DATA[key] !== '') {
          if (typeof DATA[key] === 'string') {
            DATA[key] = DATA[key].replace(',', '.');
          }

          if (isNaN(DATA[key])) {
            DATA[key] = null;
          } else {
            DATA[key] = DATA[key];
          }
        }
      });
    }

    return DATA;
  }


  public getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('_');
  }

  public getDropdownValue(controler, name, itsMultiple, byLabel): any {
    let value = null;

    if (typeof controler[name] !== 'undefined') {
      if (typeof controler[name].value !== 'undefined' && controler[name].value !== null && controler[name].value !== '') {
        if (itsMultiple) {
          value = controler[name].value;
        } else {
          if (typeof byLabel !== 'undefined' && byLabel !== null && byLabel === true) {
            value = controler[name].value.label;
          } else {
            value = controler[name].value.value;
          }
        }
      }
    }

    return value;
  }

  public getAutocompleteValue(controler, name, model, byId): any {
    let value = null;

    if (typeof controler[name] !== 'undefined') {
      if (typeof controler[name].value !== 'undefined' && controler[name].value !== null
        && controler[name].value !== '') {
        // for dropdown, get and set real value
        if (typeof controler[name].value.value !== 'undefined' && controler[name].value.value !== null) {
          if (typeof model !== 'undefined' && model !== null && typeof model.length !== 'undefined') {
            model.forEach(element => {
              if (element.id === controler[name].value.value) {
                if (typeof byId !== 'undefined' && byId !== null && byId === true) {
                  value = element.id;
                } else {
                  value = element.value;
                }
              }
            });
          }
        } else {
          value = controler[name].value;
        }
      }
    }

    return value;
  }

  public exportToExcel(name, tableList): void {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(tableList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, name);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(element => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  public loadList(service, callback): void {
    this.restService(service, {
      method: 'get'
    }).subscribe(
      (data) => {
        let list;

        // control service error
        if (typeof data.error === 'undefined') {
          if (typeof data.body !== 'undefined' && data.body !== null) {
            list = data.body;
          } else {
            list = data;
          }
        } else {
          list = [];
        }

        callback(list);
      }
    );
  }

  public dataToFinalFormat(value, toISOString): any {
    let fieldDate;
    if (typeof value !== 'undefined' && typeof value === 'string') {
      const YEAR = parseInt(value.split('/')[2], 10);
      const MONTH = parseInt(value.split('/')[1], 10);
      const DAY = parseInt(value.split('/')[0], 10);
      let HOUR_DAY = value.split('-');

      // check for timezone
      if (typeof HOUR_DAY !== 'undefined' && HOUR_DAY !== null && HOUR_DAY?.length === 1) {
        HOUR_DAY = value.split(' ');
      }

      let DATE;

      if (typeof HOUR_DAY !== 'undefined' && HOUR_DAY !== null && HOUR_DAY?.length > 1) {
        const HOUR = HOUR_DAY[1].split(':')[0].trim();
        const MIN = HOUR_DAY[1].split(':')[1];
        DATE = new Date(YEAR, (MONTH - 1), DAY, (Number(HOUR) + 1), Number(MIN));
      } else {
        DATE = new Date(YEAR, (MONTH - 1), DAY);
      }

      fieldDate = moment(DATE);
    } else {
      fieldDate = moment(value);
    }

    if (toISOString) {
      return fieldDate.toISOString();
    } else {
      return fieldDate;
    }
  }

  public getPageHeight() {
    const PAGE_HEIGHT = window.innerHeight;
    return PAGE_HEIGHT;
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

  public getModelDataById(modelList, selectedItem): any {
    let data = null;

    if (typeof modelList !== 'undefined' && modelList !== null && typeof modelList.length !== 'undefined'
      && typeof selectedItem !== 'undefined' && selectedItem !== null) {
      modelList.forEach(element => {
        if (element.id === selectedItem.value) {
          data = element;
        }
      });
    }
    return data;
  }

  public setValidData(form, target, pattern): void {
    if (form?.controls) {
      const FORM_CONTROL = form.controls;

      // first check if exist form controls
      if (typeof FORM_CONTROL !== 'undefined' && FORM_CONTROL !== null) {
        const CONTROL = FORM_CONTROL[target];

        // check if control has error
        if (CONTROL.errors !== null) {

          // check if error list has max value
          if (typeof CONTROL.errors.max !== 'undefined' && CONTROL.errors.max !== null) {
            // set maximun value
            CONTROL.setValue(CONTROL.errors.max.max);
          }
        } else if (typeof pattern !== 'undefined' && pattern !== null) {
          let val = CONTROL.value;

          if (val !== null) {
            val = val.toString();

            switch (pattern) {
              case 'limiterONEDecimal':
                val = val.replace(/^(\d+.?\d{0,1})\d*$/, '$1');
                break;
              case 'limiterTWODecimal':
                val = val.replace(/^(\d+.?\d{0,2})\d*$/, '$1');
                break;
            }
            CONTROL.setValue(parseFloat(val));
          }
        }
      }
    }
  }


  public parseCell(col, data, onTooltip) {
    let finalData = '-';
    if (typeof col !== 'undefined') {
      switch (col.type) {
        case 'string':
          if (data !== '' && data !== null) {
            finalData = data;

            if (col?.format && col?.format === 'translate') {
              finalData = this.translate.instant('GENERICS.' + data);
            }
          }
          break;
        case 'date':
          if (data !== '' && data !== null) {
            if (typeof data === 'string' && col.format === null) {
              finalData = data;
            } else {
              finalData = moment(data).format(col.format);
            }
          }
          break;
        case 'boolean':
          if (data !== '' && data !== null) {
            if (data === true || data === 'true') {
              finalData = this.translate.instant('GENERICS.yes');
            } else {
              finalData = this.translate.instant('GENERICS.no');
            }
            if (col.options) {
              finalData = col.options[data];
            }

          }
          break;
      }
    }
    return finalData;
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

  public openPopupDocument(uploader: FileUpload, controls, list): void {
    this.dataFile$ = new ReplaySubject<any>();
    const FORM_CONTROL = controls;
    const certificateId = FORM_CONTROL.certificateId?.value;
    const files = [];
    const DATA = {
      file: null
    };

    if (typeof certificateId !== 'undefined' && certificateId !== null) {
      list.forEach((item) => {
        if (item.certificateId === certificateId) {
          this.openDocument(item);
        }
      });
    } else {
      if (uploader._files.length > 0) {
        for (const file of uploader._files) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            files.push({
              id: null,
              name: file.name,
              mimeType: file.type,
              size: file.size,
              base64: fileReader.result
            });

            this.dataFile$.next(files);
          };
        }
      }

      this.dataFile$.subscribe(element => {
        if (element && element.length > 0) {
          DATA.file = files;
          this.openDocument(DATA);
        }
      });
    }
  }

  public openDocument(data): void {
    // only if exist data
    if (typeof data !== 'undefined' && data !== null) {
      // only if data has a file list
      if (typeof data.file !== 'undefined' && data.file !== null) {
        let fileItem = data.file;

        if (typeof data.file.length !== 'undefined') {
          fileItem = data.file[0];
        }

        if (typeof fileItem !== 'undefined' && fileItem !== null) {
          let base64str;
          let mimeType;
          let byString = false;
          // let base64str = btoa(String.fromCharCode(...new Uint8Array(fileItem.base64)));

          if (typeof fileItem.base64 === 'string') {
            byString = true;
            base64str = fileItem.base64;

            if (base64str.indexOf('data:application/pdf;base64,') !== -1) {
              mimeType = 'application/pdf;base64';
            } else {
              mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
            }
          } else {
            base64str = btoa(new Uint8Array(fileItem.base64).reduce((dataItem, byte) => {
              return dataItem + String.fromCharCode(byte);
            }, ''));
            mimeType = fileItem.mimeType;
          }

          /*
          if (base64str.indexOf('data:application/pdf;base64,') !== -1) {
            mimeType = 'application/pdf;base64';
          } else {
            mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
          }
          */

          if (typeof base64str !== 'undefined') {
            if (byString) {
              base64str = base64str.split('data:' + mimeType + ',')[1];
            }


            const byteCharacters = atob(base64str);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const file = new Blob([byteArray], { type: mimeType });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          }
        } else {
          console.error('El archivo es null');
        }
      }
    }
  }

  public selectedFromModelValidator(modelList): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (typeof modelList !== 'undefined' && modelList !== null && typeof modelList.length !== 'undefined' && control.value) {
        const exist = modelList.filter(x => x.id === control.value?.value);
        return exist.length > 0 ? null : { existOnList: false };
      } else {
        return null;
      }
    };
  }

  public checkVerifyNumberMaxLength(data, max): any {
    if ((data && max) && data.currentTarget.value.length >= max) {
      return false;
    }
  }

  public confirm(config): void {
    let icon = 'pi pi-times';
    let header = null;
    this.extraClasses = '';

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


  public loadListValue(name: string, config: any): Observable<any> {
    return this.restService(name, config).pipe(
      map((data) => {
        if (data.error) {
          return [];
        }
        if (data?.body) {
          return data.body;
        }
        return data;
      }));
  }


  public getContainerHeight(): number {
    let appHeight = 0;
    const appElement = document.getElementsByClassName('mova-quickstart__container')[0] as HTMLDivElement;

    if (appElement) {
      appHeight = appElement.offsetHeight;
    }

    return appHeight;
  }

  public loadingUXComponent(status: boolean): void {
    setTimeout(() => {
      if (typeof status === 'undefined' || status === null || status === false) {
        this.isLoading = false;
      } else {
        this.isLoading = true;
      }
    }, 100);
  }

  public getBtnAddLabel(): void {
    return this.translate.instant('GENERICS.add');
  }

  public getBtnModifyLabel(): void {
    return this.translate.instant('GENERICS.save');
  }
}
