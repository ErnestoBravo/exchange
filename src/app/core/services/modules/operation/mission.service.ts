import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElementTypeDto } from 'src/app/core/model/dto/element-type-dto';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class MissionService {
    private baseUrl: string = environment.operation + '/mission';

    constructor(private http: HttpClient) { }

    public listMission() {
        return this.http.get<ElementTypeDto[]>(this.baseUrl + '/v1');
        // return this.utilsService.restService('operation', {
        //     method: 'get',
        //     queryString: '/mission/v1'
        // });
    }

}
