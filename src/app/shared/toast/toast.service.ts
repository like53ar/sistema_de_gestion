import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    private counter = 0;
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    private show(message: string, type: ToastType, duration = 4000) {
        const id = ++this.counter;
        const toast: Toast = { id, message, type };
        this.toastsSubject.next([...this.toastsSubject.value, toast]);
        setTimeout(() => this.dismiss(id), duration);
    }

    success(message: string) { this.show(message, 'success'); }
    error(message: string) { this.show(message, 'error', 6000); }
    warning(message: string) { this.show(message, 'warning'); }
    info(message: string) { this.show(message, 'info'); }

    dismiss(id: number) {
        this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
    }
}
