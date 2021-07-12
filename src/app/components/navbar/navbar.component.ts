import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsersService]
})
export class NavbarComponent implements OnInit {

  constructor(public _usersService: UsersService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  limpiarStorage() {
    localStorage.clear()
    this._router.navigate(['/login'])
    //location.reload();



    error => {
      console.log(<any>error);

    }
  }

}
