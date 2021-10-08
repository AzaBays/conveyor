import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-msb-credits',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class MsbCreditsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }


}
