import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ContentComponent } from './pages/content/content.component';
import { MainComponent } from './pages/main/main.component';
import { CreditConveyorComponent } from './pages/credit-conveyor/credit-conveyor.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SearchPageComponent } from './pages/credit-conveyor/components/msb-credits/search-page/search-page.component';
import { MsbCreditsComponent } from './pages/credit-conveyor/components/msb-credits/msb-credits.component';
import { ListPageComponent } from './pages/credit-conveyor/components/msb-credits/list-page/list-page.component';
import { StatementPageComponent } from './pages/credit-conveyor/components/msb-credits/statement-page/statement-page.component';
import { QuestionnairePageComponent } from './pages/credit-conveyor/components/msb-credits/questionnaire-page/questionnaire-page.component';
import { DecisionsPageComponent } from './pages/credit-conveyor/components/msb-credits/decisions-page/decisions-page.component';
import { ConclusionsPageComponent } from './pages/credit-conveyor/components/msb-credits/conclusions-page/conclusions-page.component';
import { FilesPageComponent } from './pages/credit-conveyor/components/msb-credits/files-page/files-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pages',
    component: ContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'credit',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'credit',
        component: CreditConveyorComponent,
        data: {
          breadcrumb: 'Кредитный конвеер',
          path: 'credit',
        },
        children: [
          {
            path: '',
            redirectTo: 'msb-credit',
            pathMatch: 'full',
          },
          {
            path: 'msb-credit',
            component: MsbCreditsComponent,
            data: {
              breadcrumb: 'МСБ',
              path: 'msb-credit',
            },
            children: [
              {
                path: '',
                component: ListPageComponent,
              },
              // {
              //   path: 'list',
              //   component: ListPageComponent,
              // },
              {
                path: 'search-by-tin',
                component: SearchPageComponent,
                data: {
                  breadcrumb: 'Поиск по ИНН',
                  path: 'search-by-tin',
                },
              },
              {
                path: 'statement',
                component: StatementPageComponent,
                data: {
                  breadcrumb: 'Заявление',
                  path: 'statement',
                },
              },
              {
                path: 'questionnaire',
                component: QuestionnairePageComponent,
                data: {
                  breadcrumb: 'Анкета',
                  path: 'questionnaire',
                },
              },
              {
                path: 'decisions',
                component: DecisionsPageComponent,
                data: {
                  breadcrumb: 'Анкета',
                  path: 'decisions',
                },
              },
              {
                path: 'conclusions',
                component: ConclusionsPageComponent,
                data: {
                  breadcrumb: 'Анкета',
                  path: 'conclusions',
                },
              },
              {
                path: 'files',
                component: FilesPageComponent,
                data: {
                  breadcrumb: 'Анкета',
                  path: 'files',
                },
              },
            ],
          },
        ],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
