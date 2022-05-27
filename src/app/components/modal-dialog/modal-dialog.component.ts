import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';  
import {SharedModule,PrimeTemplate,Footer,Header} from 'primeng/api/shared'
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDialogComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

  }

  public closeDialog(): void {
    this.ref.close();
  }

}
