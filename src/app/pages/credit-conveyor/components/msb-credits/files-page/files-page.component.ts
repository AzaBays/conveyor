import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MsbCardDialogComponent } from '../msb-card-dialog/msb-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import { ApplicationService } from '../../../../../services/application.service';

@Component({
  selector: 'app-files-page',
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
                (click)="openDownloadDialog()"
              >
                <i class="uil-file-plus mr-1 text-18"></i>
                Загрузить файл
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
          <app-document-list
            [activeItem]="activeItem"
            [activeNav]="activeNav"
            (activateItem)="activeItem = $event"
            (activateNav)="activeNav = $event"
          ></app-document-list>
        </div>
        <div class="application-navigation" #navSidebar>
          <div class="application-navigation-title">Содержание</div>
          <details
            class="navigation"
            [open]="activeNav === i"
            *ngFor="let document of applicationService.documents; index as i"
          >
            <summary>
              <i class="fas fa-caret-right mr-1"></i>
              <!--              <span class="mr-1">{{ i + 1 }}</span>-->
              {{ document.docGroupTitle }}
            </summary>
            <div class="navigation-list">
              <div
                class="navigation-list-item"
                [class.navigation-list-item-active]="
                  activeItem === item.docCellName
                "
                *ngFor="let item of document.docGroupCells; index as i"
                (click)="goToItem($event, i, item.docCellName)"
              >
                {{ item.docCellTitle }}
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class FilesPageComponent implements OnInit {
  @ViewChild('navSidebar') navSidebar: any;
  activeItem = null;
  activeNav = 0;

  constructor(
    public dialog: MatDialog,
    public applicationService: ApplicationService
  ) {}

  ngOnInit(): void {}

  onScroll(evt: any): void {
    this.navSidebar.nativeElement.style.height =
      evt.target.scrollTop !== 0 ? '100%' : '';
  }

  goToItem(evt: any, i: number, target: string): void {
    this.activeItem = target;

    for (i = 0; i < this.applicationService.documents.length; i++) {
      this.applicationService.documents[i].docGroupCells.forEach((el: any) => {
        if (el.docCellName === target) {
          this.activeNav = i;
        }
      });
    }

    document
      .querySelector(`#${target}`)
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  openDownloadDialog(
    docCellName: string = null,
    j: number = 0,
    groupKey: any = null,
    cellKey: any = null
  ): void {
    this.activeItem = docCellName;
    this.activeNav = j;

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
