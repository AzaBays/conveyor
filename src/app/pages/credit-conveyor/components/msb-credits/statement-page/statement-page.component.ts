import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsbCardDialogComponent } from '../msb-card-dialog/msb-card-dialog.component';
import { ApplicationService } from '../../../../../services/application.service';

@Component({
  selector: 'app-statement-page',
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
          <div class="application-wrapper pt-2">
            <div
              *ngFor="let item of cardList; index as i"
              class="card py-2 px-3"
              [class.border-blue-action]="activeForm === i"
              [id]="item.name"
            >
              <div
                class="card-alert"
                [class.border-blue-action]="activeForm === i"
              >
                Есть незаполненные поля
              </div>
              <div class="card-header">
                <div>
                  <div class="card-header-content">
                    <div class="card-header-icon">
                      <i
                        [class]="item.icon"
                        [ngStyle]="{ color: item.iconColor }"
                      ></i>
                    </div>
                    <div class="card-header-title">
                      {{ item.title }}
                    </div>
                  </div>
                  <div class="card-header-description">
                    {{ item.description }}
                  </div>
                </div>
                <div class="card-header-action">
                  <div class="card-header-action-progress">
                    <div
                      class="d-flex justify-content-between align-items-center text-medium text-12 lh-20"
                    >
                      <div class=" text-gray">Заполнено:</div>
                      <div class=" text-logo-main">{{getCompletedCount(item.form)}}/{{item.form?.length}}</div>
                    </div>
                    <progress-bar
                      class="custom-progress"
                      [progress]="item.formCompleted"
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
                  <div
                    class="card-header-action-btn"
                    (click)="openDialog(item, i)"
                  >
                    <i class="uil-edit-alt mr-1"></i>
                    Заполнить
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="application-navigation" #navSidebar>
          <div class="application-navigation-title">Содержание</div>
          <details class="navigation" open>
            <summary>
              <i class="fas fa-caret-right mr-1"></i>
              <span class="mr-1">1</span> Заявление на получение кредита
            </summary>
            <div class="navigation-list">
              <div
                class="navigation-list-item"
                [class.navigation-list-item-active]="activeForm === i"
                *ngFor="let item of cardList; index as i"
                (click)="goToCard($event, i, item.name)"
              >
                {{ item.title }}
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class StatementPageComponent implements OnInit {
  @ViewChild('navSidebar') navSidebar: any;
  activeForm = null;
  cardList = [];

  constructor(
    public dialog: MatDialog,
    public applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationService.getCards().then(value => {
      // this.cardList = value?.statementCards;
      if (value) {
        this.applicationService.cardsList.subscribe(value1 => {
          this.cardList = [...value1?.statementCards, ...value1?.documentsCards];
        });
      }
    });
  }

  openDialog(item: object, i: number): void {
    this.activeForm = i;

    const dialogRef = this.dialog.open(MsbCardDialogComponent, {
      width: '1138px',
      height: '80%',
      data: { item, listName: 'statementCards' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onScroll(evt: any): void {
    this.navSidebar.nativeElement.style.height =
      evt.target.scrollTop !== 0 ? '100%' : '';
  }

  goToCard(evt: any, i: number, target: string): void {
    this.activeForm = i;

    document
      .querySelector(`#${target}`)
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  getCompletedCount(form: any): any {
    return form?.filter((el: any) => el.isCompleted)?.length;
  }
}
