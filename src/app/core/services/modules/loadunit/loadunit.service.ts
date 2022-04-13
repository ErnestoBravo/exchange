import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CargaDto } from 'src/app/core/model/dto/carga-dto';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../../utils.service';



@Injectable({
  providedIn: 'root'
})
export class LoadUnitService {
  private baseUrl: string = environment.loadunit + '/loadunit';

  constructor(private http: HttpClient) { }

  public listLoadUnit() {
    return this.http.get<any>(this.baseUrl + '/v1/list');
  }

  public createLoadUnit(cargaDto: CargaDto) {
    return this.http.post<any>(this.baseUrl + '/v1/create', JSON.stringify(cargaDto));
  }

}
