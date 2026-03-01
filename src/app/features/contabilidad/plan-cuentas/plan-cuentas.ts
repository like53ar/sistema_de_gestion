import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../shared/tooltip/tooltip.directive';

export interface Cuenta {
  id: string;
  codigo: string;
  nombre: string;
  tipo: 'Activo' | 'Pasivo' | 'Patrimonio' | 'Ingresos' | 'Egresos';
  jerarquia: number;
  imputable: boolean;
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
      id: '1', codigo: '1', nombre: 'ACTIVO', tipo: 'Activo', jerarquia: 1, imputable: false, expanded: true, hijos: [
        {
          id: '1.1', codigo: '1.1', nombre: 'Activo Corriente', tipo: 'Activo', jerarquia: 2, imputable: false, expanded: true, hijos: [
            {
              id: '1.1.1', codigo: '1.1.1', nombre: 'Disponibilidades', tipo: 'Activo', jerarquia: 3, imputable: false, expanded: true, hijos: [
                { id: '1.1.1.01', codigo: '1.1.1.01', nombre: 'Caja General', tipo: 'Activo', jerarquia: 4, imputable: true, expanded: false, hijos: [] },
                { id: '1.1.1.02', codigo: '1.1.1.02', nombre: 'Fondo Fijo', tipo: 'Activo', jerarquia: 4, imputable: true, expanded: false, hijos: [] },
                { id: '1.1.1.03', codigo: '1.1.1.03', nombre: 'Banco Nación Cta. Cte.', tipo: 'Activo', jerarquia: 4, imputable: true, expanded: false, hijos: [] }
              ]
            },
            {
              id: '1.1.2', codigo: '1.1.2', nombre: 'Inversiones', tipo: 'Activo', jerarquia: 3, imputable: false, expanded: false, hijos: [
                { id: '1.1.2.01', codigo: '1.1.2.01', nombre: 'Plazo Fijo Banco Nación', tipo: 'Activo', jerarquia: 4, imputable: true, expanded: false, hijos: [] }
              ]
            }
          ]
        },
        {
          id: '1.2', codigo: '1.2', nombre: 'Activo No Corriente', tipo: 'Activo', jerarquia: 2, imputable: false, expanded: false, hijos: [
            { id: '1.2.1', codigo: '1.2.1', nombre: 'Bienes de Uso', tipo: 'Activo', jerarquia: 3, imputable: false, expanded: false, hijos: [] }
          ]
        }
      ]
    },
    {
      id: '2', codigo: '2', nombre: 'PASIVO', tipo: 'Pasivo', jerarquia: 1, imputable: false, expanded: false, hijos: []
    },
    {
      id: '3', codigo: '3', nombre: 'PATRIMONIO NETO', tipo: 'Patrimonio', jerarquia: 1, imputable: false, expanded: false, hijos: []
    },
    {
      id: '4', codigo: '4', nombre: 'INGRESOS', tipo: 'Ingresos', jerarquia: 1, imputable: false, expanded: false, hijos: []
    },
    {
      id: '5', codigo: '5', nombre: 'EGRESOS', tipo: 'Egresos', jerarquia: 1, imputable: false, expanded: false, hijos: []
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
      const matches = node.nombre.toLowerCase().includes(term) || node.codigo.includes(term);
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

    // Determinar nivel y tipo según padre
    let newJerarquia = 1;
    let newTipo: Cuenta['tipo'] = 'Activo';

    if (parentId) {
      const parent = this.findCuenta(this.cuentasData(), parentId);
      if (parent) {
        newJerarquia = parent.jerarquia + 1;
        newTipo = parent.tipo;
      }
    }

    this.currentAccount.set({
      codigo: '',
      nombre: '',
      tipo: newTipo,
      jerarquia: newJerarquia,
      imputable: true,
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

    if (!accountToSave.codigo || !accountToSave.nombre) return;

    const data = [...this.cuentasData()];

    if (this.modalMode() === 'create') {
      accountToSave.id = Date.now().toString(); // simple id gen
      accountToSave.hijos = [];

      const parentId = this.selectedParentId();
      if (parentId) {
        const parent = this.findCuenta(data, parentId);
        if (parent) {
          accountToSave.jerarquia = parent.jerarquia + 1;
          accountToSave.tipo = parent.tipo;
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
        original.nombre = accountToSave.nombre;
        original.tipo = accountToSave.tipo;
        original.imputable = accountToSave.imputable;
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
    csvContent += "Codigo,Nombre,Tipo,Imputable,Nivel\n";

    const all: Cuenta[] = [];
    this.flattenTree(this.cuentasData(), all, false);

    all.forEach(row => {
      csvContent += `${row.codigo},${row.nombre},${row.tipo},${row.imputable ? 'Si' : 'No'},${row.jerarquia}\n`;
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
