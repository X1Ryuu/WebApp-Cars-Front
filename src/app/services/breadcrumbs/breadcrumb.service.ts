import { Injectable } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  /!*protected breadcrumb: { label: string, url: string }[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumbs());
  }

  getBreadcrumbs(): { label: string, url: string }[] {
    return this.breadcrumb;
  }

  setBreadcrumbs(breadcrumbs: { label: string, url: string }[]): void {
    this.breadcrumb = breadcrumbs;
  }

  private updateBreadcrumbs(): void {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment);

    const breadcrumbs = segments.map((segment, index) => {
      const url = `/${segments.slice(0, index + 1).join('/')}`;
      return { label: segment, url };
    });

    this.setBreadcrumbs(breadcrumbs);
  }*!/


  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log(this.activatedRoute.root)
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
    const children: ActivatedRoute[] = route.children;
    console.log(breadcrumbs)
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'] || routeURL, url: url });
      this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}*/





@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
  private good: String = "";
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbsSubject.next(this.createBreadcrumbs(this.activatedRoute.root));
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }



/*      let label = child.snapshot.data['breadcrumb'];
      if (!label && child.snapshot.paramMap.has('brandId')) {
        label = child.snapshot.paramMap.get('brandId'); // Ustawienie ID jako breadcrumb, np. "Audi"
      }*/

/*      breadcrumbs.push({
        label: child.snapshot.data['breadcrumb'] || routeURL,
        url
      });*/
//      const label = child.snapshot.data['breadcrumb'] || routeURL;
      const rawLabel = child.snapshot.data['breadcrumb'] || routeURL;
      const label = this.capitalizeFirstLetter(rawLabel);

      if (label) {

        breadcrumbs.push({ label, url });
      }
      console.log('Breadcrumb:', breadcrumbs);
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}


