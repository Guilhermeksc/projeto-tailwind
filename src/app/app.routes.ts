import { Routes } from '@angular/router';
import { InicioComponent } from './pages/home/inicio/inicio.component';
import { Licitacao360Component } from './pages/home/licitacao360/licitacao360.component';
import { ContatosComponent } from './pages/home/contatos/contatos.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth/guard/auth-guard.service';
import { ValidateEmailComponent } from './core/auth/modules/validate-email/validate-email.component';
import { RegisterComponent } from './core/auth/modules/register/register.component';
import { PasswordResetComponent } from './core/auth/modules/password-reset/password-reset.component';	
import { ResetPasswordComponent } from './core/auth/modules/reset-password/reset-password.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/dashboard/content/calendar/calendar.component';
import { DashComponent } from './pages/dashboard/content/dash/dash.component';
import { ChatComponent } from './pages/dashboard/content/chat/chat.component';
import { ScrumViewComponent } from './pages/dashboard/content/scrum-view/scrum-view.component';
import { PgcComponent } from './pages/dashboard/content/pgc/pgc.component';
import { AnaliseComponent } from './pages/dashboard/content/analise/analise.component';
import { ApresentacaoComponent } from './pages/dashboard/content/apresentacao/apresentacao.component';
import { PrazosComponent } from './pages/dashboard/content/prazos/prazos.component';
import { PlanejamentoComponent } from './pages/dashboard/content/planejamento/planejamento.component';
import { LoginComponent } from './core/auth/modules/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'sobreProjeto', component: Licitacao360Component },
      { path: 'contatos', component: ContatosComponent },
      { path: 'validate-email/:token', component: ValidateEmailComponent },
      { path: 'password-reset', component: PasswordResetComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege a rota principal do dashboard
    canActivateChild: [AuthGuard], // Protege as rotas filhas do dashboard
    children: [
      { path: 'calendar', component: CalendarComponent },
      { path: 'dash', component: DashComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'scrum-view', component: ScrumViewComponent },
      { path: 'pgc', component: PgcComponent },
      { path: 'analise', component: AnaliseComponent },
      { path: 'apresentacao', component: ApresentacaoComponent },
      { path: 'prazos', component: PrazosComponent },
      { path: 'planejamento', component: PlanejamentoComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
