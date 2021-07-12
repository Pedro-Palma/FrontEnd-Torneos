import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { ListusersComponent } from './components/listusers/listusers.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { LeaguesUserComponent } from './components/leagues-user/leagues-user.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamsLeagueComponent } from './components/teams-league/teams-league.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: ListusersComponent},
  //{path: 'adminHome', component: AdminHomeComponent},
  {path: 'leagues', component: LeaguesComponent},
  {path: 'profile/:idUser', component: ProfileComponent},
  {path: 'home', component: MainHomeComponent},
  {path: 'leaguesUser/:idUser', component: LeaguesUserComponent},
  {path: 'teams/:idLeague', component: TeamsComponent},
  {path: 'teamsLeague/:idLeague',component: TeamsLeagueComponent},
  {path: '**', redirectTo: '/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
