import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { PaginationInstance } from 'ngx-pagination';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public currentLang: any = {
    title: 'Русский',
    val: 'ru',
  };
  public langOptions: Array<object> = [
    {
      title: 'Русский',
      val: 'ru',
    },
    {
      title: 'English',
      val: 'en',
    },
    {
      title: 'O`zbekcha',
      val: 'uz',
    },
  ];

  pageCount = [5, 10, 15];

  public conPaginatorConfig: PaginationInstance = {
    id: 'conveyor',
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1,
  };
  public innPaginatorConfig: PaginationInstance = {
    id: 'inn',
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1,
  };

  creditList: any;
  innResultList: any;

  constructor(private http: HttpClient) {}

  getMsbCreditList(): Observable<any> {
    return this.http.get<any>('assets/db/inn-result.json').pipe(
      map((resp: any) => {
        this.creditList = resp;
        this.conPaginatorConfig.totalItems = resp.length;
      })
    );
  }

  getInnResult(): Observable<any> {
    return this.http.get<any>('assets/db/inn-result.json').pipe(
      map((resp: any) => {
        this.innResultList = resp;
        this.innPaginatorConfig.totalItems = resp.length;
      })
    );
  }
}
