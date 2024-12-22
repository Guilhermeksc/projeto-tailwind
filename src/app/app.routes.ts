import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Licitacao360Component } from './pages/home/licitacao360/licitacao360.component';
import { ContatosComponent } from './pages/home/contatos/contatos.component';
import { AuthGuard } from './core/services/auth-guard.service';

import { RegisterComponent } from './pages/home/register/register.component';


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

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'licitacao360', component: Licitacao360Component },
    { path: 'contatos', component: ContatosComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '360',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege a rota do Dashboard
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
  { path: '**', redirectTo: '' },
];
