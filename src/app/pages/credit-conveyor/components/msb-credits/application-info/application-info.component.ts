import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../../../services/application.service';

@Component({
  selector: 'app-application-info',
  template: `
    <div class="pt-2 px-3 border-all-1 border-gray-border radius-5">
      <div
        style="display: grid; grid-template-columns: 3fr 1fr 1fr 354px; grid-gap: 26px"
        class="align-items-start mb-2"
      >
        <div class="">
          <div class="text-gray lh-20">Наименование клиента:</div>
          <div class="text-16 text-semibold lh-20 text-logo-main">
            "FLEXIT" mas‘uliyati cheklangan jamiyati
          </div>
        </div>
        <div class="text-overflow-nowrap px-3 border-left-1 border-gray-border">
          <div class="text-gray lh-20">ИНН клиента:</div>
          <div class="text-16 text-semibold lh-20 ls-2 text-logo-main">
            307656831
          </div>
        </div>
        <div class="text-overflow-nowrap px-3 border-x-1 border-gray-border">
          <div class="text-gray lh-20">Заявление #</div>
          <div class="text-16 text-semibold lh-20 ls-2 text-logo-main">
            0092112
          </div>
        </div>
        <div class="text-overflow-nowrap">
          <div class="row">
            <div class="col-4">
              <div class="text-gray lh-20">Кол-во полей</div>
              <div
                class="text-12 text-semibold lh-16 d-flex align-items-center"
              >
                <span class="text-logo-main">117/312</span>
                <span class="status status-working lh-14 ml-2">38%</span>
              </div>
            </div>
            <div class="col-4">
              <div class="text-gray lh-20">Обяз. поля</div>
              <div
                class="text-12 text-semibold lh-16 d-flex align-items-center"
              >
                <span class="text-logo-main">114/287</span>
                <span class="status status-complete lh-14 ml-2">40%</span>
              </div>
            </div>
            <div class="col-4">
              <div class="text-gray lh-20">Не обяз. поля</div>
              <div
                class="text-12 text-semibold lh-16 d-flex align-items-center"
              >
                <span class="text-logo-main">3/25</span>
                <span class="status status-denied lh-14 ml-2">16%</span>
              </div>
            </div>
          </div>
          <div class="mt-1">
            <div
              class="d-flex justify-content-between align-items-center text-medium text-12 lh-20"
            >
              <div class=" text-gray">Заполнено:</div>
              <div class=" text-logo-main">117/312</div>
            </div>
            <progress-bar
              class="custom-progress"
              [progress]="'100'"
              [disable-percentage]="true"
              [color]="'#488aff'"
              [color-degraded]="{
                '0': '#FF4A4A',
                '36': '#F4E6AD',
                '99': '#0BB990'
              }"
            >
            </progress-bar>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <div
            *ngFor="
              let item of applicationService.applicationTabs;
              index as i;
              let last = last
            "
            class="text-uppercase mr-4 text-gray text-medium cursor-pointer pb-1 border-bottom-3"
            [ngClass]="{
              'text-blue-action border-blue-action': activeTab === item.value
            }"
            [routerLink]="
              '/pages/credit/msb-credit/' +
              applicationService.applicationTabs[i].value
            "
          >
            {{ item.label }}
          </div>
        </div>
        <div class="d-flex align-items-center text-10 text-gray">
          <div class="mr-1">Создатель: Каримов А.А.</div>
          <div class="mr-1">Создано: 10.09.2021 12:00</div>
          <div>Обновлено: 10.09.2021 12:00</div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ApplicationInfoComponent implements OnInit {
  activeTab = 'statement';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((value) => {
      this.activeTab = value.path;
    });
  }
}
