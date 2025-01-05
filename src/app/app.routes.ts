import { Routes } from '@angular/router';
import { InicioComponent } from './pages/home/inicio/inicio.component';
import { Licitacao360Component } from './pages/home/licitacao360/licitacao360.component';
import { ContatosComponent } from './pages/home/contatos/contatos.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth/auth-guard.service';
import { ValidateEmailComponent } from './core/auth/validate-email/validate-email.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { PasswordChangeComponent } from './core/auth/password-change/password-change.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './core/auth/login/login.component';
import { ResetPasswordComponent } from './core/auth/reset/reset-password/reset-password.component';
import { InvalidResetComponent } from './core/auth/reset/invalid-reset/invalid-reset.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/dashboard/content/calendar/calendar.component';
import { DashComponent } from './pages/dashboard/content/dash/dash.component';
import { ChatComponent } from './pages/dashboard/content/chat/chat.component';
import { ScrumBoardComponent } from './pages/dashboard/content/scrum-board/scrum-board.component';
import { PgcComponent } from './pages/dashboard/content/pgc/pgc.component';
import { AnaliseComponent } from './pages/dashboard/content/analise/analise.component';
import { ApresentacaoComponent } from './pages/dashboard/content/apresentacao/apresentacao.component';
import { PrazosComponent } from './pages/dashboard/content/prazos/prazos.component';
import { PlanejamentoComponent } from './pages/dashboard/content/planejamento/planejamento.component';
import { ComprasnetContratosComponent } from './pages/dashboard/content/comprasnet-contratos/comprasnet-contratos.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent}, 
      { path: 'inicio', component: InicioComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'sobreProjeto', component: Licitacao360Component },
      { path: 'contatos', component: ContatosComponent },
      { path: 'validate-email/:token', component: ValidateEmailComponent },
      { path: 'change-password', component: PasswordChangeComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent },
      { path: 'reset-password/invalid', component: InvalidResetComponent },
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
      { path: 'scrum-view', component: ScrumBoardComponent },
      { path: 'pgc', component: PgcComponent },
      { path: 'analise', component: AnaliseComponent },
      { path: 'apresentacao', component: ApresentacaoComponent },
      { path: 'prazos', component: PrazosComponent },
      { path: 'planejamento', component: PlanejamentoComponent },
      { path: 'comprasnet-contratos', component: ComprasnetContratosComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
