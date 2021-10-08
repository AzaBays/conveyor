import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <div class="app">
      <app-header></app-header>
      <div class="app-content">
        <app-sidebar></app-sidebar>
        <div class="app-router-outlet">
          <router-outlet></router-outlet>
        </div>

        <!--    <app-notifications-sidebar></app-notifications-sidebar>-->
      </div>
    </div>
  `,
  styles: [],
})
export class ContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
