import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leagues } from '../models/league.model';

import { GLOBAL } from './global.service'
@Injectable({
  providedIn: 'root'
})
export class LeaguesService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public persona;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  deleteLeagueAdmin(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.delete(this.url + '/deleteLeagueAdmin/' + id , { headers: headersToken})
  }
  deleteLeagueUser(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.delete(this.url + '/deleteLeagueUser/' + id , { headers: headersToken})
  }
  addLeagueUser(leagueNew: Leagues): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    let params = JSON.stringify(leagueNew);

    return this._http.post(this.url + '/addLeagueUser', params, { headers: headersToken})
  }
  addLeagueAdmin(leagueNew: Leagues): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    let params = JSON.stringify(leagueNew);

    return this._http.post(this.url + '/addLeagueAdmin', params, { headers: headersToken})
  }
  updateLeagueAdmin(leagueUpd: Leagues): Observable<any> {
    let params = JSON.stringify(leagueUpd);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/updateLeagueAdmin/' + leagueUpd._id, params, { headers: headersToken})
  }
  updateLeagueUser(leagueUpd: Leagues): Observable<any> {
    let params = JSON.stringify(leagueUpd);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/updateLeagueUser/' + leagueUpd._id, params, { headers: headersToken})
  }
  listLeagueUser(id): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listLeagueUser/' + id, { headers: headersToken })
  }
  listLeagueAdmin(): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listLeagueAdmin', { headers: headersToken })
  }
  findLeagueId(id): Observable<any> {
    return this._http.get(this.url + '/findLeagueId/' + id, { headers: this.headersVariable });
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
  getToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != 'undefined') {
      this.token = token2;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
