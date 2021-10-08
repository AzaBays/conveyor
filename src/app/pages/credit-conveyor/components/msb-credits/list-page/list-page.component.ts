import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MainService} from "../../../../../services/main.service";

@Component({
  selector: 'app-list-page',
  template: `
    <div class="w-100 h-100">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="text-medium text-20 text-logo-main">МСБ Кредиты</div>
        <div
          class="btn btn-logo-main text-white text-medium "
          routerLink="../msb-credit/search-by-tin"
        >
          Новая заявка
        </div>
      </div>
      <div class="d-flex border-bottom-1 border-gray-border mb-2">
        <div
          class="text-gray text-medium border-bottom-2 py-1 mr-5 cursor-pointer"
          [ngClass]="{ 'border-logo-main text-logo-main': activeTab === i }"
          *ngFor="let tab of tabs; index as i"
          (click)="activeTab = i; addRouteParams()"
        >
          {{ tab.tabTitle }}
        </div>
      </div>
      <div
        class="search-field py-1 px-2 bg-gray-border d-flex align-items-center mb-2"
      >
        <label class="flex-grow-1 d-flex align-items-center mr-2">
          <i class="uil-search text-16 text-gray mr-1"></i>
          <input
            class="flex-grow-1 cursor-pointer"
            type="text"
            placeholder="Поиск по ID, кредитам, организациям, клиентам и др..."
          />
        </label>
        <div class="search-field-btn cursor-pointer d-flex align-items-center">
          <i class="uil-filter text-16 mr-1"></i>
          Фильтр
        </div>
      </div>
      <div class="conveyor-list">
        <app-conveyor-table></app-conveyor-table>
      </div>
    </div>
  `,
  styles: [],
})
export class ListPageComponent implements OnInit {
  tabs = [
    {
      tabTitle: 'Новые заявки',
      tabValue: 'new-requests',
    },
    {
      tabTitle: 'Анкеты',
      tabValue: 'application-forms',
    },
    {
      tabTitle: 'Ожидание МФИ',
      tabValue: 'MFI',
    },
    {
      tabTitle: 'Ожидание aндеррайтера',
      tabValue: 'underwriter',
    },
  ];
  activeTab = 0;

  constructor(private router: Router, private route: ActivatedRoute, public mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getInnResult().subscribe();
    this.addRouteParams();
  }

  addRouteParams(): void {
    this.router.navigate([], {
      queryParams: { tab: this.tabs[this.activeTab].tabValue },
    });
  }
}
