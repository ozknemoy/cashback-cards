import {HomeComponent} from "../app/home/home.component";
import {RegistrationView} from "../app/registration/registration-view";
import {LoginView} from "../app/login/login.component";
import {PartnerView} from "../app/partner/partner.component";
import {AuthGuard} from "../services/auth-guard.service";
import {PartnersView} from "../app/partners/partners.component";
import {ProfileMainView} from "../app/profile/profile-main.component";
import {AppComponent} from "../app/app.component";
import {ProfileView} from "../app/profile/profile.component";
import {ProfileSettingsView} from "../app/profile/profile-settings.component";
import {ProfileHistoryView} from "../app/profile/profile-history.component";
import {ActionView} from "../app/action/action.component";

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'registration', component: RegistrationView},
  { path: 'partners', component: PartnersView},
  { path: 'partner/:id', component: PartnerView},
  { path: 'action/:id', component: ActionView},
  { path: 'login', component: LoginView},
  { path: 'profile', component: ProfileView, canActivate: [AuthGuard],
    children: [
      {path: 'main', component: ProfileMainView, pathMatch: 'full'},
      {path: 'settings', component: ProfileSettingsView},
      {path: 'history', component: ProfileHistoryView},
    ]},


  { path: 'geo', loadChildren: '../app/geo/geo.module#GeoModule',
    /*canActivate: [AuthGuard], canLoad: [AuthGuard]*/},
];

export const routesComponent = [
  AppComponent,
  HomeComponent,
  RegistrationView,
  PartnersView,
  PartnerView,
  LoginView,
  ProfileView,
  ProfileMainView,
  ProfileSettingsView,
  ProfileHistoryView,
  ActionView,
];