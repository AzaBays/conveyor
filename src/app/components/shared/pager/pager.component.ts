import {
  Component,
  ComponentRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  PaginationControlsDirective,
  PaginationInstance,
} from 'ngx-pagination';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-pager',
  template: `
    <div class="pagination" [class.bg-gray-border]="bg">
      <div class="d-flex align-items-center mr-2">
        Показать из <span class="ml-1">{{ pager.totalItems }}</span
        >:
        <ng-select
          [items]="mainService.pageCount"
          [(ngModel)]="pager.itemsPerPage"
          [clearable]="false"
          (change)="takeBack('size', $event)"
          class="ml-2"
          [searchable]="false"
        ></ng-select>
      </div>

      <pagination-template
        #p="paginationApi"
        [maxSize]="5"
        [id]="id"
        (pageChange)="takeBack('page', $event)"
        (pageBoundsCorrection)="takeBack('size', $event)"
      >
        <div class="d-flex align-items-center">
          Вы на странице
          <ng-select
            [items]="p.pages"
            bindLabel="label"
            bindValue="value"
            [(ngModel)]="page"
            [clearable]="false"
            (change)="p.setCurrent(page)"
            class="ml-2"
            [searchable]="false"
          ></ng-select>

          <div class="pagination-arrows ml-2 pl-1">
            <span
              class="prev ml-1"
              [class.pagination-arrows-disabled]="p.isFirstPage()"
              (click)="
                p.isFirstPage() ? $event.stopPropagation : p.previous();
              "
            >
              <i class="uil-arrow-left"></i>
            </span>
            <span
              class="next ml-1"
              [class.pagination-arrows-disabled]="p.isLastPage()"
              (click)="
                p.isLastPage() ? $event.stopPropagation : p.next();
              "
            >
              <i class="uil-arrow-right"></i>
            </span>
          </div>
        </div>
      </pagination-template>
    </div>
  `,
  styles: [],
})
export class PagerComponent implements OnInit{
  @Input() pager!: PaginationInstance;
  @Input() id!: any;
  @Input() bg!: any;
  @Output() pagerConfig: EventEmitter<any> = new EventEmitter();

  page = 1;

  constructor(public mainService: MainService) {}

  ngOnInit(): void {}

  takeBack(page: string, payload?: any): void {
    if (page === 'page') {
      this.pager.currentPage = payload;
      this.page = payload;
    } else if (page === 'size') {
      this.pager.currentPage = 1;
    }
    this.pager.itemsPerPage = Number(this.pager.itemsPerPage);
    this.pagerConfig.emit({
      ...this.pager,
    });
  }
}
