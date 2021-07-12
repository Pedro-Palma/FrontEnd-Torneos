import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  public userModel: User;
  public token;
  public persona;

  constructor(private _usersService: UsersService,
    private _router: Router) {
      this.userModel = new User("","","","",0)
    }

  ngOnInit(): void {
  }
  login() {
    this._usersService.login(this.userModel).subscribe(
      res =>{
        this.persona = res.userFound
        this.token = res.token
        console.log(this.persona)
        console.log(this.token)

        localStorage.setItem('persona', JSON.stringify(this.persona));
        localStorage.setItem('token', this.token);

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Bienvenido!'
        })

        this._router.navigate(['/home'])
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrectos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
