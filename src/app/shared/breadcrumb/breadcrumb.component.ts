import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbService, Breadcrumb } from './breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs: Breadcrumb[] = [];

    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit() {
        this.breadcrumbService.breadcrumbs$.subscribe(crumbs => (this.breadcrumbs = crumbs));
    }
}
