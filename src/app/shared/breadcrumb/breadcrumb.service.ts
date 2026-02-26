import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
    label: string;
    url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
    private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
    breadcrumbs$ = this.breadcrumbsSubject.asObservable();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        // Initial build only if navigation already happened
        if (this.router.navigated) {
            const initialCrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
            this.breadcrumbsSubject.next(initialCrumbs);
        }

        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                const crumbs = this.buildBreadcrumbs(this.activatedRoute.root);
                this.breadcrumbsSubject.next(crumbs);
            });
    }

    private buildBreadcrumbs(
        route: ActivatedRoute,
        url = '',
        crumbs: Breadcrumb[] = [{ label: 'Inicio', url: '/' }]
    ): Breadcrumb[] {
        const children = route.children;
        if (!children.length) return crumbs;

        for (const child of children) {
            const snapshot = child.snapshot;
            if (!snapshot || !snapshot.url) {
                return this.buildBreadcrumbs(child, url, crumbs);
            }

            const segments = snapshot.url.map(s => s.path);
            if (!segments.length) return this.buildBreadcrumbs(child, url, crumbs);

            const fullUrl = `${url}/${segments.join('/')}`;
            const label = snapshot.data['breadcrumb'];
            if (label) crumbs.push({ label, url: fullUrl });

            return this.buildBreadcrumbs(child, fullUrl, crumbs);
        }
        return crumbs;
    }
}
