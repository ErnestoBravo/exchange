import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { DropDown } from 'src/app/core/model/abonar/dropDown';

@Component({
    selector: 'app-loadunit-maintainer',
    templateUrl: './abonar-main.component.html',
    styleUrls: ['./abonar-main.component.scss'],
    providers: [MessageService]
})
export class AbonarMainComponent implements OnInit {
  
    loading: boolean = false;
    public form: FormGroup;

    coins: DropDown[];
    selectedCoins: DropDown;
    paises: DropDown[];
    selectedPais: DropDown;

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
                {name: 'Litecoin', code: 'LTC'},
                {name: 'Binance', code: 'BNB'}
            ];
            this.paises = [
                {name: 'Peso chileno', code: 'CLP'},
                {name: 'Bitcoin (BTC)', code: 'BTC'},
                {name: 'Ether', code: 'ETH'},
                {name: 'Litecoin', code: 'LTC'},
                {name: 'Binance', code: 'BNB'}

           
            ];
        }

    ngOnInit(): void {

    }

    volver() {
        this.router.navigate(['/']);
    }

    enviar() {
        alert("Enviando tu wea de archivo");
      }

    onTabClose(event) {
        this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
    }
    
    onTabOpen(event) {
        this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }


}
