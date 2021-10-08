import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../../../services/main.service';
import * as moment from 'moment';

@Component({
  selector: 'app-search-page',
  template: `
    <div class="search-page w-100 h-100 d-flex flex-column">
      <app-breadcrumb class="border-bottom-1 border-gray-border"></app-breadcrumb>
      <div
        class="container flex-grow-1 overflow overflow-y-auto d-flex align-items-center"
      >
        <div class="row w-100 align-items-baseline" style="height: 510px">
          <div class="col-5 pr-5 border-right-1 border-gray-border">
            <div class="d-flex align-items-center">
              <div class="mr-2">
                <img src="assets/images/search.svg" alt="" />
              </div>
              <div class="text-bold text-blue text-20">Поиск по ИНН</div>
            </div>
            <form
              [formGroup]="form"
              class="mt-3 pb-2 border-bottom-1 border-gray-border"
            >
              <div class="form-field">
                <div class="form-field-title"></div>
                <label
                  class="form-field-label form-field-group"
                  [ngClass]="{
                    invalid: form.get('search').errors?.minlength,
                    valid: form.get('search').valid
                  }"
                >
                  <input
                    #formControl
                    type="text"
                    class="form-control"
                    [attr.focused]="false"
                    formControlName="search"
                    placeholder="ИНН - 9 значное число"
                    mask="000000000"
                    [validation]="true"
                    (focus)="logger($event)"
                    (blur)="logger(formControl)"
                  />
                  <button
                    type="submit"
                    class="form-btn btn-blue text-white text-uppercase form-control-append text-12"
                    [disabled]="form.invalid"
                  >
                    найти
                  </button>
                </label>
                <button
                  class="form-field-hint"
                  *ngIf="
                    form.get('search').errors && form.get('search').touched
                  "
                >
                  <span
                    class="form-field-hint-text"
                    [class.invalid-text]="form.get('search').errors?.minlength"
                  >
                    Неправильный ввод данных! Количество символов должна быть не
                    менее
                    {{ form.get('search').errors?.minlength.requiredLength }}.
                    Текущее количество
                    {{ form.get('search').errors?.minlength.actualLength }}
                  </span>
                </button>
                <button
                  class="form-field-hint"
                  *ngIf="
                    !form.get('search').value && form.get('search').touched
                  "
                >
                  <span class="form-field-hint-text">
                    Введите 9-ти значный код ИНН
                  </span>
                </button>
              </div>
            </form>
            <div class="row align-items-center mt-3">
              <div class="col-8">
                <div class="text-bold text-16">Статистика по поиску</div>
              </div>
              <div class="col-4">
                <label class="form-field-label">
                  <ng-select
                    [items]="periodOptions"
                    [(ngModel)]="activePeriod"
                    [clearable]="false"
                    [searchable]="false"
                    class="w-100"
                  ></ng-select>
                </label>
              </div>
            </div>
            <div class="mt-3">
              <div class="table d-flex flex-column overflow overflow-y-auto">
                <div class="thead border-none">
                  <div
                    class="trow"
                    style="display:grid; grid-template-columns: 2fr 1fr"
                  >
                    <div class="th pl-1">Статус</div>
                    <div class="th">
                      <div class="w-100 text-align-center">Количество</div>
                    </div>
                  </div>
                </div>
                <div class="tbody">
                  <div
                    class="trow border-top-1 border-gray-border hover-effect-none"
                    *ngFor="let item of statisticList; index as i"
                    style="display:grid; grid-template-columns: 2fr 1fr;"
                  >
                    <div class="td pl-1">
                      <span
                        class="status"
                        [ngClass]="{
                          'status-complete': item.statusValue === 0,
                          'status-working': item.statusValue === 1,
                          'status-denied': item.statusValue === 2
                        }"
                      >
                        {{ item.statusLabel }}
                      </span>
                    </div>
                    <div class="td">
                      <div class="w-100 text-align-center">
                        {{ item.count }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-7 pl-5">
            <div class="text-bold text-blue text-20">Результат поиска</div>
            <div class="result-table mt-3">
              <div class="table d-flex flex-column overflow overflow-y-auto">
                <div class="thead">
                  <div class="trow">
                    <div class="th"><div class="w-100 pl-2">№</div></div>
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
                        Статус
                        <span class="px-1 cursor-pointer text-blue">
                          <i class="fas fa-long-arrow-alt-up"></i>
                        </span>
                      </div>
                    </div>
                    <div class="th">
                      <div class="w-100">Дата</div>
                    </div>
                    <div class="th">
                      <div class="w-100 text-align-center">Действие</div>
                    </div>
                  </div>
                </div>
                <div class="tbody ">
                  <div
                    class="trow cursor-pointer"
                    *ngFor="
                      let item of mainService.innResultList
                        | paginate: mainService.innPaginatorConfig;
                      index as i
                    "
                    [class.trow-checked]=""
                  >
                    <div class="td">
                      <div class="w-100 pl-2">
                        {{ i + 1 }}
                      </div>
                    </div>
                    <div class="td">{{ item?.inn }}</div>
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
                    <div class="td">
                      <div class="w-100">
                        {{ formatDate(date(item.date), 'L') }}
                      </div>
                    </div>
                    <div class="td">
                      <div class="w-100 text-align-center">
                        <i
                          class="uil-check-circle mx-1"
                          [class]="[
                            item.status === 0 ? 'text-green' : 'text-gray-border'
                          ]"
                        ></i>
                        <i class="uil-times text-red mx-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <app-pager
                [pager]="mainService.innPaginatorConfig"
                [id]="'inn'"
                (pagerConfig)="perPageCount($event)"
                [bg]="false"
              ></app-pager>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SearchPageComponent implements OnInit {
  activePeriod = null;
  periodOptions = [
    {
      label: 'За вчера',
      value: 'yesterday',
    },
    {
      label: 'За сегодня',
      value: 'today',
    },
    {
      label: 'За неделю',
      value: 'week',
    },
    {
      label: 'За месяц',
      value: 'month',
    },
    {
      label: 'За год',
      value: 'year',
    },
    {
      label: 'За все время',
      value: 'all',
    },
  ];

  statisticList = [
    {
      statusLabel: 'Успешно',
      statusValue: 0,
      count: 24,
    },
    {
      statusLabel: 'В обработке',
      statusValue: 1,
      count: 16,
    },
    {
      statusLabel: 'Ошибок',
      statusValue: 2,
      count: 33,
    },
  ];

  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public mainService: MainService
  ) {
    this.form = this.fb.group({
      search: [null, [Validators.required, Validators.minLength(9)]],
    });
  }

  ngOnInit(): void {
    this.activePeriod = this.periodOptions[3];

    this.mainService.getInnResult().subscribe();
  }

  perPageCount(evt: any): any {
    this.mainService.innPaginatorConfig = evt;
  }

  formatDate(date: any, format: string, locale = 'ru'): any {
    return moment(date).locale(locale).format(format);
  }
  date(date: any): any {
    return new Date(date);
  }

  logger(pld: any): any {
    console.dir(pld);
  }
}
