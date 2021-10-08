import {Component, Input, OnInit, Output} from '@angular/core';
import { MsbCardDialogComponent } from '../msb-card-dialog/msb-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-msb-card',
  template: `
    <div class="card py-2 px-3" [class.border-blue-action]="">
      <div class="card-alert" [class.border-blue-action]="">
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
              <div class=" text-logo-main">117/312</div>
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
  `,
  styles: [],
})
export class MsbCardComponent implements OnInit {
  @Input() item: any;
  @Input() i: any;
  @Input() activeForm: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(item: object, i: number): void {
    const dialogRef = this.dialog.open(MsbCardDialogComponent, {
      width: '1138px',
      height: '80%',
      data: { item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
