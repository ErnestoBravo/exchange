import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElementTypeDto } from 'src/app/core/model/dto/element-type-dto';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class OperationSubTypeService {
    private baseUrl: string = environment.operation + '/operationSubType';

    constructor(private http: HttpClient) { }

    public listOperationSubTypes(operationTypeCode: string) {
        return this.http.get<ElementTypeDto[]>(this.baseUrl + '/v1/' + operationTypeCode);
    }

}
