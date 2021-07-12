import { Component, OnInit } from '@angular/core';
import { LeaguesService } from 'src/app/services/leagues.service';
import { TeamService } from 'src/app/services/team.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Leagues } from 'src/app/models/league.model';
import { Team } from '../../models/team.model'
import {Match} from '../../models/match.model'
import { MatchService } from 'src/app/services/match.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-teams-league',
  templateUrl: './teams-league.component.html',
  styleUrls: ['./teams-league.component.scss'],
  providers: [ TeamService, UsersService, LeaguesService, MatchService ]
})
export class TeamsLeagueComponent implements OnInit {
  public leagueA;
  public team;
  public persona;
  public leagueSelected: Leagues;
  public teamSelected: Team;
  public addTeam: Team;
  public rutaID: String;

  public matchT: Match;
  public addMatch;
  public matchSelected: Match;

  constructor(public _teamService: TeamService,
    public _usersService: UsersService,
    public _leaguesService: LeaguesService,
    public _matchService: MatchService,
    public _activatedRoute: ActivatedRoute) {
      this.teamSelected = new Team("","","",0,0,0,0,0,0,0,"")
      this.addTeam = new Team("","","",0,0,0,0,0,0,0,"")
      this.addMatch = new Match("","","","",0,0)
      this.matchSelected = new Match("","","","",0,0)
      this.persona = this._usersService.getPersona();

    }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(infoRuta => {
      this.rutaID = infoRuta.get('idLeague');
    })
    this.listTeamUser();
    this.getLeague();
    this.listMatchAdmin()

  }


  listMatchAdmin(){
    this._matchService.listMatchUser(this.rutaID).subscribe(
      res => {
        this.matchT = res.matchFound;
        console.log(this.matchT)
        this.addMatch.goal1="";
        this.addMatch.goal2=""

      },
      error => {
        console.log(<any>error);
        this.addMatch.goal1="";
        this.addMatch.goal2=""
      }
    )

  }
  addMatchAdmin(){
    console.log(this.addMatch);
    this._matchService.addMatchUser(this.addMatch, this.rutaID).subscribe(
      res => {
        console.log(res.matchSaved);
        this.addMatch.idTeam1 = "";
        this.addMatch.idTeam2 = "";
        Swal.fire({
          icon: 'success',
          title: 'Partido agregado!',
          showConfirmButton: false,
          timer: 1500
        })

        this.listMatchAdmin();


      },
      error => {
        console.log(<any>error);

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
  findMatchId(id) {
    this._matchService.findMatchId(id).subscribe(
      res => {
        this.matchSelected = res.matchFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteMatchAdmin(idMatch) {
    this._matchService.deleteMatchUser(idMatch).subscribe(
      res => {
        console.log(res);


        this.listMatchAdmin();

      },
      error => {
        console.log(<any>error);

      }
    )
  }





















  pdfTeamsByLeague() {
    this._teamService.pdfTeamsByLeague(this.rutaID).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }






  getLeague() {
    this._leaguesService.findLeagueId(this.rutaID).subscribe(
      res => {
        this.leagueA = res.leagueFound;
        console.log(this.leagueA)
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  findLeagueId(id) {
    this._leaguesService.findLeagueId(id).subscribe(
      res => {
        this.leagueSelected = res.leagueFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
   listTableUser() {
    this._teamService.listTableUser(this.rutaID).subscribe(
      res => {
        this.team = res.teamFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listTableAdmin() {
    this._teamService.listTableAdmin(this.rutaID).subscribe(
      res => {
        this.team = res.teamFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  findTeamId(id) {
    this._teamService.findTeamId(id).subscribe(
      res => {
        this.teamSelected = res.teamFind;
        console.log(this.teamSelected)
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateTeamAdmin() {
    this._teamService.updateTeamAdmin(this.teamSelected).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateTeamUser() {
  this._teamService.updateTeamUser(this.teamSelected).subscribe(
    res => {
      console.log(res);
      this.listTeamUser();
    },
     error => {
        console.log(<any>error);

      }
    )
  }
  deleteTeamUser(idTeam) {
    this._teamService.deleteTeamUser(idTeam).subscribe(
      res => {
        console.log(res);
        this.listTeamUser()

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteTeamAdmin(idTeam) {
    this._teamService.deleteTeamAdmin(idTeam).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  addTeamUser() {
    console.log(this.addTeam);
      this._teamService.addTeamUser(this.addTeam, this.rutaID).subscribe(
        res => {
          console.log(res);
          this.listTeamUser();
        },
        error => {
          console.log(<any>error);
        }
      )
  }
  addTeamAdmin() {
    console.log(this.addTeam);
    this._teamService.addTeamAdmin(this.addTeam, this.rutaID).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log(<any>error);
      }
    )

  }
  listTeamUser() {
    this._teamService.listTeamUser(this.rutaID).subscribe(
      res => {
        console.log(res);
        this.team = res.teamFound;

      }
    )
  }
  /*pdfTeamsByLeague(idL) {
    this._teamService.pdfTeamsByLeague(this.rutaID).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }*/
}
