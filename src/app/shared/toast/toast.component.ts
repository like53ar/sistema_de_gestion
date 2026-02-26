import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
    toasts: Toast[] = [];

    constructor(private toastService: ToastService) { }

    ngOnInit() {
        this.toastService.toasts$.subscribe(toasts => (this.toasts = toasts));
    }

    dismiss(id: number) {
        this.toastService.dismiss(id);
    }

    iconFor(type: string): string {
        const icons: Record<string, string> = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || 'ℹ';
    }
}
