import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {MensagemSaveDto} from '../models/dtos/mensagem-save.dto';
import {MensagemGetDto} from '../models/dtos/mensagem-get.dto';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private readonly api = `${environment.api_url}/mensagens`;


  constructor(private http: HttpClient) { }


  public criar(mensagemSave: MensagemSaveDto): Observable<MensagemGetDto> {
    return this.http.post<MensagemGetDto>(`${this.api}`, mensagemSave)
      .pipe(
        take(1)
      );
  }

}
