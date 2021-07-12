import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

import { GLOBAL } from './global.service'
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public url: String
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public persona;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  //eliminar equipo user
  deleteTeamUser(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.delete(this.url + '/deleteTeamUser/' + id, { headers: headersToken })
  }
  //eliminar equipo admin
  deleteTeamAdmin(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.delete(this.url + '/deleteTeamAdmin/' + id, { headers: headersToken })
  }
  //Agregar equipo user
  addTeamUser(teamNew: Team, id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    let params = JSON.stringify(teamNew);

    return this._http.post(this.url + '/addTeamUser/' + id, params, { headers: headersToken })
  }
  //Agregar equipo admin
  addTeamAdmin(teamNew: Team, id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    let params = JSON.stringify(teamNew);
    console.log(params)
    return this._http.post(this.url + '/addTeamAdmin/' + id, params, { headers: headersToken })
  }
  //editar equipo user
  updateTeamUser(teamUpd: Team): Observable<any> {
    let params = JSON.stringify(teamUpd);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/updateTeamUser/' + teamUpd._id, params, { headers: headersToken })
  }
  // editar equipo admin
  updateTeamAdmin(teamUpd: Team): Observable<any> {
    let params = JSON.stringify(teamUpd);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/updateTeamAdmin/' + teamUpd._id, params, { headers: headersToken })

  }
  //Mostrar la tabla de equipos de una liga user (ordenada)
  listTableUser(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listTableUser/' + id, { headers: headersToken })
  }
  //Mostrar la tabla de equipos de una liga admin (ordenada)
  listTableAdmin(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listTablesAdmin/' + id, { headers: headersToken })
  }
  // buscar por id
  findTeamId(id): Observable<any> {
    return this._http.get(this.url + '/findTeamId/' + id, { headers: this.headersVariable });
  }
  listTeamAdmin(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listTeamAdmin/' + id,{ headers: headersToken})
  }
  listTeamUser(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listTeamUser/' + id,{ headers: headersToken})
  }




  pdfTeamsByLeague(id):Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/pdfTeamsByLeague/' +id, { headers: headersToken })
  }























  getToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != 'undefined') {
      this.token = token2;
    } else {
      this.token = null;
    }
    return this.token;
  }
  getPersona() {
    var persona2 = JSON.parse(localStorage.getItem('persona'));
    if (persona2 != 'undefined') {
      this.persona = persona2;
    } else {
      this.persona = null;
    }
    return this.persona;
  }
}
