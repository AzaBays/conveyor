import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar">
      <div class="flex-grow-1">
<!--        <div class="sidebar-user mb-5">-->
<!--          <div class="sidebar-user-avatar">-->
<!--            <img src="assets/images/avatar.png" alt="" />-->
<!--          </div>-->
<!--          <div>-->
<!--            <div class="text-16 text-semibold text-logo-main">Дмитрий Хван</div>-->
<!--            <div class="text-gray">Кредитный Менеджер</div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="sidebar-links">
          <a *ngFor="let link of links" [routerLink]="link.link" routerLinkActive="sidebar-links-item-active" class="sidebar-links-item">
            <i class="{{link.icon}} mr-2 text-20"></i>
            {{link.title}}
          </a>
        </div>
      </div>
        <div class="sidebar-links-item">
            <i class="uil-signout mr-2 text-20"></i>
            Выйти
        </div>
    </div>
  `,
  styles: [],
})
export class SidebarComponent implements OnInit {
  links = [
    {
      title: 'Главная',
      icon: 'uil-home-alt',
      link: 'main'
    },
    {
      title: 'Кредитный конвейер',
      icon: 'uil-file-alt',
      link: 'credit'
    },
    {
      title: 'Уведомления',
      icon: 'uil-bell',
      link: 'notifications'
    },
  ]

  constructor() {}

  ngOnInit(): void {}
}
