import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leagues } from 'src/app/models/league.model';
import { LeaguesService } from 'src/app/services/leagues.service';
import { TeamService } from 'src/app/services/team.service';
import { UsersService } from 'src/app/services/users.service';
import { Team } from '../../models/team.model'
import {Match} from '../../models/match.model'
import Swal from "sweetalert2";
import { MatchService } from 'src/app/services/match.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [ TeamService, UsersService, LeaguesService, MatchService ]
})
export class TeamsComponent implements OnInit {
  public leagueA;
  public teamT;
  public diferent;
  public persona;
  public leagueSelected: Leagues;
  public teamSelected: Team;
  public addTeam: Team;
  public rutaID: String;
  //------------------
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
    if(this._teamService.getPersona().role == 0){
        this.listTableAdmin();
        this.listMatchAdmin()

    }else{

    this.listTableUser();}
  }

  listMatchAdmin(){
    this._matchService.listMatchAdmin(this.rutaID).subscribe(
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
    this._matchService.addMatchAdmin(this.addMatch, this.rutaID).subscribe(
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
    this._matchService.deleteMatchAdmin(idMatch).subscribe(
      res => {
        console.log(res);


        this.listMatchAdmin();
      },
      error => {
        console.log(<any>error);

      }
    )
  }





























  getLeague(id) {
    this._leaguesService.findLeagueId(id).subscribe(
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
        this.teamT = res.tableFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listTableAdmin() {
    this._teamService.listTableAdmin(this.rutaID).subscribe(
      res => {
        this.teamT = res.tableFound;
        this.diferent = res.tableFound.goalA - res.tableFound.goalC;
        console.log(this.teamT)
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

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateTeamAdmin() {
    this._teamService.updateTeamAdmin(this.teamSelected).subscribe(
      res => {
        console.log(this.teamSelected._id);
        this.listTableAdmin();
      },
      error => {
        console.log(<any>error);
        console.log(this.teamSelected._id);

      }
    )
  }
  updateTeamUser() {
  this._teamService.updateTeamUser(this.teamSelected).subscribe(
    res => {
      console.log(res);
      this.listTableUser();
      this.listTableAdmin();
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

        this.listTableUser();
        this.listTableAdmin();
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


        this.listTableAdmin();
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
          this.listTableAdmin();
          this.listTableUser();

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
        Swal.fire({
          icon: 'success',
          title: 'Equipo agregado!',
          showConfirmButton: false,
          timer: 1500
        })
        this.addTeam.name = "";
        this.addTeam.img = "";

        this.listTableAdmin();


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
















}

