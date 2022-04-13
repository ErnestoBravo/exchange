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
    templateUrl: './loadunit-maintainer.component.html',
    styleUrls: ['./loadunit-maintainer.component.scss'],
    providers: [OperationTypeService, MissionService, LoadUnitService, MessageService]
})
export class LoadUnitMaintainerComponent implements OnInit {

    cols = [
        { field: 'id', header: 'UC' },
        { field: 'id', header: 'Fecha Arribo' },
        { field: 'id', header: 'Exportador' },
        { field: 'id', header: 'Contenedor' },
        { field: 'id', header: 'Documentos' },
        { field: 'id', header: 'Patente' },
        { field: 'id', header: 'Ubicación' },
        { field: 'id', header: 'Nave' },
        { field: 'id', header: 'Operación' },
        { field: 'id', header: 'Citación' },  
        { field: 'id', header: 'S' },
        { field: 'id', header: 'O' },
        { field: 'id', header: 'D' },
        { field: 'id', header: 'F' },
        { field: 'id', header: 'SV' },
        { field: 'id', header: 'T' }
        // { field: 'id', header: 'Ver' },
        // { field: 'id', header: 'Editar' },
        // { field: 'id', header: 'Eliminar' }
    ];

 
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
        this.listOperationTypes();
        this.listMissions();
    }

    listOperationTypes() {
        this.operationTypeService.listOperationTypes().subscribe(
            resp => {
                this.operationTypes = resp;
            }
        )
    }

    listMissions() {
        this.missionService.listMission().subscribe(
            resp => {
                this.Operaciones = resp;
            }
        )
    }

    search() {
        this.loading = true;
        this.loadUnitService.listLoadUnit().subscribe(
            resp => {
                this.loadUnits = resp;
                this.loading = false;
            }
        )
    }

    // formToDto(): CargaDto {
    //     let cargaDto: CargaDto = new CargaDto();
    //     cargaDto.id = this.form.controls['id'].value;
    //     cargaDto.idOperacion = this.form.controls['idOperacion'].value;
    //     cargaDto.codigoTipoCarga = this.form.controls['codigoTipoCarga'].value;
    //     cargaDto.idNave = this.form.controls['idNave'].value;
    //     cargaDto.idAgenteAduana = this.form.controls['idAgenteAduana'].value;
    //     cargaDto.codigoTipoBulto = this.form.controls['codigoTipoBulto'].value;
    //     cargaDto.idAgenciaResponsable = this.form.controls['idAgenciaResponsable'].value;
    //     cargaDto.numeroContenedor = this.form.controls['numeroContenedor'].value;
    //     cargaDto.fechaCreacion = this.form.controls['fechaCreacion'].value;
    //     cargaDto.numeroBooking = this.form.controls['numeroBooking'].value;
    //     cargaDto.vigente = this.form.controls['vigente'].value;
    //     cargaDto.patente = this.form.controls['patente'].value;
    //     cargaDto.identificadorConductor = this.form.controls['identificadorConductor'].value;
    //     cargaDto.idEstadoCarga = this.form.controls['idEstadoCarga'].value;
    //     cargaDto.codigoInspeccion = this.form.controls['codigoInspeccion'].value;
    //     cargaDto.horaCc = this.form.controls['horaCc'].value;
    //     cargaDto.generadaWs = this.form.controls['generadaWs'].value;
    //     cargaDto.horaRetiroSddd = this.form.controls['horaRetiroSddd'].value;
    //     cargaDto.fechaVisacion = this.form.controls['fechaVisacion'].value;
    //     cargaDto.fechaIngresoTerminal = this.form.controls['fechaIngresoTerminal'].value;
    //     cargaDto.fechaSalidaTerminal = this.form.controls['fechaSalidaTerminal'].value;
    //     cargaDto.imo = this.form.controls['imo'].value;

    //     return cargaDto;
    // }

    createLoadUnit() {
        this.router.navigate(['loadunit/create']);
    }

    modifyOperation(operationId: number) {
        this.router.navigate(['loadunit/modify/'+operationId]);
    }

    viewLoadUnit() {
        this.router.navigate(['loadunit/view']);
    }
    
     deleteOperation(operationId: number) {
        //  this.operationService.deleteOperation(operationId).subscribe(
        //      resp=>{
        //          this.search();
        //      }
        //  )
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
