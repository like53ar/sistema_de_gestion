import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skeleton.component.html',
    styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {
    @Input() type: 'card' | 'table' | 'list' = 'list';
    @Input() rows = 4;

    get rowArray(): number[] {
        return Array(this.rows).fill(0);
    }
}
