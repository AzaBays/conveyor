import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-decisions-page',
  template: `
    <div class="w-100 h-100 d-flex flex-column">
      <div class="application">
        <div class="application-content mr-2" (scroll)="onScroll($event)">
          <app-breadcrumb
            [titleState]="true"
            [titleFrom]="'application'"
          ></app-breadcrumb>
          <div class="position-sticky bg-white" style="top: 0; z-index: 99">
            <app-application-info></app-application-info>
            <div
              class="d-flex align-items-center radius-5 bg-gray-border mt-2 py-1 px-3"
            >
              <div
                class="btn btn-white text-gray text-medium d-flex align-items-center hover-color-accent-light text-12"
              >
                <i class="uil-edit-alt mr-1 text-18"></i>
                Создать анкету
              </div>

              <div class="d-flex align-items-center ml-4">
                <div class="text-gray text-12 text-medium mr-1 lh-16">
                  Разрешить редактировать другим
                </div>
                <label class="custom-toggle">
                  <input type="checkbox" />
                  <div class="custom-toggle-track">
                    <div class="custom-toggle-track-thumb"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="application-wrapper-alt mt-3">
            <div
              class="card-alt d-flex flex-column justify-content-between"
              *ngFor="let card of decisions; index as i"
            >
              <div>
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <div class="p-1 bg-gray-border radius-5">
                    <i class="text-32" [class]="card.icon"></i>
                  </div>
                  <div
                    class="p-1 radius-5 text-medium"
                    [ngClass]="{
                      'status-complete': card.status === 0,
                      'status-working': card.status === 1,
                      'status-denied': card.status === 2,
                      'status-sent': card.status === 3
                    }"
                  >
                    {{
                      card.status === 0
                        ? 'Завершено'
                        : card.status === 3
                        ? 'В процессе'
                        : card.status === 2
                        ? 'Ошибка'
                        : ''
                    }}
                  </div>
                </div>
                <div class="text-24 text-semibold mb-1">{{ card.title }}</div>
                <div class="text-14 lh-18 text-medium text-gray mb-3">
                  {{ card.description }}
                </div>
              </div>
              <div>
                <div
                  class="border-dashed-all-1 border-gray-border py-2 px-3 radius-5 w-50 mb-2"
                >
                  <div class="text-semibold lh-18">
                    {{ formatDate(card.startDate, 'll', 'uz') }}
                  </div>
                  <div class="text-gray lh-18">Дата начала</div>
                </div>
                <div
                  class="border-dashed-all-1 border-gray-border py-2 px-3 radius-5 w-50 mb-3"
                >
                  <div class="text-semibold lh-18">
                    {{ card.completeFieldCount }}/{{ card.fieldCount }}
                  </div>
                  <div class="text-gray lh-18">Заполнено</div>
                </div>
                <progress-bar
                  class="custom-progress"
                  [progress]="
                    getProgress(card.completeFieldCount, card.fieldCount)
                  "
                  [disable-percentage]="true"
                  [color]="'#488aff'"
                  [color-degraded]="{
                    '0': '#FF4A4A',
                    '36': '#F4E6AD',
                    '99': '#0BB990'
                  }"
                >
                </progress-bar>
                <div class="d-flex align-items-center mt-2">
                  <div
                    class="card-alt-user-badge border-all-2 border-white"
                    *ngFor="let avatar of card.user"
                  >
                    <img
                      *ngIf="card.user.length"
                      src="assets/images/user-illustrate.png"
                      alt=""
                    />
                  </div>
                  <div
                    class="card-alt-user-badge border-all-2 border-gray-border text-gray-border"
                    *ngIf="card.user.length === 0"
                  >
                    <i class="fas fa-user text-26"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="application-navigation" #navSidebar>
          <!--          <div class="application-navigation-title">Содержание</div>-->
          <!--          <details class="navigation" open>-->
          <!--            <summary>-->
          <!--              <i class="fas fa-caret-right mr-1"></i>-->
          <!--              <span class="mr-1">1</span> Заявление на получение кредита-->
          <!--            </summary>-->
          <!--            <div class="navigation-list">-->
          <!--              <div-->
          <!--                class="navigation-list-item"-->
          <!--                [class.navigation-list-item-active]="activeForm === i"-->
          <!--                *ngFor="let item of cardList; index as i"-->
          <!--                (click)="goToCard($event, i, item.name)"-->
          <!--              >-->
          <!--                {{ item.title }}-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </details>-->
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class DecisionsPageComponent implements OnInit {
  @ViewChild('navSidebar') navSidebar: any;

  decisions = [
    {
      name: 'underwriter',
      title: 'Андеррайтер',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      icon: 'uil-bag-alt',
      status: 3,
      startDate: new Date(2021, 10, 11),
      fieldCount: 100,
      completeFieldCount: 32,
      user: Array(1),
    },
    {
      name: 'credit-committee',
      title: 'Кредитный комитет',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      icon: 'uil-file-check-alt',
      status: 3,
      startDate: new Date(2021, 9, 8),
      fieldCount: 88,
      completeFieldCount: 84,
      user: Array(3),
    },
    {
      name: 'mfi',
      title: 'МФИ',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      icon: 'uil-file-copy-alt',
      status: 0,
      startDate: new Date(2021, 9, 8),
      fieldCount: 88,
      completeFieldCount: 88,
      user: Array(2),
    },
    {
      name: 'credit-manager',
      title: 'Кредитный Менеджер',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      icon: 'uil-file-alt',
      status: 3,
      startDate: new Date(2021, 4, 18),
      fieldCount: 188,
      completeFieldCount: 104,
      user: Array(0),
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onScroll(evt: any): void {
    this.navSidebar.nativeElement.style.height =
      evt.target.scrollTop !== 0 ? '100%' : '';
  }

  formatDate(date: any, format: string, locale = 'ru'): any {
    return moment(date).locale(locale).format(format);
  }

  getProgress(completeFieldCount: number, fieldCount: number): string {
    return String(parseFloat(String((100 * completeFieldCount) / fieldCount)));
  }
}
