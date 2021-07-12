import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListusersComponent } from './components/listusers/listusers.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { LeaguesUserComponent } from './components/leagues-user/leagues-user.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamsLeagueComponent } from './components/teams-league/teams-league.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ListusersComponent,
    AdminHomeComponent,
    LeaguesComponent,
    ProfileComponent,
    MainHomeComponent,
    LeaguesUserComponent,
    TeamsComponent,
    TeamsLeagueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
