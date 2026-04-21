import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParametrosTesoreriaService, ParametrosTesoreriaData } from '../../../../core/services/parametros-tesoreria.service';

interface MenuItem {
  id: string;
  label: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-parametros-tesoreria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="route-modal-overlay" (click)="closeModal()">
        <div class="route-modal-content lg" (click)="$event.stopPropagation()">
            <button class="modal-close-btn" (click)="closeModal()">&times;</button>
            
            <div class="tesoreria-container fade-in">
                <div class="modal-header">
                    <div class="title-row">
                        <h2>💰 Parámetros de Tesorería</h2>
                        <div class="header-actions">
                            <button class="zen-btn" (click)="guardar()">💾 Aceptar</button>
                        </div>
                    </div>
                </div>

                <div class="tesoreria-layout">
                    <aside class="tesoreria-sidebar">
                        <ul class="tree-list">
                            <li *ngFor="let item of menuItems" class="tree-item">
                                <div class="tree-node" (click)="selectItem(item)" [class.active]="activeView === item.id">
                                    <span class="toggle-box" *ngIf="item.children">
                                        {{ item.expanded ? '−' : '+' }}
                                    </span>
                                    <span class="no-toggle" *ngIf="!item.children"></span>
                                    <span class="node-label">{{ item.label }}</span>
                                </div>
                                <div class="tree-children" *ngIf="item.children && item.expanded">
                                    <!-- Aquí irán las sub-opciones cuando se definan -->
                                </div>
                            </li>
                        </ul>
                    </aside>

                    <main class="tesoreria-content">
                        <div class="header-view">
                            <h3>{{ getViewLabel() }}</h3>
                        </div>
                        <div class="section-group">
                            <div class="form-row">
                                <div class="form-group flex-1">
                                    <label>Opciones de {{ getViewLabel() }}</label>
                                    <input type="text" class="zen-input" placeholder="Configure parámetros aquí...">
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .tesoreria-container { padding: 24px; display: flex; flex-direction: column; height: 100%; font-family: 'Inter', sans-serif; }
    .modal-header { margin-bottom: 24px; border-bottom: 1px solid var(--zen-border); padding-bottom: 16px; }
    .title-row { display: flex; justify-content: space-between; align-items: center; h2 { margin: 0; color: var(--zen-accent-primary); font-size: 1.4rem; } }
    .tesoreria-layout { display: flex; gap: 24px; flex: 1; min-height: 400px; }
    .tesoreria-sidebar { width: 260px; border-right: 1px solid var(--zen-border); padding-right: 16px; }
    .tesoreria-content { flex: 1; background: rgba(255,255,255,0.02); border-radius: 8px; padding: 24px; border: 1px solid var(--zen-border); }
    .tree-list { list-style: none; padding: 0; margin: 0; }
    .tree-item { margin-bottom: 5px; }
    .tree-node { display: flex; align-items: center; padding: 10px 14px; cursor: pointer; border-radius: 6px; transition: 0.2s;
        &:hover { background: var(--zen-bg-element); color: var(--zen-accent-primary); }
        &.active { background: rgba(200, 168, 130, 0.15); color: var(--zen-accent-primary); font-weight: 500; }
    }
    .toggle-box { width: 14px; margin-right: 12px; text-align: center; font-weight: bold; font-family: monospace; }
    .no-toggle { width: 26px; }
    .node-label { font-size: 0.95rem; }
    .header-view { margin-bottom: 20px; border-bottom: 1px solid var(--zen-border); padding-bottom: 10px; h3 { margin: 0; color: var(--zen-accent-primary); } }
    .section-group { background: var(--zen-bg-secondary); padding: 16px; border-radius: 6px; border: 1px solid var(--zen-border); }
  `]
})
export class ParametrosTesoreria implements OnInit {
  formData: ParametrosTesoreriaData;
  activeView: string = 'archivos';

  menuItems: MenuItem[] = [
    { id: 'archivos', label: 'Archivos', children: [] },
    { id: 'comprobantes', label: 'Comprobantes', children: [] },
    { id: 'procesos-periodicos', label: 'Procesos periódicos', children: [] },
    { id: 'tango-banking', label: 'Tango Banking', children: [] },
    { id: 'informes', label: 'Informes', children: [] },
    { id: 'consultas', label: 'Consultas', children: [] }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ParametrosTesoreriaService
  ) {
    this.formData = this.service.getParametros();
  }

  ngOnInit() {}

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  guardar() {
    this.service.saveParametros(this.formData);
    alert('✅ Parámetros de Tesorería guardados correctamente.');
    this.closeModal();
  }

  selectItem(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
    this.activeView = item.id;
  }

  getViewLabel(): string {
    const item = this.menuItems.find(i => i.id === this.activeView);
    return item ? item.label : '';
  }
}
