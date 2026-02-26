import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { ToastComponent } from '../../shared/toast/toast.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavBar, ToastComponent, BreadcrumbComponent, ConfirmDialogComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout { }
