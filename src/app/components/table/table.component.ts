import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { UtilsService } from './../../core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SortEvent } from 'primeng/api';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers:[TranslateService,UtilsService,DeviceDetectorService],
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild('tablePaginator') tablePaginator: Paginator;

  @Input() config: any = {};
  @Input() model: any = [];
  @Input() fileReference: any = [];
  @Input() permissions: any = [];
  @Input() totalRecords: any = 0;
  @Input() detailTemplate: TemplateRef<any>;

  hasPagination;
  typePagination;
  defaultPageLinkSize;
  first = 0;
  itsResponsive = true;
  isMobile = false;

  constructor(
    public utils: UtilsService,
    private translate: TranslateService,
    public deviceService: DeviceDetectorService
  ) {
    // init values
    this.hasPagination = false;
    this.typePagination = 'client';
    this.defaultPageLinkSize = 3;

    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {

    // set default config values
    if (typeof this.config.loading === 'undefined') {
      this.config.loading = true;
    }

    if (typeof this.config.hasDetail === 'undefined') {
      this.config.hasDetail = false;
    }

    if (typeof this.config.responsive !== 'undefined') {
      this.itsResponsive = this.config.responsive;
    }

    if (this.isMobile) {
      this.config.paginatorTemplate = this.translate.instant('GENERICS.total') + ' {totalRecords}';
    } else {
      if (typeof this.config.paginatorTemplate === 'undefined') {
        this.config.paginatorTemplate = '{first}-{last} ' + this.translate.instant('GENERICS.of') + ' {totalRecords} '
          + this.translate.instant('GENERICS.results');
      }
    }

    if (typeof this.config !== 'undefined' && this.config !== null) {

      if (typeof this.config.pagination !== 'undefined' && this.config.pagination === true) {
        this.hasPagination = true;
      }

      if (typeof this.config.paginationType !== 'undefined' && (this.config.paginationType === null || this.config.paginationType === 'client')) {
        this.typePagination = 'client';
      }

      if (typeof this.config.paginationType !== 'undefined' && (this.config.paginationType !== null && this.config.paginationType === 'server')) {
        this.typePagination = 'server';
      }
    }
  }

  public getTemplate(): string {
    if (this.isMobile) {
      return this.translate.instant('GENERICS.total') + ' {totalRecords}';
    } else {
      if (typeof this.model === 'undefined' || this.model === null
        || (typeof this.model !== 'undefined' && this.model !== null && this.model.length === 0)) {
        return '0-{last} ' + this.translate.instant('GENERICS.of') + ' {totalRecords} ' + this.translate.instant('GENERICS.results');
      } else {
        return '{first}-{last} ' + this.translate.instant('GENERICS.of') + ' {totalRecords} ' + this.translate.instant('GENERICS.results');
      }
    }
  }

  /** SORT */
  public customSort(event): void {
    const LIST_ORDER = [];
    let name = '';

    if (typeof event !== 'undefined' && typeof event.multisortmeta !== 'undefined') {
      event.multisortmeta.forEach((item) => {
        name = this.getRealSortColumn(item.field);

        if (item.order === 1) {
          LIST_ORDER.push(name + ':ASC');
        } else {
          LIST_ORDER.push(name + ':DESC');
        }
      });
    }

    if (typeof this.config.customSort !== 'undefined') {
      this.config.customSort(LIST_ORDER);
    }
  }

  public getRealSortColumn(name: string): string {
    let columnName = name;
    if (typeof this.config.headers !== 'undefined' && this.config.headers !== null) {
      this.config.headers.forEach(element => {
        if (element.id === name) {
          if (typeof element.orderExtraColumn !== 'undefined' && element.orderExtraColumn !== null) {
            columnName = element.orderExtraColumn;
          }
        }
      });
    }
    return columnName;
  }
  /** SORT */

  public onElementSelect(model, fileReference): void {
    // only for mobile
    if (this.isMobile) {
      if (typeof this.config.rowAction !== 'undefined') {
        this.config.rowAction(model, fileReference);
      }
    }
  }

  ngAfterViewInit(): void {
    this.utils.tablePaginator[this.config.name] = this.tablePaginator;
  }
}
