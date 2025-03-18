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
