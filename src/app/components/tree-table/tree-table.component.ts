import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
// import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeTableComponent implements OnInit {
  @Input() config: any = {};
  @Input() model: TreeNode[] = [];
  @Input() fileReference: any = [];
  @Input() totalRecords: any = 0;

  files2: TreeNode[];
  cols: any[];

  hasPagination;
  typePagination;
  defaultPageLinkSize;
  first = 0;
  itsResponsive = true;
  isMobile = false;
  translate: any;

  constructor(
    public utils: UtilsService,
    // private translate: TranslateService,
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

  public customSort(event): void { }

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

  public onElementSelect(model, fileReference): void {
    // only for mobile
    if (this.isMobile) {
      if (typeof this.config.rowAction !== 'undefined') {
        this.config.rowAction(model, fileReference);
      }
    }
  }
}
