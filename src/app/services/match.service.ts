import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Match } from '../models/match.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  public url: String
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public persona;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  //add partido user
  addMatchUser(matchNew: Match, id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    let params = JSON.stringify(matchNew);

    return this._http.post(this.url + '/addMatchUser/' + id, params, { headers: headersToken })

  }
  //add partido admin
  addMatchAdmin(matchNew: Match, id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    let params = JSON.stringify(matchNew);
    console.log(params)

    return this._http.post(this.url + '/addMatchAdmin/' + id, params, { headers: headersToken })

  }
  //delete partido user
  deleteMatchUser(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.delete(this.url + '/deleteMatchUser/' + id, { headers: headersToken })

  }
  deleteMatchAdmin(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.delete(this.url + '/deleteMatchAdmin/' + id, { headers: headersToken })

  }
  // buscar por id
  findMatchId(id): Observable<any> {
    return this._http.get(this.url + '/findMatchId/' + id, { headers: this.headersVariable });
  }
  // ver partidos de una liga user
  listMatchUser(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())


    return this._http.get(this.url + '/listMatchUser/' + id, { headers: headersToken });
  }
  // ver partidos de una liga admin
  listMatchAdmin(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())


    return this._http.get(this.url + '/listMatchAdmin/' + id, { headers: headersToken });
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
