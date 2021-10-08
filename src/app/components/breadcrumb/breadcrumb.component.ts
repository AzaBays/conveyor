import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { ApplicationService } from '../../services/application.service';

export interface IBreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div class="breadcrumbs">
      <div class="breadcrumbs-title" *ngIf="titleState">
        {{ title }}
      </div>
      <div class="d-flex align-items-center">
        <div
          class="breadcrumbs-item"
          [routerLink]="'/pages' + breadcrumbs[breadcrumbs.length - 2].url"
        >
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.90037 11.833L2.90037 12.083L3.15037 12.083L6.52294 12.083L6.52315 12.083C7.89586 12.083 9.00579 11.6374 9.76925 10.7772C10.5289 9.92133 10.9166 8.68748 10.9166 7.16427C10.9166 5.69061 10.5433 4.50944 9.79418 3.69504C9.04207 2.87734 7.94476 2.46571 6.57484 2.46571L3.44224 2.46571L4.14222 1.82029L4.32528 1.65149L4.15722 1.46776L3.72718 0.997609L3.55783 0.812465L3.3733 0.98249L1.29722 2.89543L1.09789 3.0791L1.29704 3.26296L3.37312 5.17973L3.55766 5.35011L3.72718 5.16478L4.15722 4.69463L4.32528 4.5109L4.14223 4.34211L3.43838 3.69306L6.57463 3.69306C7.64561 3.69306 8.40998 3.9919 8.91096 4.54552C9.41612 5.10377 9.69212 5.96328 9.69212 7.16427C9.69212 8.74532 9.24244 9.65176 8.65271 10.1684C8.05667 10.6906 7.27182 10.8554 6.52294 10.8554L3.15037 10.8554L2.90037 10.8554L2.90037 11.1054L2.90037 11.833Z"
            />
          </svg>
        </div>
        <div
          class="breadcrumbs-item"
          *ngFor="let breadcrumb of breadcrumbs; index as i; let last = last"
          [class.breadcrumbs-item-current]="last"
          [routerLink]="'/pages' + breadcrumb.url"
        >
          {{ breadcrumb.label }}
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class BreadcrumbComponent implements OnInit {
  @Input() titleState = false;
  @Input() titleFrom = '';
  title = '';
  public breadcrumbs: IBreadCrumb[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public applicationService: ApplicationService
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        // @ts-ignore
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);

      });

    if (this.titleFrom === 'application' && this.titleState) {
      this.activatedRoute.data.subscribe((value) => {
        this.title = this.applicationService.applicationTabs.find(
          (el: any) => el.value === value.path
        )?.label;
      });
    }
  }

  // /**
  //  * Recursively build breadcrumb according to activated route.
  //  * @param route
  //  * @param url
  //  * @param breadcrumbs
  //  */
  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    // If no routeConfig is avalailable we are on the root path
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : '';
    const isClickable =
      route.routeConfig &&
      route.routeConfig.data &&
      route.routeConfig.data.isClickable;
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
