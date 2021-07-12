import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user.model';
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';
import { LeaguesService } from 'src/app/services/leagues.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UsersService]
})
export class ProfileComponent implements OnInit {
  public usuarioC;
  public persona;
  public userDetails: User;
  public rutaID: String;

  constructor(public _usersService: UsersService,
    public _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _leaguesService: LeaguesService) {
      this.userDetails = new User("","","","",0);
      this.persona = this._usersService.getPersona();
    }

  ngOnInit(): void {
    console.log(this.persona);

    this._activatedRoute.paramMap.subscribe(infoRuta => {
      this.rutaID = infoRuta.get('idUser');
    })
    this.getUser(this.rutaID);

  }
  getUser(id) {
    this._usersService.listUserID(id).subscribe(
      res => {
        this.usuarioC = res.userFind;
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteProfile() {
    this._usersService.deleteProfile().subscribe(
      res => {
        console.log(res.userDeleted);

      this._router.navigate(['/login'])
      localStorage.clear()


      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listUserID(id) {
    this._usersService.listUserID(id).subscribe(
      res => {
        this.userDetails = res.userFind;
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateProfile() {
    this._usersService.updateProfile(this.userDetails).subscribe(
      res => {
        console.log(res.userUpdated);
        this.getUser(this.rutaID);

      },
      error => {
        console.log(<any>error);

      }
    )
  }

}
