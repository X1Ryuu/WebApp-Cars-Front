import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../../../services/breadcrumbs/breadcrumbs.service';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {BreadcrumbService} from '../../../services/breadcrumbs/breadcrumb.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
/*export class BreadcrumbComponent implements OnInit{
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private breadcrumbService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
  }
}*/

export class BreadcrumbComponent implements OnInit{
/*  breadcrumbs: { label: string; url: string }[] = [];*/

/*  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      }
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {*/
/*  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
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

      breadcrumbs.push({
        label: child.snapshot.data['breadcrumb'] || routeURL,
        url
      });
/!*      console.log("Url", url)
      console.log("Bread", breadcrumbs)*!/
      this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }*/






/*  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {

    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
  }*/


  breadcrumbs: Array<{ label: string, url: string }> = [];
  private breadcrumbSubscription: Subscription | null = null;
  type: string | undefined;
  constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumbs$.subscribe(
      (breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      }
    );
    this.route.data.subscribe(data => {
      this.type = data['type'];
    });
    console.log(this.type);
  }

  ngOnDestroy(): void {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }



}
