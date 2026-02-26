import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService, ConfirmDialogState } from './confirm-dialog.service';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit {
    state: ConfirmDialogState = { visible: false, message: '', options: {} };

    constructor(private confirmService: ConfirmDialogService) { }

    ngOnInit() {
        this.confirmService.state$.subscribe(state => (this.state = state));
    }

    confirm() { this.state.resolve?.(true); }
    cancel() { this.state.resolve?.(false); }
}
