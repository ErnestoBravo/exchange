import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { DropDown } from 'src/app/core/model/abonar/dropDown';
import {TabMenuModule} from 'primeng/tabmenu';


@Component({
    selector: 'app-loadunit-maintainer',
    templateUrl: './compraVenta-main.component.html',
    styleUrls: ['./compraVenta-main.component.scss'],
    providers: [MessageService]
})
export class CompraVentaMainComponent implements OnInit {
 
    loading: boolean = false;
    public form: FormGroup;

    coins: DropDown[];
    selectedCoins: DropDown;
    paises: DropDown[];
    selectedPais: DropDown;
    items: { label: string; icon: string; }[];

    constructor(
        private router: Router,
        private messageService: MessageService) {

        this.form = new FormGroup({
            selectedCoins: new FormControl(null),
            selectedCity: new FormControl(null),
            montoAbonar: new FormControl(null),
        });
            this.coins = [
                {name: 'Peso chileno', code: 'CLP'},
                {name: 'Bitcoin (BTC)', code: 'BTC'},
                {name: 'Ether', code: 'ETH'},
                {name: 'Istanbul', code: 'IST'},
                {name: 'Paris', code: 'PRS'}
            ];
            this.paises = [
                {name: 'Peso chileno', code: 'CLP'},
                {name: 'Bitcoin (BTC)', code: 'BTC'},
                {name: 'Ether', code: 'ETH'},
                {name: 'Istanbul', code: 'IST'},
                {name: 'Paris', code: 'PRS'}
            ];
            this.items = [
                {label: 'comprar', icon: ''},
                {label: 'vender', icon: ''},
            ];
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
