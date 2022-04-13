import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargaDto } from 'src/app/core/model/dto/carga-dto';

import { LoadUnitService } from 'src/app/core/services/modules/loadunit/loadunit.service';

@Component({
    selector: 'app-create-modify-loadunit',
    templateUrl: './view-loadunit.component.html',
    styleUrls: ['./view-loadunit.component.scss'],
    providers: [LoadUnitService]
})
export class ViewLoadUnitComponent implements OnInit {

    public form: FormGroup;
    operationId: number = null;

    cargaDto: CargaDto = new CargaDto();

    constructor(
          private router: Router,
        private loadUnitService: LoadUnitService,
        private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (params["id"]) {
                this.operationId = params["id"];
            }
        });
        this.form = new FormGroup({
            operationType: new FormControl(null, Validators.required),
            operationSubType: new FormControl({ value: null, disabled: true }, Validators.required),
            mission: new FormControl(null, Validators.required),
            ship: new FormControl(null, Validators.required),
            terminal: new FormControl(null, Validators.required),
            startDate: new FormControl(null, Validators.required),
            endDate: new FormControl(null, Validators.required),
            imo: new FormControl(false, Validators.required),

            gatheringRequestNumber: new FormControl({ value: null, disabled: true }, Validators.required),
            storer: new FormControl({ value: null, disabled: true }, Validators.required),
            rotationNumber: new FormControl({ value: null, disabled: true }, Validators.required),
            quantityCnt20: new FormControl({ value: null, disabled: true }, Validators.required),
            quantityCnt40: new FormControl({ value: null, disabled: true }, Validators.required),
            quantityVehicles: new FormControl({ value: null, disabled: true }, Validators.required),
            shippingCompany: new FormControl({ value: null, disabled: true }, Validators.required),
            shippingAgent: new FormControl({ value: null, disabled: true }, Validators.required),
            automaticVehicleRequest: new FormControl({ value: false, disabled: true }, Validators.required),
            tons: new FormControl({ value: null, disabled: true }, Validators.required),
            operator: new FormControl({ value: null, disabled: true }, Validators.required)
        });
    }

    ngOnInit(): void {
        // this.listOperationTypes();
        // this.listMissions();
        // if (this.operationId != null) {
        //     this.operationService.getOperation(this.operationId).subscribe(
        //         resp => {
        //             this.operationDto = resp;
        //             this.form.controls['operationType'].setValue(this.operationDto.operationType);
        //             this.form.controls['operationType'].disable();
        //             this.form.controls['operationSubType'].setValue(this.operationDto.operationSubType);
        //             this.form.controls['operationSubType'].disable();
        //             this.dtoToForm();
        //         }
        //     )
        // }
    }



    createOrModify() {
        if (this.form.valid) {
            this.formToDto();
                console.log("create");
                this.loadUnitService.createLoadUnit(this.cargaDto).subscribe(
                    resp => {
                        console.log(resp);
                        this.back();
                    }
                )
            
        } else {
            Object.keys(this.form.controls).forEach(field => {
                this.form.get(field).markAsTouched({ onlySelf: true });
            });
        }
    }

    dtoToForm() {

    }


    formToDto() {

        // this.operationDto.operationId = null;
        this.cargaDto.id = this.form.controls['operacion'].value;

    }

    validateStateOperation() {

    }

    back(){
        this.router.navigate(['/loadunit']);
    }

}
