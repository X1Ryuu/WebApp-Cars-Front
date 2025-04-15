import { Injectable } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
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

      let label = routeURL;

      //console.log(label)
      if(label==='archives')label = this.capitalizeFirstLetter(label);

/*      if(label.includes('gens/') || label.includes('vers/')){
        label = label.split("/")[1];
      }*/

      //console.log(child.snapshot.paramMap);
      // Jeśli to generacja, dodaj nazwę generacji
/*      if (child.snapshot.paramMap.has('generationName')) {
        const generationName = child.snapshot.paramMap.get('generationName');
        label = generationName ? generationName : 'Generation';
      }

      if (child.snapshot.paramMap.has('versionName')) {
        const versionName = child.snapshot.paramMap.get('versionName');
        label = versionName ? versionName : 'Version';
      }*/

     // console.log(label.includes('gens/') || label.includes('vers/'));
      if (/*label !== 'gens' && label !== 'vers' && */label !== '' && label!== 'undefined' && !breadcrumbs.some(b => b.label === label)) {

        if(label=="gens" || label=="vers") {
          let last = breadcrumbs.pop();
          if (last) {
            last.url  += "/" + label
            breadcrumbs.push(last);
          }
          //console.log(label, url)

        }else if(label.includes('gens/') || label.includes('vers/')) {
          let labele = label.split("/")[1];
          let url = label.split("/")[0];
          let last = breadcrumbs.pop();
          if (last) {
            last.url  += "/" + url
            breadcrumbs.push(last);
            url = last.url
            breadcrumbs.push({label:labele, url});
          }
        }else{
          breadcrumbs.push({label, url});
        }


      }



/*      let label = child.snapshot.data['breadcrumb'] || routeURL;
      if (routeURL === 'gen') {
        label = 'Generation';  // Może być inna nazwa
      } else if (routeURL === 'version') {
        label = 'Version';  // Może być inna nazwa
      }
      if(label!=='gens'){
        breadcrumbs.push({ label, url });
      }*/

      // Zapisz breadcrumb


      //console.log('Breadcrumb:', breadcrumbs);
      this.createBreadcrumbs(child, url, breadcrumbs);
    }

    //console.log("Finito", breadcrumbs)
    return breadcrumbs;
  }
  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private formatLabel(label: string): string {
    if (label.startsWith('gens/')) {
      const genName = label.split('/')[1];
      return `Generacja ${genName}`;
    }

    if (label.startsWith('vers/')) {
      const versionName = label.split('/')[1];
      return `Wersja ${versionName}`;
    }

    if (label === 'archives') {
      return this.capitalizeFirstLetter(label);
    }

    return label;
  }
}


