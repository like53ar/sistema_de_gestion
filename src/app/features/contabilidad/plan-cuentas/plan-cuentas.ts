import { Component, ChangeDetectionStrategy, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../shared/tooltip/tooltip.directive';

export interface Cuenta {
  id: string;
  jerarquia: number;
  codigo: string;
  descripcion: string;
  imputable: boolean;
  ajustaInflacion: boolean;
  centroCosto: boolean;
  expanded: boolean;
  hijos: Cuenta[];
}

@Component({
  selector: 'app-plan-cuentas',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipDirective],
  templateUrl: './plan-cuentas.html',
  styleUrl: './plan-cuentas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCuentas {
  @Output() closeWindow = new EventEmitter<void>();

  // Estado local
  searchTerm = signal<string>('');

  // Modal de gestion
  isModalOpen = signal<boolean>(false);
  modalMode = signal<'create' | 'edit'>('create');
  selectedParentId = signal<string | null>(null);

  // Formulario temporal
  currentAccount = signal<Partial<Cuenta>>({});

  // Datos jerárquicos de ejemplo
  cuentasData = signal<Cuenta[]>([
    {
      id: '1', jerarquia: 1, codigo: '1', descripcion: 'Activo', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: true, hijos: [
        {
          id: '1.1', jerarquia: 2, codigo: '1.1', descripcion: 'Activo Corriente', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: true, hijos: [
            {
              id: '1.1.1', jerarquia: 3, codigo: '1.1.1', descripcion: 'Disponibilidades', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: true, hijos: [
                { id: '1.1.1.01', jerarquia: 4, codigo: '1.1.1.01', descripcion: 'Caja General', imputable: true, ajustaInflacion: false, centroCosto: true, expanded: false, hijos: [] },
                { id: '1.1.1.02', jerarquia: 4, codigo: '1.1.1.02', descripcion: 'Fondo Fijo', imputable: true, ajustaInflacion: false, centroCosto: true, expanded: false, hijos: [] },
                { id: '1.1.1.03', jerarquia: 4, codigo: '1.1.1.03', descripcion: 'Banco Nación Cta. Cte.', imputable: true, ajustaInflacion: false, centroCosto: true, expanded: false, hijos: [] }
              ]
            },
            {
              id: '1.1.2', jerarquia: 3, codigo: '1.1.2', descripcion: 'Inversiones', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: false, hijos: [
                { id: '1.1.2.01', jerarquia: 4, codigo: '1.1.2.01', descripcion: 'Plazo Fijo Banco Nación', imputable: true, ajustaInflacion: true, centroCosto: true, expanded: false, hijos: [] }
              ]
            },
            {
              id: '1.1.3', jerarquia: 3, codigo: '1.1.3', descripcion: 'Bienes de Uso (Transferidos)', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: false, hijos: [
                { id: '1.1.3.01', jerarquia: 4, codigo: '1.1.3.01', descripcion: 'Bienes de Uso', imputable: true, ajustaInflacion: true, centroCosto: true, expanded: false, hijos: [] }
              ]
            }
          ]
        },
        {
          id: '1.2', jerarquia: 2, codigo: '1.2', descripcion: 'Activo No Corriente', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: false, hijos: []
        }
      ]
    },
    {
      id: '2', jerarquia: 1, codigo: '2', descripcion: 'Pasivo', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: true, hijos: [
        {
          id: '2.1', jerarquia: 2, codigo: '2.1', descripcion: 'Pasivo Corriente', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: true, hijos: [
             { id: '2.1.1', jerarquia: 3, codigo: '2.1.1', descripcion: 'Proveedores', imputable: true, ajustaInflacion: false, centroCosto: true, expanded: false, hijos: [] }
          ]
        },
        {
          id: '2.2', jerarquia: 2, codigo: '2.2', descripcion: 'Pasivo No Corriente', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: false, hijos: []
        }
      ]
    },
    {
      id: '3', jerarquia: 1, codigo: '3', descripcion: 'Patrimonio Neto', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: false, hijos: []
    },
    {
      id: '4', jerarquia: 1, codigo: '4', descripcion: 'Resultados Positivos', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: false, hijos: []
    },
    {
      id: '5', jerarquia: 1, codigo: '5', descripcion: 'Resultados Negativos', imputable: false, ajustaInflacion: false, centroCosto: false, expanded: false, hijos: []
    }
  ]);

  // Derived state for filtering
  filteredCuentas = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.cuentasData();

    // Deep clone and filter
    const cloneData = JSON.parse(JSON.stringify(this.cuentasData())) as Cuenta[];
    return this.filterTree(cloneData, term);
  });

  // Flat list for dropdowns (padres)
  flatCuentasPadre = computed(() => {
    const result: Cuenta[] = [];
    this.flattenTree(this.cuentasData(), result, true);
    return result;
  });

  private flattenTree(nodes: Cuenta[], result: Cuenta[], onlyNonImputable: boolean) {
    for (const node of nodes) {
      if (!onlyNonImputable || !node.imputable) {
        result.push(node);
      }
      if (node.hijos && node.hijos.length > 0) {
        this.flattenTree(node.hijos, result, onlyNonImputable);
      }
    }
  }

  private filterTree(nodes: Cuenta[], term: string): Cuenta[] {
    return nodes.filter(node => {
      const matches = node.descripcion.toLowerCase().includes(term) || node.codigo.includes(term);
      if (node.hijos && node.hijos.length > 0) {
        node.hijos = this.filterTree(node.hijos, term);
        // Si tiene hijos que coinciden, mantiene la carpeta abierta y visible
        if (node.hijos.length > 0) {
          node.expanded = true;
          return true;
        }
      }
      return matches;
    });
  }

  toggleExpand(cuenta: Cuenta) {
    cuenta.expanded = !cuenta.expanded;
    // Si queremos actualizar para forzar render en OnPush, reemplazamos la data
    this.cuentasData.set([...this.cuentasData()]);
  }

  expandAll() {
    const data = JSON.parse(JSON.stringify(this.cuentasData())) as Cuenta[];
    this.setExpandedState(data, true);
    this.cuentasData.set(data);
  }

  collapseAll() {
    const data = JSON.parse(JSON.stringify(this.cuentasData())) as Cuenta[];
    this.setExpandedState(data, false);
    this.cuentasData.set(data);
  }

  private setExpandedState(nodes: Cuenta[], state: boolean) {
    for (const node of nodes) {
      if (node.hijos && node.hijos.length > 0) {
        node.expanded = state;
        this.setExpandedState(node.hijos, state);
      }
    }
  }

  // --- Modal Logic ---

  openAddModal(parentId: string | null = null) {
    this.modalMode.set('create');
    this.selectedParentId.set(parentId);

    // Determinar nivel según padre
    let newJerarquia = 1;

    if (parentId) {
      const parent = this.findCuenta(this.cuentasData(), parentId);
      if (parent) {
        newJerarquia = parent.jerarquia + 1;
      }
    }

    this.currentAccount.set({
      codigo: '',
      descripcion: '',
      jerarquia: newJerarquia,
      imputable: true,
      ajustaInflacion: false,
      centroCosto: false,
      expanded: false,
      hijos: []
    });

    this.isModalOpen.set(true);
  }

  openEditModal(cuenta: Cuenta) {
    this.modalMode.set('edit');
    // Encontrar al padre para mostrarlo si tiene
    this.selectedParentId.set(this.findParentId(this.cuentasData(), cuenta.id));
    this.currentAccount.set(JSON.parse(JSON.stringify(cuenta)));
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveAccount() {
    const accountToSave = this.currentAccount() as Cuenta;

    if (!accountToSave.codigo || !accountToSave.descripcion) return;

    const data = [...this.cuentasData()];

    if (this.modalMode() === 'create') {
      accountToSave.id = Date.now().toString(); // simple id gen
      accountToSave.hijos = [];

      const parentId = this.selectedParentId();
      if (parentId) {
        const parent = this.findCuenta(data, parentId);
        if (parent) {
          accountToSave.jerarquia = parent.jerarquia + 1;
          if (!parent.hijos) parent.hijos = [];
          parent.hijos.push(accountToSave);
          parent.expanded = true;
        }
      } else {
        accountToSave.jerarquia = 1;
        data.push(accountToSave);
      }
    } else {
      // Edit mode
      const original = this.findCuenta(data, accountToSave.id);
      if (original) {
        original.codigo = accountToSave.codigo;
        original.descripcion = accountToSave.descripcion;
        original.imputable = accountToSave.imputable;
        original.ajustaInflacion = accountToSave.ajustaInflacion;
        original.centroCosto = accountToSave.centroCosto;
        // No podemos cambiar el padre tan facilmente en este prototipo sin reorganizar el árbol, 
        // así que omitimos esa complejidad por ahora, o requeriría mover el nodo.
      }
    }

    this.cuentasData.set(data);
    this.closeModal();
  }

  deleteAccount(id: string) {
    if (confirm('¿Está seguro que desea eliminar esta cuenta y todas sus subcuentas?')) {
      const data = [...this.cuentasData()];
      this.removeCuenta(data, id);
      this.cuentasData.set(data);
    }
  }

  // --- Utilidades del Árbol ---

  private findCuenta(nodes: Cuenta[], id: string): Cuenta | null {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.hijos) {
        const found = this.findCuenta(node.hijos, id);
        if (found) return found;
      }
    }
    return null;
  }

  private findParentId(nodes: Cuenta[], id: string, parentId: string | null = null): string | null {
    for (const node of nodes) {
      if (node.id === id) return parentId;
      if (node.hijos) {
        const found = this.findParentId(node.hijos, id, node.id);
        if (found !== null) return found;
      }
    }
    return null;
  }

  private removeCuenta(nodes: Cuenta[], id: string): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        nodes.splice(i, 1);
        return true;
      }
      if (nodes[i].hijos && this.removeCuenta(nodes[i].hijos, id)) {
        return true;
      }
    }
    return false;
  }

  exportPlan() {
    // Stub para exportar a PDF o CSV
    const plan = this.flatCuentasPadre(); // o aplanado completo
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Codigo,Descripcion,Imputable,AjustaInflacion,CentroCosto,Nivel\n";

    const all: Cuenta[] = [];
    this.flattenTree(this.cuentasData(), all, false);

    all.forEach(row => {
      csvContent += `${row.codigo},${row.descripcion},${row.imputable ? 'Si' : 'No'},${row.ajustaInflacion ? 'Si' : 'No'},${row.centroCosto ? 'Si' : 'No'},${row.jerarquia}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "plan_cuentas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
