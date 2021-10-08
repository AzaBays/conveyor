import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import * as moment from 'moment';

@Component({
  selector: 'app-conveyor-table',
  template: `
    <div class="conveyor-table h-100">
      <div class="table d-flex flex-column overflow overflow-y-auto">
        <div class="thead">
          <div class="trow">
            <div class="th"><div class="w-100 pl-2">ID#</div></div>
            <div class="th">
              <div class="w-100">
                ИНН
                <span class="px-1 cursor-pointer text-blue">
                  <i
                    class="fas fa-exchange-alt"
                    style="transform: rotate(90deg)"
                  ></i>
                </span>
              </div>
            </div>
            <div class="th">
              <div class="w-100">
                Организация
                <span class="px-1 cursor-pointer text-blue">
                  <i class="fas fa-long-arrow-alt-up"></i>
                </span>
              </div>
            </div>
            <div class="th">
              <div class="w-100">
                Дата и время
                <span class="px-1 cursor-pointer text-blue">
                  <i class="fas fa-long-arrow-alt-down"></i>
                </span>
              </div>
            </div>
            <div class="th"><div class="w-100">Статус</div></div>
          </div>
        </div>
        <div class="tbody ">
          <div
            class="trow cursor-pointer"
            *ngFor="
              let item of mainService.creditList
                | paginate: mainService.conPaginatorConfig;
              index as i
            "
            [class.trow-checked]=""
            routerLink="../msb-credit/statement"
          >
            <div class="td">
              <div class="w-100 pl-2">
                {{ item._id }}
              </div>
            </div>
            <div class="td">{{item.inn}}</div>
            <div class="td">
              <div class="text-overflow-ellipsis">
                {{ item.organization }}
              </div>
            </div>
            <div class="td">
              <div class="w-100" style="display:grid; grid-template-columns: repeat(2, 1fr)">
                <span>{{ formatDate(item.date, 'L') }}</span>
                <span>{{ formatDate(item.date, 'LT') }}</span>
              </div>
            </div>
            <div class="td">
              <span
                class="status"
                [ngClass]="{
                  'status-complete': item.status === 0,
                  'status-working': item.status === 1,
                  'status-denied': item.status === 2
                }"
              >
                {{
                  item.status === 0
                    ? 'Успешно'
                    : item.status === 1
                    ? 'В обработке'
                    : item.status === 2
                    ? 'Ошибка'
                    : ''
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <app-pager
        [pager]="mainService.conPaginatorConfig"
        [id]="'conveyor'"
        (pagerConfig)="perPageCount($event)"
        [bg]="true"
      ></app-pager>
    </div>
  `,
  styles: [],
})
export class ConveyorTableComponent implements OnInit {
  constructor(public mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getMsbCreditList().subscribe();
  }

  perPageCount(evt: any): any {
    this.mainService.conPaginatorConfig = evt;
  }

  formatDate(date: any, format: string, locale = 'ru'): any {
    return moment(date).locale(locale).format(format);
  }
}
