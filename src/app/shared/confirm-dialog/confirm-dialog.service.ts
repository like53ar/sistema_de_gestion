import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ConfirmDialogOptions {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
}

export interface ConfirmDialogState {
    visible: boolean;
    message: string;
    options: ConfirmDialogOptions;
    resolve?: (value: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
    private stateSubject = new BehaviorSubject<ConfirmDialogState>({
        visible: false,
        message: '',
        options: {}
    });
    state$ = this.stateSubject.asObservable();

    confirm(message: string, options: ConfirmDialogOptions = {}): Observable<boolean> {
        return new Observable(observer => {
            this.stateSubject.next({
                visible: true,
                message,
                options,
                resolve: (value: boolean) => {
                    observer.next(value);
                    observer.complete();
                    this.stateSubject.next({ visible: false, message: '', options: {} });
                }
            });
        });
    }
}
