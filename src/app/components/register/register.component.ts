import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UsersService]
})
export class RegisterComponent implements OnInit {
  public userreg: User;
  public err;

  constructor(private _usersService: UsersService,
    private _router: Router) {
      this.userreg = new User("","","","",0);
    }

  ngOnInit(): void {
  }
  register() {
    console.log(this.userreg);

    this._usersService.register(this.userreg).subscribe(
      res => {
        console.log(res)

        this._router.navigate(['/login'])
      },
      err => {
        console.log(<any>err)
      }
    )
  }
}
