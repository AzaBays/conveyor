import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-download-dialog',
  template: `
    <div class="download-dialog py-3">
      <div class="download-dialog-title mb-3 mx-3">
        <div class="download-dialog-title-icon">
          <i class="uil-file-plus"></i>
        </div>
        <div class="download-dialog-title-text">Добавить документ</div>
        <div class="download-dialog-title-close" (click)="closePopup()">
          <i class="uil-times text-gray text-24 cursor-pointer"></i>
        </div>
      </div>
      <form class="download-dialog-form mx-5" [formGroup]="addDocsForm">
        <div class="form-field mb-3">
          <div class="form-field-title">
            Выберите группу документов <span class="text-red">*</span>
          </div>
          <label
            class="form-field-label form-field-group"
            [ngClass]="{
              invalid:
                addDocsForm.get('docGroup').touched &&
                addDocsForm.get('docGroup').errors?.required,
              valid: addDocsForm.get('docGroup').valid
            }"
          >
            <!--        select field      -->
            <ng-select
              class="custom-select w-100"
              appearance="outline"
              [items]="data?.documents"
              bindLabel="docGroupTitle"
              bindValue="docGroupKey"
              placeholder=""
              formControlName="docGroup"
              [loadingText]="'Загружается'"
              [searchable]="false"
              [clearable]="true"
              [notFoundText]="'Данные отсутствуют'"
            ></ng-select>
            <!--        select field      -->
          </label>
          <button
            class="form-field-hint"
            *ngIf="
              addDocsForm.get('docGroup').touched &&
              addDocsForm.get('docGroup').errors?.required
            "
          >
            <span
              class="form-field-hint-text"
              [class.invalid-text]="
                addDocsForm.get('docGroup').errors?.required
              "
            >
              Обязательное поле
            </span>
          </button>
        </div>
        <div class="form-field mb-3">
          <div class="form-field-title">
            Выберите ячейку группы <span class="text-red">*</span>
          </div>
          <label
            class="form-field-label form-field-group"
            [ngClass]="{
              invalid:
                addDocsForm.get('docGroupCell').touched &&
                addDocsForm.get('docGroupCell').errors?.required,
              valid: addDocsForm.get('docGroupCell').valid
            }"
          >
            <!--        select field      -->
            <ng-select
              class="custom-select w-100"
              appearance="outline"
              [items]="groupCell"
              bindLabel="docCellTitle"
              bindValue="docCellKey"
              placeholder=""
              formControlName="docGroupCell"
              [loadingText]="'Загружается'"
              [searchable]="false"
              [clearable]="true"
              [notFoundText]="'Данные отсутствуют'"
            ></ng-select>
            <!--        select field      -->
          </label>
          <button
            class="form-field-hint"
            *ngIf="
              addDocsForm.get('docGroupCell').touched &&
              addDocsForm.get('docGroupCell').errors?.required
            "
          >
            <span
              class="form-field-hint-text"
              [class.invalid-text]="
                addDocsForm.get('docGroupCell').errors?.required
              "
            >
              Обязательное поле
            </span>
          </button>
        </div>

        <div
          ng2FileDrop
          [ngClass]="{ 'nv-file-over': hasBaseDropZoneOver }"
          (fileOver)="fileOverBase($event)"
          [uploader]="uploader"
          class="drop-zone"
        >
          <i class="uil-cloud-upload"></i>
          <div class="drop-zone-text">
            <span>Перетащите файлы сюда или</span>
            <label>
              <input
                type="file"
                name="fileUpload"
                id="fileUpload"
                multiple
                ng2FileSelect
                accept=".doc,.docx,.txt,.xls,.xlsx,.pdf,.ppt,.pptx,.ppsx"
                [uploader]="uploader"
              />
              нажмите для загрузки файлов
            </label>
          </div>
        </div>
        <div
          *ngFor="let item of uploader.queue; index as i"
          class="files-item"
          [ngClass]="{
            invalid: item.isError,
            valid: item.isSuccess
          }"
        >
          <div
            class="files-item-progress"
            *ngIf="item.isUploading"
            [style]="{ width: item.progress + '%' }"
          ></div>
          <!--          <svg-->
          <!--            viewBox="0 0 36 36"-->
          <!--            class="circular-chart default"-->
          <!--            *ngIf="item.progress < 100"-->
          <!--          >-->
          <!--            <path-->
          <!--              class="circle-bg"-->
          <!--              d="M18 2.0845-->
          <!--                              a 15.9155 15.9155 0 0 1 0 31.831-->
          <!--                              a 15.9155 15.9155 0 0 1 0 -31.831"-->
          <!--            ></path>-->
          <!--            <path-->
          <!--              class="circle"-->
          <!--              attr.stroke-dasharray="{{ item.progress }}, 100"-->
          <!--              d="M18 2.0845-->
          <!--                              a 15.9155 15.9155 0 0 1 0 31.831-->
          <!--                              a 15.9155 15.9155 0 0 1 0 -31.831"-->
          <!--            ></path>-->
          <!--          </svg>-->
          <div
            class="position-relative d-flex align-items-center justify-content-between px-1 h-100"
          >
            <!--            <div class="text-24 text-red mr-1" *ngIf="item.isError">-->
            <!--              <i class="uil-file-times"></i>-->
            <!--            </div>-->
            <div class="mr-1">
              <img
                [src]="
                  'assets/images/extensions/' +
                  item.file.name.split('.')[
                    item.file.name.split('.').length - 1
                  ] +
                  '.svg'
                "
                alt=""
              />
            </div>
            <div class="files-item-text ml-1">
              {{ item.file.name }}
              <div class="text-12 text-red" *ngIf="item.isError">Произошла ошибка! Попробуйте загрузить повторно</div>
            </div>
            <i
              class="uil-trash-alt ml-1 cursor-pointer"
              *ngIf="item.isSuccess"
              (click)="deleteFile($event, item, i)"
            ></i>
          </div>
        </div>
      </form>
      <div class="d-flex justify-content-end align-items-center mx-5 mt-3">
        <button class="btn btn-gray-border text-gray mr-2">Отмена</button>
        <button type="submit" class="btn btn-blue text-white" [disabled]="addDocsForm.invalid">Сохранить</button>
      </div>
    </div>
  `,
  styles: [],
})
export class DownloadDialogComponent implements OnInit, OnDestroy {
  addDocsForm: FormGroup;

  uploader: FileUploader = new FileUploader({
    url: environment.fileBaseUrl + '/file/single-upload',
    autoUpload: true,
    method: 'POST',
    itemAlias: 'files',
    queueLimit: 10,
    isHTML5: true,
    parametersBeforeFiles: true,
    additionalParameter: {
      source: 'SQB-MSB',
    },
    allowedFileType: [
      'doc',
      'docx',
      'txt',
      'xls',
      'xlsx',
      'pdf',
      'ppt',
      'pptx',
      'ppsx',
    ],
  });
  hasBaseDropZoneOver: boolean;
  attachmentList: any = [];

  groupCell: any = [];

  sb!: Subscription | undefined;

  constructor(
    public dialogRef: MatDialogRef<DownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.response.subscribe((res) => {
      if (res) {
        const file = JSON.parse(res);
        this.attachmentList.push({
          id: file.id,
          name: file.fileName,
          type: file.extension,
        });
      }
    });
    this.hasBaseDropZoneOver = false;
    this.uploader.onCompleteAll = () => {
      this.addDocsForm.get('files').patchValue(this.attachmentList);
    };
  }

  ngOnInit(): void {
    this.addDocsForm = new FormGroup({
      docGroup: new FormControl(null, [Validators.required]),
      docGroupCell: new FormControl(null, [Validators.required]),
      files: new FormControl([]),
    });

    if (this.data.groupKey && this.data.cellKey) {
      this.addDocsForm.get('docGroup').patchValue(this.data.groupKey);
      this.groupCell = this.data?.documents.find(
        (el: any) => el.docGroupKey === this.data.groupKey
      )?.docGroupCells;
      this.addDocsForm.get('docGroupCell').patchValue(this.data.cellKey);
    }

    this.sb = this.addDocsForm
      .get('docGroup')
      ?.valueChanges.subscribe((val) => {
        console.log(val);
        if (val) {
          this.groupCell = this.data?.documents.find(
            (el: any) => el.docGroupKey === val
          )?.docGroupCells;
        } else {
          this.groupCell = [];
        }
      });
  }

  ngOnDestroy(): void {
    this.sb.unsubscribe();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deleteFile(evt: any, item: any, idx: any): void {
    item.isUploading ? item.cancel() : this.attachmentList.splice(idx, 1);
    item.remove();
    this.addDocsForm.get('files').patchValue(this.attachmentList);
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
