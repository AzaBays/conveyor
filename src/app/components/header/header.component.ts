import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="header-logo">
        <img src="assets/images/sqb-logo.svg" alt="" />
      </div>
      <div class="d-flex align-items-center">
        <!--        <div class="header-search px-1">-->
        <!--          <i class="uil-search"></i>-->
        <!--          <input-->
        <!--            type="text"-->
        <!--            class="search-panel"-->
        <!--            placeholder="Поиск по всем документам"-->
        <!--            autocomplete="off"-->
        <!--          />-->
        <!--        </div>-->

        <!--        <div class="lang">-->
        <!--          {{ mainService.currentLang.title }}-->
        <!--          <i class="uil-angle-down"></i>-->
        <!--          <div class="lang_dropdown">-->
        <!--            <div-->
        <!--              class="lang_dropdown__item"-->
        <!--              *ngFor="let lang of chooseLang(mainService.currentLang)"-->
        <!--              (click)="chooseLang(lang)"-->
        <!--            >-->
        <!--              {{ lang.title }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="mr-3 cursor-pointer">
          <i class="uil-bell text-gray text-24"></i>
        </div>
        <div class="mr-3 cursor-pointer">
          <i class="uil-setting text-gray text-24"></i>
        </div>
<!--        <div class="mr-3 cursor-pointer">-->
<!--          <i class="uil-globe text-gray text-24"></i>-->
<!--        </div>-->

        <div class="header-user">
          <div class="header-user-name mr-2">
            <div class="user-fullname">Вячеслав Югай</div>
            <div class="user-post">UI/UX дизайнер</div>
          </div>
          <div class="header-user-avatar">
            <img src="assets/images/user.svg" alt="" />
          </div>
          <!--          <div class="header-user-info">-->
          <!--            <div class="header-user-info-header">-->
          <!--              <div class="header-user-info-title">Вячеслав Югай</div>-->
          <!--              <div class="header-user-info-subtitle">UI/UX дизайнер</div>-->
          <!--            </div>-->
          <!--            <div class="header-user-info-actions">-->
          <!--              <div class="header-user-info-actions-item mt-1">Мой профиль</div>-->
          <!--              <div class="header-user-info-actions-item mt-1">Настройки</div>-->
          <!--              <div class="header-user-info-actions-item mt-2">Выход</div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(public mainService: MainService) {}

  ngOnInit(): void {}
  chooseLang(lang: any): any {
    this.mainService.currentLang = lang;
    return this.mainService.langOptions.filter(
      (option: any) => option.val !== lang.val
    );
  }
}
