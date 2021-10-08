import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../../../../services/application.service';

@Component({
  selector: 'app-msb-card-dialog',
  template: `
    <div class="card-dialog">
      <div class="card-dialog-close" (click)="closePopup()">
        <i class="uil-times"></i>
      </div>
      <div class="card py-2 px-5">
        <div class="card-alert">Есть незаполненные поля</div>
        <div class="card-header">
          <div>
            <div class="card-header-content">
              <div class="card-header-icon">
                <i
                  [class]="data.item.icon"
                  [ngStyle]="{ color: data.item.iconColor }"
                ></i>
              </div>
              <div class="card-header-title">
                {{ data.item.title }}
              </div>
            </div>
            <div class="card-header-description">
              {{ data.item.description }}
            </div>
          </div>
          <div class="card-header-action">
            <div class="card-header-action-progress">
              <div
                class="d-flex justify-content-between align-items-center text-medium text-12 lh-20"
              >
                <div class=" text-gray">Заполнено:</div>
                <div class=" text-logo-main">
                  {{ getCompletedCount(data.item.form) }}/{{
                    data.item.form?.length
                  }}
                </div>
              </div>
              <progress-bar
                class="custom-progress"
                [progress]="data.item?.formCompleted"
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
      </div>
      <form
        class="card-dialog-form px-5"
        [formGroup]="form"
        *ngIf="data.item.form"
      >
        <div class="card-dialog-form-grid">
          <app-form-field
            *ngFor="let control of data.item.form; index as i; let last = last"
            [formControlName]="control['controlName']"
            [control]="control"
          ></app-form-field>

          {{ form.value | json }}
        </div>
      </form>
      <app-document-list class="flex-grow-1 overflow overflow-y-auto mx-3 my-2" *ngIf="data.item.name === 'documents'"></app-document-list>
    </div>
  `,
  styles: [],
})
export class MsbCardDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  constructor(
    public applicationService: ApplicationService,
    public dialogRef: MatDialogRef<MsbCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.item.name !== 'documents') {
      this.form = this.createFormGroup(this.data.item.form);
    }
    // console.log(this.form);
  }

  ngOnInit(): void {
    // console.log(this.data.item);
    // this.form.valueChanges.subscribe((value) => {
    //   const objArr = Object.entries(value);
    //
    //   objArr.forEach(([key, item]) => {
    //     console.log(key, item);
    //   });
    // });
  }

  ngOnDestroy(): void {}

  createFormGroup(formControls): any {
    const group: any = {};
    formControls?.forEach((item) => {
      group[item.controlName] = new FormControl(null, item.validators);
    });
    return new FormGroup(group);
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  getCompletedCount(form: any): any {
    return form?.filter((el: any) => el.isCompleted)?.length;
  }
}
