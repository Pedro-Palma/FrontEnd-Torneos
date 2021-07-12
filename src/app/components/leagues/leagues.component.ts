import { Component, OnInit } from '@angular/core';
import { Leagues } from '../../models/league.model';
import { LeaguesService } from '../../services/leagues.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
  providers: [ LeaguesService ]
})
export class LeaguesComponent implements OnInit {
  public leagueA;
  public league;
  public leagueSelected: Leagues;
  public addLeague: Leagues;

  constructor(public _leaguesService: LeaguesService) {
    this.leagueSelected = new Leagues("","",{_id:"",user:""},"")
    this.addLeague = new Leagues("","",{_id:"",user:""},"")
  }

  ngOnInit(): void {
    this.listLeagueAdmin();
    //this.listLeagueUser();
  }
  listLeagueAdmin() {
    this._leaguesService.listLeagueAdmin().subscribe(
      res => {
        this.leagueA = res.leagueFound;

      },
      error => {
        console.log(<any>error);


      }
    )
  }
  findLeagueId(id) {
    this._leaguesService.findLeagueId(id).subscribe(
      res => {
        this.leagueSelected = res.leagueFound
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteLeagueAdmin(idLeague) {
    this._leaguesService.deleteLeagueAdmin(idLeague).subscribe(
      res => {
        console.log(res);

        this.listLeagueAdmin();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteLeagueUser(idLeague) {
    this._leaguesService.deleteLeagueUser(idLeague).subscribe(
      res => {
        console.log(res);

        this.listLeagueAdmin();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  addLeagueUser() {
    console.log(this.league);
    this._leaguesService.addLeagueUser(this.league).subscribe(
      res => {
        console.log(res);
        this.listLeagueAdmin();

      },
      error => {
        console.log(<any>error);

      }
    )

  }
  addLeagueAdmin() {
    console.log(this.addLeague);
    this._leaguesService.addLeagueAdmin(this.addLeague).subscribe(
      res => {
        console.log(res);
        this.listLeagueAdmin();

      },
      error => {
        let err1;
        err1 = error;
        err1 = JSON.stringify(error.error.menssage);
        console.log(<any>err1);

        Swal.fire({
          icon: 'error',
          title: err1,
          showConfirmButton: false,
          timer: 1500
        })

      }

    )

  }
  updateLeagueAdmin() {
    this._leaguesService.updateLeagueAdmin(this.leagueSelected).subscribe(
      res => {
        console.log(res);
        this.listLeagueAdmin();

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateLeagueUser() {
    this._leaguesService.updateLeagueUser(this.leagueSelected).subscribe(
      res => {
        console.log(res);
        this.listLeagueAdmin();

      },
      error => {
        console.log(<any>error);

      }
    )
  }
}
