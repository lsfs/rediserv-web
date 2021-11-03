import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Cargo} from '../models/cargo.model';
import {take} from 'rxjs/operators';
import {CargoSaveDto} from '../models/dtos/cargo-save.dto';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private readonly api = `${environment.api_url}/cargos`;

  constructor(private http: HttpClient) {
  }


  public listar(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.api}/listar`);
  }


  public buscar(idcargo: number): Observable<Cargo> {

    return this.http.get<Cargo>(`${this.api}/${idcargo}`);
  }


  public criar(cargoSave: CargoSaveDto): Observable<Cargo> {

    return this.http.post<Cargo>(`${this.api}`, cargoSave)
      .pipe(
        take(1)
      );
  }

  public editar(idcargo: number, cargoSave: CargoSaveDto): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.api}/${idcargo}`, cargoSave);
  }

  public excluir(idcargo: number): Observable<Cargo> {
    return this.http.delete<Cargo>(`${this.api}/${idcargo}`);
  }


}
