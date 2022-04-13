import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationDto } from 'src/app/core/model/dto/operation-dto';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../../utils.service';


@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private baseUrl: string = environment.operation + '/operation';

  constructor(private http: HttpClient) { }

  public listOperations(operationDto:any) {
    console.log(operationDto);
    return this.http.post<any>(this.baseUrl + '/v1/list', JSON.stringify(operationDto));
  }

  public getOperation(operationId: number) {
    return this.http.get<OperationDto>(this.baseUrl + '/v1/' + operationId);
  }

  public createOperation(operationDto: OperationDto) {
    return this.http.post<any>(this.baseUrl + '/v1', JSON.stringify(operationDto));
  }

  public modifyOperation(operationDto: OperationDto) {
    return this.http.put<any>(this.baseUrl + '/v1', JSON.stringify(operationDto));
  }

  public deleteOperation(operationId:number) {
    return this.http.delete<any>(this.baseUrl + '/v1/'+operationId);
  }

}
