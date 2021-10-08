import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationService } from '../../../../../../services/application.service';

@Component({
  selector: 'app-document-list',
  template: `
    <div class="">
      <div
        class="application-docs px-3"
        *ngFor="let document of applicationService.documents; index as j"
      >
        <div class="application-docs-title">
          {{ document.docGroupTitle }}
        </div>
        <div
          class="application-docs-item"
          *ngFor="let cell of document.docGroupCells; index as i"
          [class.border-blue-action]="activeItem === cell.docCellName"
          [id]="cell.docCellName"
        >
          <div class="application-docs-item-icon">
            <i class="uil-file-upload-alt"></i>
          </div>
          <div class="application-docs-item-title">
            {{ cell.docCellTitle }}
          </div>
          <div
            class="application-docs-item-documents"
            [matMenuTriggerFor]="menu"
          >
            <!--                (click)="triggerMenu(i, cell)"-->
            <div
              class="documents-badge"
              *ngFor="let badge of cell.docCellFiles?.slice(0, 5)"
            >
              <img
                [src]="'assets/images/extensions/' + badge.fileType + '.svg'"
                alt=""
              />
            </div>
            <div
              class="documents-badge"
              *ngIf="
                cell.docCellFiles?.length -
                  cell.docCellFiles?.slice(0, 5).length >
                0
              "
            >
              {{
                '+' +
                  (cell.docCellFiles?.length -
                    cell.docCellFiles?.slice(0, 5).length)
              }}
            </div>
          </div>
          <mat-menu #menu xPosition="before" class="application-docs-item-menu">
            <div class="d-flex align-items-center justify-content-between">
              <div
                class="application-docs-item-menu-title"
                (click)="$event.stopPropagation()"
              >
                {{ cell.docCellTitle }}
              </div>
              <i class="uil-times text-gray text-20 cursor-pointer"></i>
            </div>
            <div
              class="application-docs-item-menu-item"
              *ngFor="let doc of cell.docCellFiles"
              (click)="$event.stopPropagation()"
            >
              <div class="application-docs-item-menu-item-poster">
                <img
                  [src]="'assets/images/extensions/' + doc.fileType + '.svg'"
                  alt=""
                />
              </div>
              <div class="application-docs-item-menu-item-title">
                {{ doc.fileName }}
              </div>
              <div
                class="application-docs-item-menu-item-icon"
                matTooltip="Скачать"
                [matTooltipPosition]="'above'"
              >
                <i class="uil-file-download"></i>
              </div>
              <div
                class="application-docs-item-menu-item-icon"
                matTooltip="Удалить"
                [matTooltipPosition]="'above'"
              >
                <i class="uil-trash-alt"></i>
              </div>
            </div>
          </mat-menu>
          <div
            class="application-docs-item-btn"
            (click)="
              openDownloadDialog(
                cell.docCellName,
                j,
                document.docGroupKey,
                cell.docCellKey
              )
            "
          >
            Загрузить
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class DocumentListComponent implements OnInit {
  @Input() activeItem = null;
  @Input() activeNav = 0;

  @Output() activateItem = new EventEmitter();
  @Output() activateNav = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public applicationService: ApplicationService
  ) {}

  ngOnInit(): void {}

  openDownloadDialog(
    docCellName: string = null,
    j: number = 0,
    groupKey: any = null,
    cellKey: any = null
  ): void {
    this.activeItem = docCellName;
    this.activeNav = j;

    this.activateItem.emit(docCellName);
    this.activateNav.emit(j);

    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      width: '539px',
      height: '70%',
      data: {
        documents: this.applicationService.documents,
        groupKey,
        cellKey,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
