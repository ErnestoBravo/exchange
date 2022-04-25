import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementTypeDto } from 'src/app/core/model/dto/element-type-dto';
import { CargaDto } from 'src/app/core/model/dto/carga-dto';
import { MissionService } from 'src/app/core/services/modules/operation/mission.service';
import { OperationTypeService } from 'src/app/core/services/modules/operation/operation-type.service';
import { LoadUnitService } from 'src/app/core/services/modules/loadunit/loadunit.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-loadunit-maintainer',
    templateUrl: './retirar-main.component.html',
    styleUrls: ['./retirar-main.component.scss'],
    providers: [OperationTypeService, MissionService, LoadUnitService, MessageService]
})
export class RetirarMainComponent implements OnInit {

 
    loading: boolean = false;

    operationTypes: ElementTypeDto[];
    Operaciones: ElementTypeDto[];
    public form: FormGroup;

    loadUnits: CargaDto[] = [];

    constructor(private operationTypeService: OperationTypeService,
        private missionService: MissionService,
        private loadUnitService: LoadUnitService,
        private router: Router,
        private messageService: MessageService) {

        this.form = new FormGroup({
            operationId: new FormControl(null, Validators.min(0)),
            operationType: new FormControl(null),
            mission: new FormControl(null),
            startDate: new FormControl(null),
            endDate: new FormControl(null),
            shipId: new FormControl(null),
            terminalId: new FormControl(null),
            rotationNumber: new FormControl(null),
            storer: new FormControl(null),
            operator: new FormControl(null),
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
