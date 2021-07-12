  import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

import { GLOBAL } from './global.service'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public persona;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  register(userNew: User): Observable<any> {
    let params = JSON.stringify(userNew);

    return this._http.post(this.url + '/registerUser', params, { headers: this.headersVariable });
  }
  login(userLog): Observable<any> {
    let params = JSON.stringify(userLog);

    return this._http.post(this.url + '/login', params, { headers: this.headersVariable });
  }
  registerAdmin(userNewA: User): Observable<any> {
    let params = JSON.stringify(userNewA);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.post(this.url + '/registerAdmin', params, { headers: headersToken });
  }
  //
  listProfile(): Observable<any> {  /* Listar al usuario logueado #Cualquier usuario# */
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listProfile', { headers: headersToken })
  }
  listUsers(): Observable<any> {  /* Listar todos los usuarios #Solo pueden los admins# */
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.get(this.url + '/listUsers', { headers: headersToken });
  }
  listUserID(id): Observable<any> {  /* Listar un unico usuario con su id #Se usara en listar usuarios# */
    return this._http.get(this.url + '/findUserId/' + id, { headers: this.headersVariable });
  }
  //
  updateProfile(userUpd: User): Observable<any> {  /* Modificar el usuario logueado #Cualquier usuario# */
    let params = JSON.stringify(userUpd);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/updateProfile/' + userUpd._id, params, { headers: headersToken });
  }
  updateUsers(userUd: User): Observable<any> {  /* Modificar a un usuario en especifico #Solo admins# */
    let params = JSON.stringify(userUd);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    /* En el front debe de llevar un campo llamado id que indicara a que usuario modificara */
    return this._http.put(this.url + '/updateUsers/' + userUd._id, params, { headers: headersToken });
  }
  //
  deleteProfile(): Observable<any> {  /* Eliminar el usuario logueado #Cualquier usuario# */
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.delete(this.url + '/deleteProfile', { headers: headersToken });
  }
  deleteUsers(id): Observable<any> {  /* Eliminar a un usuario en especifico #Solo admins# */
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

  /* En el front debe de llevar un campo llamado id que indicara a que usuario eliminara */
    return this._http.delete(this.url + '/deleteUsers/' + id, { headers: headersToken });
  }
  //

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
