import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-loadunit-maintainer',
    templateUrl: './compraVenta-main.component.html',
    styleUrls: ['./compraVenta-main.component.scss'],
    providers: [MessageService]
})
export class CompraVentaMainComponent implements OnInit {
 
    loading: boolean = false;
    public form: FormGroup;

    constructor(
        private router: Router,
        private messageService: MessageService) {

            this.form = new FormGroup({
                value1: new FormControl(null),
                value2: new FormControl(null),
            });
    }

    ngOnInit(): void {

    }

    volver() {
        this.router.navigate(['/']);
    }

    activeState: boolean[] = [true, false, false];

    onTabClose(event) {
        this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
    }
    
    onTabOpen(event) {
        this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }

    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }
}
