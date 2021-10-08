import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-credit-conveyor',
  template: `
    <div class="conveyor w-100 h-100 p-2">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class CreditConveyorComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
