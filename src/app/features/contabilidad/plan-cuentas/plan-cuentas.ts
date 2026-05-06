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
    "descripcion": "ACTIVO",
    "imputable": false,
    "ajustaInflacion": false,
    "centroCosto": false,
    "expanded": true,
    "hijos": [
      {
        "descripcion": "ACTIVO CORRIENTE",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "CAJA Y BANCOS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "CAJAS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Caja Central",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.01",
                    "id": "1.1.1.01.01"
                  },
                  {
                    "descripcion": "Caja chica",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.02",
                    "id": "1.1.1.01.02"
                  },
                  {
                    "descripcion": "Caja en Moneda Extranjera",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.03",
                    "id": "1.1.1.01.03"
                  },
                  {
                    "descripcion": "Valores a depositar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.04",
                    "id": "1.1.1.01.04"
                  },
                  {
                    "descripcion": "Cupones de Tarjetas de Crédito a Depositar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.05",
                    "id": "1.1.1.01.05"
                  },
                  {
                    "descripcion": "Recaudaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.06",
                    "id": "1.1.1.01.06"
                  },
                  {
                    "descripcion": "Caja Euros",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.07",
                    "id": "1.1.1.01.07"
                  },
                  {
                    "descripcion": "Caja Reales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.01.08",
                    "id": "1.1.1.01.08"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.1.01",
                "id": "1.1.1.01"
              },
              {
                "descripcion": "BANCOS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Banco de la Nación Argentina c/c en pesos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.02.01",
                    "id": "1.1.1.02.01"
                  },
                  {
                    "descripcion": "Banco de la Provincia de Buenos Aires c/c",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.02.02",
                    "id": "1.1.1.02.02"
                  },
                  {
                    "descripcion": "Banco del exterior",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.1.02.03",
                    "id": "1.1.1.02.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.1.02",
                "id": "1.1.1.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.1.1",
            "id": "1.1.1"
          },
          {
            "descripcion": "INVERSIONES TEMPORARIAS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "INVERSIONES EN ACCIONES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Acciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.2.01.01",
                    "id": "1.1.2.01.01"
                  },
                  {
                    "descripcion": "Títulos de Deuda Pública (Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.2.01.02",
                    "id": "1.1.2.01.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.2.01",
                "id": "1.1.2.01"
              },
              {
                "descripcion": "DEPÓSITOS A PLAZO FIJO",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Depósitos a Plazo Fijo en pesos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.2.02.01",
                    "id": "1.1.2.02.01"
                  },
                  {
                    "descripcion": "Depósitos a Plazo Fijo en moneda extranjera",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.2.02.02",
                    "id": "1.1.2.02.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.2.02",
                "id": "1.1.2.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.1.2",
            "id": "1.1.2"
          },
          {
            "descripcion": "CRÉDITOS POR VENTAS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "DEUDORES EN CTA.CTE",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Deudores Locales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.01",
                    "id": "1.1.3.01.01"
                  },
                  {
                    "descripcion": "Deudores del exterior",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.02",
                    "id": "1.1.3.01.02"
                  },
                  {
                    "descripcion": "Deudores morosos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.03",
                    "id": "1.1.3.01.03"
                  },
                  {
                    "descripcion": "Deudores en Gestión Judicial",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.04",
                    "id": "1.1.3.01.04"
                  },
                  {
                    "descripcion": "Deudores por Tarjeta",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.05",
                    "id": "1.1.3.01.05"
                  },
                  {
                    "descripcion": "Cheques de Terceros Rechazados",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.06",
                    "id": "1.1.3.01.06"
                  },
                  {
                    "descripcion": "Documentos a cobrar por ventas (Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.07",
                    "id": "1.1.3.01.07"
                  },
                  {
                    "descripcion": "Previsión para deudores incobrables",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.3.01.08",
                    "id": "1.1.3.01.08"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.3.01",
                "id": "1.1.3.01"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.1.3",
            "id": "1.1.3"
          },
          {
            "descripcion": "OTROS CRÉDITOS CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "CRÉDITOS IMPOSITIVOS CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Anticipos Impuesto a las Ganancias",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.01",
                    "id": "1.1.4.01.01"
                  },
                  {
                    "descripcion": "Anticipos Impuesto a los IIBB",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.02",
                    "id": "1.1.4.01.02"
                  },
                  {
                    "descripcion": "Percepciones y Retenciones Impto. a los IIBB",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.03",
                    "id": "1.1.4.01.03"
                  },
                  {
                    "descripcion": "IVA Crédito Fiscal",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.04",
                    "id": "1.1.4.01.04"
                  },
                  {
                    "descripcion": "IVA Crédito Fiscal Exportación",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.05",
                    "id": "1.1.4.01.05"
                  },
                  {
                    "descripcion": "IVA Saldo a Favor Técnico",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.06",
                    "id": "1.1.4.01.06"
                  },
                  {
                    "descripcion": "IVA Saldo a Favor Técnico (exportaciones)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.07",
                    "id": "1.1.4.01.07"
                  },
                  {
                    "descripcion": "IVA Saldo a Favor Técnico de Libre Disponibilidad",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.08",
                    "id": "1.1.4.01.08"
                  },
                  {
                    "descripcion": "Percepciones y Retenciones de IVA",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.09",
                    "id": "1.1.4.01.09"
                  },
                  {
                    "descripcion": "Créditos por quebrantos impositivos no utiliz.",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.10",
                    "id": "1.1.4.01.10"
                  },
                  {
                    "descripcion": "Retenciones  y Percepciones de Ganancias",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.01.11",
                    "id": "1.1.4.01.11"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.4.01",
                "id": "1.1.4.01"
              },
              {
                "descripcion": "CRÉDITOS DIVERSOS CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Cuentas Particulares Directores",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.02.01",
                    "id": "1.1.4.02.01"
                  },
                  {
                    "descripcion": "Accionistas (Cuentas Particulares)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.02.02",
                    "id": "1.1.4.02.02"
                  },
                  {
                    "descripcion": "Anticipos a Proveedores (No cong.precio)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.02.03",
                    "id": "1.1.4.02.03"
                  },
                  {
                    "descripcion": "Anticipos de Sueldos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.02.04",
                    "id": "1.1.4.02.04"
                  },
                  {
                    "descripcion": "Depósitos pendientes de acreditación",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.02.05",
                    "id": "1.1.4.02.05"
                  },
                  {
                    "descripcion": "Arrendamiento pagado por adelantado",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.4.02.06",
                    "id": "1.1.4.02.06"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.4.02",
                "id": "1.1.4.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.1.4",
            "id": "1.1.4"
          },
          {
            "descripcion": "BIENES DE CAMBIO",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "MERCADERÍAS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Mercaderías A",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.5.01.01",
                    "id": "1.1.5.01.01"
                  },
                  {
                    "descripcion": "Mercaderías B",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.5.01.02",
                    "id": "1.1.5.01.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.5.01",
                "id": "1.1.5.01"
              },
              {
                "descripcion": "ANTICIPOS A PROVEEDORES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Anticipos a Proveedores Mercaderías A",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.5.02.01",
                    "id": "1.1.5.02.01"
                  },
                  {
                    "descripcion": "Anticipos a Proveedores Mercaderías B",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.1.5.02.02",
                    "id": "1.1.5.02.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.1.5.02",
                "id": "1.1.5.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.1.5",
            "id": "1.1.5"
          },
          {
            "descripcion": "OTROS ACTIVOS CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "1.1.6",
            "id": "1.1.6"
          }
        ],
        "jerarquia": 2,
        "codigo": "1.1",
        "id": "1.1"
      },
      {
        "descripcion": "ACTIVO NO CORRIENTE",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "CRÉDITOS POR VENTAS NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "DEUDORES NO CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Deudores Locales ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.1.01.01",
                    "id": "1.2.1.01.01"
                  },
                  {
                    "descripcion": "Deudores del Exterior ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.1.01.02",
                    "id": "1.2.1.01.02"
                  },
                  {
                    "descripcion": "Documentos a cobrar por Ventas ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.1.01.03",
                    "id": "1.2.1.01.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.1.01",
                "id": "1.2.1.01"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.2.1",
            "id": "1.2.1"
          },
          {
            "descripcion": "OTROS CRÉDITOS NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "CRÉDITOS IMPOSITIVOS NO CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Activos por Impuesto Diferido ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.2.01.01",
                    "id": "1.2.2.01.01"
                  },
                  {
                    "descripcion": "Créditos por quebrantos Impositivos no utiliz. ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.2.01.02",
                    "id": "1.2.2.01.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.2.01",
                "id": "1.2.2.01"
              },
              {
                "descripcion": "CRÉDITOS DIVERSOS NO CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Cuentas particulares Directores ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.2.02.01",
                    "id": "1.2.2.02.01"
                  },
                  {
                    "descripcion": "Cuentas particulares Accionistas ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.2.02.02",
                    "id": "1.2.2.02.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.2.02",
                "id": "1.2.2.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.2.2",
            "id": "1.2.2"
          },
          {
            "descripcion": "BIENES DE CAMBIO NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "MERCADERÍAS NO CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Mercaderias A ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.3.01.01",
                    "id": "1.2.3.01.01"
                  },
                  {
                    "descripcion": "Mercaderias A ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.3.01.02",
                    "id": "1.2.3.01.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.3.01",
                "id": "1.2.3.01"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.2.3",
            "id": "1.2.3"
          },
          {
            "descripcion": "INVERSIONES PERMANENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "BONOS DE DEUDA NO CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Títulos de Deuda Pública ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.4.01.01",
                    "id": "1.2.4.01.01"
                  },
                  {
                    "descripcion": "Bonex (No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.4.01.02",
                    "id": "1.2.4.01.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.4.01",
                "id": "1.2.4.01"
              },
              {
                "descripcion": "DEPÓSITOS A PLAZO FIJO NO CORRIENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Depósitos a Plazo Fijo en pesos ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.4.02.01",
                    "id": "1.2.4.02.01"
                  },
                  {
                    "descripcion": "Depósitos a Plazo Fijo en Moneda Extranjera ( No Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.4.02.02",
                    "id": "1.2.4.02.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.4.02",
                "id": "1.2.4.02"
              },
              {
                "descripcion": "INVERSIONES EN BIENES DEPRECIABLES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Inversiones en Inmuebles Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.4.03.01",
                    "id": "1.2.4.03.01"
                  },
                  {
                    "descripcion": "Inversiones en Inmuebles Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.4.03.02",
                    "id": "1.2.4.03.02"
                  },
                  {
                    "descripcion": "Amortizaciones Acumuladas Inversiones en Inmuebles",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.4.03.03",
                    "id": "1.2.4.03.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.4.03",
                "id": "1.2.4.03"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.2.4",
            "id": "1.2.4"
          },
          {
            "descripcion": "BIENES DE USO",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "INMUEBLES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Inmuebles Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.01.01",
                    "id": "1.2.5.01.01"
                  },
                  {
                    "descripcion": "Inmuebles Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.01.02",
                    "id": "1.2.5.01.02"
                  },
                  {
                    "descripcion": "Amortizaciones Acumuladas Inmuebles",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.01.03",
                    "id": "1.2.5.01.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.5.01",
                "id": "1.2.5.01"
              },
              {
                "descripcion": "MUEBLES Y ÚTILES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Muebles y Útiles Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.02.01",
                    "id": "1.2.5.02.01"
                  },
                  {
                    "descripcion": "Muebles y Útiles Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.02.02",
                    "id": "1.2.5.02.02"
                  },
                  {
                    "descripcion": "Amortizaciones Acumuladas Muebles y Útiles",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.02.03",
                    "id": "1.2.5.02.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.5.02",
                "id": "1.2.5.02"
              },
              {
                "descripcion": "RODADOS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Rodados Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.03.01",
                    "id": "1.2.5.03.01"
                  },
                  {
                    "descripcion": "Rodados Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.03.02",
                    "id": "1.2.5.03.02"
                  },
                  {
                    "descripcion": "Amortizaciones Acumuladas Rodados",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.03.03",
                    "id": "1.2.5.03.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.5.03",
                "id": "1.2.5.03"
              },
              {
                "descripcion": "TERRENOS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Terrenos Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.04.01",
                    "id": "1.2.5.04.01"
                  },
                  {
                    "descripcion": "Terrenos Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.04.02",
                    "id": "1.2.5.04.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.5.04",
                "id": "1.2.5.04"
              },
              {
                "descripcion": "INSTALACIONES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Instalaciones Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.05.01",
                    "id": "1.2.5.05.01"
                  },
                  {
                    "descripcion": "Instalaciones Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.05.02",
                    "id": "1.2.5.05.02"
                  },
                  {
                    "descripcion": "Amortizaciones Acumuladas Instalaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.05.03",
                    "id": "1.2.5.05.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.5.05",
                "id": "1.2.5.05"
              },
              {
                "descripcion": "HERRAMIENTAS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Herramientas Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.06.01",
                    "id": "1.2.5.06.01"
                  },
                  {
                    "descripcion": "Herramientas Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.06.02",
                    "id": "1.2.5.06.02"
                  },
                  {
                    "descripcion": "Amortizaciones Acumuladas Herramientas",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.5.06.03",
                    "id": "1.2.5.06.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.5.06",
                "id": "1.2.5.06"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.2.5",
            "id": "1.2.5"
          },
          {
            "descripcion": "ACTIVOS INTANGIBLES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "MARCAS Y PATENTES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Marcas y Patentes Valores Originales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.6.01.01",
                    "id": "1.2.6.01.01"
                  },
                  {
                    "descripcion": "Marcas y Patentes Actualizaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.6.01.02",
                    "id": "1.2.6.01.02"
                  },
                  {
                    "descripcion": "Amortizaciones Acumuladas Marcas y Patentes",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.6.01.03",
                    "id": "1.2.6.01.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.6.01",
                "id": "1.2.6.01"
              },
              {
                "descripcion": "COMPRAS BIENES DE USO",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Compras de Bienes de Uso",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.6.02.01",
                    "id": "1.2.6.02.01"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.6.02",
                "id": "1.2.6.02"
              },
              {
                "descripcion": "COMPRAS DE ACTIVOS INTANGIBLES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Compras de Activos Intangibles",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "1.2.6.03.01",
                    "id": "1.2.6.03.01"
                  }
                ],
                "jerarquia": 4,
                "codigo": "1.2.6.03",
                "id": "1.2.6.03"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.2.6",
            "id": "1.2.6"
          },
          {
            "descripcion": "OTROS ACTIVOS NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Llave de Negocio",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "1.2.7.01",
                "id": "1.2.7.01"
              }
            ],
            "jerarquia": 3,
            "codigo": "1.2.7",
            "id": "1.2.7"
          }
        ],
        "jerarquia": 2,
        "codigo": "1.2",
        "id": "1.2"
      }
    ],
    "jerarquia": 1,
    "codigo": "1",
    "id": "1"
  },
  {
    "descripcion": "PASIVO",
    "imputable": false,
    "ajustaInflacion": false,
    "centroCosto": false,
    "expanded": true,
    "hijos": [
      {
        "descripcion": "PASIVO CORRIENTE",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "DEUDAS COMERCIALES CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "PROVEEDORES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Proveedores ( Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.1.01.01",
                    "id": "2.1.1.01.01"
                  },
                  {
                    "descripcion": "Documentos a Pagar ( Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.1.01.02",
                    "id": "2.1.1.01.02"
                  },
                  {
                    "descripcion": "Anticipo de Clientes",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.1.01.03",
                    "id": "2.1.1.01.03"
                  },
                  {
                    "descripcion": "Cheques Propios Rechazados",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.1.01.04",
                    "id": "2.1.1.01.04"
                  }
                ],
                "jerarquia": 4,
                "codigo": "2.1.1.01",
                "id": "2.1.1.01"
              },
              {
                "descripcion": "ACREEDORES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Acreedores Locales ( Ctes.)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.1.02.01",
                    "id": "2.1.1.02.01"
                  },
                  {
                    "descripcion": "Banco de la Nacion Argentina Cheque Diferido",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.1.02.02",
                    "id": "2.1.1.02.02"
                  },
                  {
                    "descripcion": "Banco de la Pcia de Buenos Aires Cheque Diferido",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.1.02.03",
                    "id": "2.1.1.02.03"
                  }
                ],
                "jerarquia": 4,
                "codigo": "2.1.1.02",
                "id": "2.1.1.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.1.1",
            "id": "2.1.1"
          },
          {
            "descripcion": "REMUNERACIONES Y CARGAS SOCIALES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "DEUDAS PREVISIONALES",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Jubilaciones a pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.2.01.01",
                    "id": "2.1.2.01.01"
                  },
                  {
                    "descripcion": "ART a Pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.2.01.02",
                    "id": "2.1.2.01.02"
                  },
                  {
                    "descripcion": "Obra Social a pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.2.01.03",
                    "id": "2.1.2.01.03"
                  },
                  {
                    "descripcion": "SAC a pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.2.01.04",
                    "id": "2.1.2.01.04"
                  },
                  {
                    "descripcion": "Vacaciones a pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.2.01.05",
                    "id": "2.1.2.01.05"
                  },
                  {
                    "descripcion": "Ley 19032  a pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.2.01.06",
                    "id": "2.1.2.01.06"
                  },
                  {
                    "descripcion": "Sueldos y Jornales a pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.2.01.07",
                    "id": "2.1.2.01.07"
                  }
                ],
                "jerarquia": 4,
                "codigo": "2.1.2.01",
                "id": "2.1.2.01"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.1.2",
            "id": "2.1.2"
          },
          {
            "descripcion": "CARGAS FISCALES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "IMPUESTO AL VALOR AGREGADO",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "IVA Débito Fiscal",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.01.01",
                    "id": "2.1.3.01.01"
                  },
                  {
                    "descripcion": "IVA Débito Fiscal Sobretasa",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.01.02",
                    "id": "2.1.3.01.02"
                  },
                  {
                    "descripcion": "Retenciones efectuadas IVA",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.01.03",
                    "id": "2.1.3.01.03"
                  },
                  {
                    "descripcion": "Percepciones efectuadas IVA",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.01.04",
                    "id": "2.1.3.01.04"
                  },
                  {
                    "descripcion": "IVA a Pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.01.05",
                    "id": "2.1.3.01.05"
                  }
                ],
                "jerarquia": 4,
                "codigo": "2.1.3.01",
                "id": "2.1.3.01"
              },
              {
                "descripcion": "IMPUESTO A LOS INGRESOS BRUTOS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Impuesto a los Ingresos Brutos a Pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.02.01",
                    "id": "2.1.3.02.01"
                  },
                  {
                    "descripcion": "Percepciones efectuadas Ingresos Brutos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.02.02",
                    "id": "2.1.3.02.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "2.1.3.02",
                "id": "2.1.3.02"
              },
              {
                "descripcion": "IMPUESTO A LAS GANANCIAS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Impuesto Ganancia Mínima Presunta a Pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.03.01",
                    "id": "2.1.3.03.01"
                  },
                  {
                    "descripcion": "Impuesto a las Ganancias a Pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.03.02",
                    "id": "2.1.3.03.02"
                  },
                  {
                    "descripcion": "Percepciones y Retenciones efectuadas Imp.",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.03.03",
                    "id": "2.1.3.03.03"
                  },
                  {
                    "descripcion": "Provisión Impuesto a las Ganancias",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.03.04",
                    "id": "2.1.3.03.04"
                  }
                ],
                "jerarquia": 4,
                "codigo": "2.1.3.03",
                "id": "2.1.3.03"
              },
              {
                "descripcion": "IMPUESTOS INTERNOS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Impuestos Internos a Pagar",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "2.1.3.04.01",
                    "id": "2.1.3.04.01"
                  }
                ],
                "jerarquia": 4,
                "codigo": "2.1.3.04",
                "id": "2.1.3.04"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.1.3",
            "id": "2.1.3"
          },
          {
            "descripcion": "DEUDAS FINANCIERAS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Préstamo Banco de la Nación Arg. (Cte.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.1.4.01",
                "id": "2.1.4.01"
              },
              {
                "descripcion": "Préstamo Banco de la Provincia de Bs As (Cte.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.1.4.02",
                "id": "2.1.4.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.1.4",
            "id": "2.1.4"
          },
          {
            "descripcion": "OTRAS DEUDAS CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Dividendos a Pagar ( Ctes.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.1.5.01",
                "id": "2.1.5.01"
              },
              {
                "descripcion": "Honorarios Directores a Pagar (Ctes.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.1.5.02",
                "id": "2.1.5.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.1.5",
            "id": "2.1.5"
          },
          {
            "descripcion": "PROVISIONES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Provisión para Despidos",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.1.6.01",
                "id": "2.1.6.01"
              },
              {
                "descripcion": "Provisión para SAC",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.1.6.02",
                "id": "2.1.6.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.1.6",
            "id": "2.1.6"
          }
        ],
        "jerarquia": 2,
        "codigo": "2.1",
        "id": "2.1"
      },
      {
        "descripcion": "PASIVO NO CORRIENTE",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "DEUDAS COMERCIALES NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Proveedores (No Cte.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.2.1.01",
                "id": "2.2.1.01"
              },
              {
                "descripcion": "Documentos a Pagar ( No Ctes.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.2.1.02",
                "id": "2.2.1.02"
              },
              {
                "descripcion": "Acreedores ( No Ctes.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.2.1.03",
                "id": "2.2.1.03"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.2.1",
            "id": "2.2.1"
          },
          {
            "descripcion": "CARGAS FISCALES NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Moratoria",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.2.2.01",
                "id": "2.2.2.01"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.2.2",
            "id": "2.2.2"
          },
          {
            "descripcion": "DEUDAS FINANCIERAS NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Préstamo Bco. de la Nación Argentina ( No Cte.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.2.3.01",
                "id": "2.2.3.01"
              },
              {
                "descripcion": "Préstamo Bco. de la Provincia de Bs As ( No Cte.)",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "2.2.3.02",
                "id": "2.2.3.02"
              }
            ],
            "jerarquia": 3,
            "codigo": "2.2.3",
            "id": "2.2.3"
          },
          {
            "descripcion": "OTRAS DEUDAS NO CORRIENTES",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "2.2.4",
            "id": "2.2.4"
          }
        ],
        "jerarquia": 2,
        "codigo": "2.2",
        "id": "2.2"
      }
    ],
    "jerarquia": 1,
    "codigo": "2",
    "id": "2"
  },
  {
    "descripcion": "PATRIMONIO NETO",
    "imputable": false,
    "ajustaInflacion": false,
    "centroCosto": false,
    "expanded": true,
    "hijos": [
      {
        "descripcion": "APORTE DE LOS PROPIETARIOS",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "Capital",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.1.1",
            "id": "3.1.1"
          },
          {
            "descripcion": "Ajuste del Capital",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.1.2",
            "id": "3.1.2"
          },
          {
            "descripcion": "Aportes Irrevocables",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.1.3",
            "id": "3.1.3"
          },
          {
            "descripcion": "Acciones a distribuir",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.1.4",
            "id": "3.1.4"
          }
        ],
        "jerarquia": 2,
        "codigo": "3.1",
        "id": "3.1"
      },
      {
        "descripcion": "RESERVAS",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "Reserva Legal",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.2.1",
            "id": "3.2.1"
          },
          {
            "descripcion": "Reserva Facultativa",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.2.2",
            "id": "3.2.2"
          },
          {
            "descripcion": "Reserva Estatutaria",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.2.3",
            "id": "3.2.3"
          },
          {
            "descripcion": "Ajuste Reserva Legal",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.2.4",
            "id": "3.2.4"
          }
        ],
        "jerarquia": 2,
        "codigo": "3.2",
        "id": "3.2"
      },
      {
        "descripcion": "RESULTADOS ACUMULADOS",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "Resultado del Ejercicio",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.3.1",
            "id": "3.3.1"
          },
          {
            "descripcion": "Resultado Ejercicios Anteriores",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.3.2",
            "id": "3.3.2"
          },
          {
            "descripcion": "A.R.E.A. (P)",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.3.3",
            "id": "3.3.3"
          },
          {
            "descripcion": "A.R.E.A. (G)",
            "imputable": true,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": false,
            "hijos": [],
            "jerarquia": 3,
            "codigo": "3.3.4",
            "id": "3.3.4"
          }
        ],
        "jerarquia": 2,
        "codigo": "3.3",
        "id": "3.3"
      }
    ],
    "jerarquia": 1,
    "codigo": "3",
    "id": "3"
  },
  {
    "descripcion": "RESULTADO DEL PERÍODO",
    "imputable": false,
    "ajustaInflacion": false,
    "centroCosto": false,
    "expanded": true,
    "hijos": [
      {
        "descripcion": "INGRESOS",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "INGRESOS ORDINARIOS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "VENTAS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Ventas Mercaderías A",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.01",
                    "id": "4.1.1.01.01"
                  },
                  {
                    "descripcion": "Ventas Mercaderías B",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.02",
                    "id": "4.1.1.01.02"
                  },
                  {
                    "descripcion": "Reintegros y desgravaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.03",
                    "id": "4.1.1.01.03"
                  },
                  {
                    "descripcion": "Exportaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.04",
                    "id": "4.1.1.01.04"
                  },
                  {
                    "descripcion": "Descuentos Obtenidos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.05",
                    "id": "4.1.1.01.05"
                  },
                  {
                    "descripcion": "Reintegros por exportaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.06",
                    "id": "4.1.1.01.06"
                  },
                  {
                    "descripcion": "Ingresos de Fuente Extranjera",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.07",
                    "id": "4.1.1.01.07"
                  },
                  {
                    "descripcion": "Reparaciones",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.08",
                    "id": "4.1.1.01.08"
                  },
                  {
                    "descripcion": "Fletes  y Acarreos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.01.09",
                    "id": "4.1.1.01.09"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.1.1.01",
                "id": "4.1.1.01"
              },
              {
                "descripcion": "RESULTADO POR VALUACIÓN DE BIENES DE CAMBIO",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Ganancia por valuación de Bs. de Cambio",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.02.01",
                    "id": "4.1.1.02.01"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.1.1.02",
                "id": "4.1.1.02"
              },
              {
                "descripcion": "RESULTADOS FINANCIEROS Y POR TENENCIA",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Intereses Ganados",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.03.01",
                    "id": "4.1.1.03.01"
                  },
                  {
                    "descripcion": "Diferencia de cambio positiva",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.1.1.03.02",
                    "id": "4.1.1.03.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.1.1.03",
                "id": "4.1.1.03"
              },
              {
                "descripcion": "OTROS INGRESOS ORDINARIOS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.1.1.04",
                "id": "4.1.1.04"
              }
            ],
            "jerarquia": 3,
            "codigo": "4.1.1",
            "id": "4.1.1"
          },
          {
            "descripcion": "INGRESOS EXTRAORDINARIOS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Utilidad Venta Bienes de Uso",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.1.2.01",
                "id": "4.1.2.01"
              },
              {
                "descripcion": "Reintegro de Seguros",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.1.2.02",
                "id": "4.1.2.02"
              },
              {
                "descripcion": "Venta de Bienes de uso",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.1.2.03",
                "id": "4.1.2.03"
              }
            ],
            "jerarquia": 3,
            "codigo": "4.1.2",
            "id": "4.1.2"
          }
        ],
        "jerarquia": 2,
        "codigo": "4.1",
        "id": "4.1"
      },
      {
        "descripcion": "EGRESOS",
        "imputable": false,
        "ajustaInflacion": false,
        "centroCosto": false,
        "expanded": true,
        "hijos": [
          {
            "descripcion": "EGRESOS ORDINARIOS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "COSTO DE VENTAS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Costo de Ventas Mercaderias A",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.01.01",
                    "id": "4.2.1.01.01"
                  },
                  {
                    "descripcion": "Costo de Ventas Mercaderias B",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.01.02",
                    "id": "4.2.1.01.02"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.2.1.01",
                "id": "4.2.1.01"
              },
              {
                "descripcion": "RESULTADO POR VALUACIÓN DE BS CBIO A VNR",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Pérdida por valuación de Bs. de Cambio",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.02.01",
                    "id": "4.2.1.02.01"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.2.1.02",
                "id": "4.2.1.02"
              },
              {
                "descripcion": "GASTOS DE ADMINISTRACIÓN",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Sueldos Administración",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.01",
                    "id": "4.2.1.03.01"
                  },
                  {
                    "descripcion": "Cargas Sociales Administración",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.02",
                    "id": "4.2.1.03.02"
                  },
                  {
                    "descripcion": "Despidos Administración",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.03",
                    "id": "4.2.1.03.03"
                  },
                  {
                    "descripcion": "Honorarios Administración",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.04",
                    "id": "4.2.1.03.04"
                  },
                  {
                    "descripcion": "Amortizaciones Administración",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.05",
                    "id": "4.2.1.03.05"
                  },
                  {
                    "descripcion": "Viáticos Administración",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.06",
                    "id": "4.2.1.03.06"
                  },
                  {
                    "descripcion": "Librería y Papelería",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.07",
                    "id": "4.2.1.03.07"
                  },
                  {
                    "descripcion": "Gastos Varios administración",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.08",
                    "id": "4.2.1.03.08"
                  },
                  {
                    "descripcion": "Insumos Computación",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.09",
                    "id": "4.2.1.03.09"
                  },
                  {
                    "descripcion": "Correspondencia",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.10",
                    "id": "4.2.1.03.10"
                  },
                  {
                    "descripcion": "Mantenimiento equipos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.11",
                    "id": "4.2.1.03.11"
                  },
                  {
                    "descripcion": "Energía",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.12",
                    "id": "4.2.1.03.12"
                  },
                  {
                    "descripcion": "Seguros",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.03.13",
                    "id": "4.2.1.03.13"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.2.1.03",
                "id": "4.2.1.03"
              },
              {
                "descripcion": "GASTOS DE COMERCIALIZACIÓN",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Cargas Sociales comercialización",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.01",
                    "id": "4.2.1.04.01"
                  },
                  {
                    "descripcion": "Publicidad",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.02",
                    "id": "4.2.1.04.02"
                  },
                  {
                    "descripcion": "Amortizaciones Comercialización",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.03",
                    "id": "4.2.1.04.03"
                  },
                  {
                    "descripcion": "Seguros Comercialización",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.04",
                    "id": "4.2.1.04.04"
                  },
                  {
                    "descripcion": "Honorarios Comercialización",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.05",
                    "id": "4.2.1.04.05"
                  },
                  {
                    "descripcion": "Gastos Varios Comercialización",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.06",
                    "id": "4.2.1.04.06"
                  },
                  {
                    "descripcion": "Gastos Exportación",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.07",
                    "id": "4.2.1.04.07"
                  },
                  {
                    "descripcion": "IVA no computable",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.08",
                    "id": "4.2.1.04.08"
                  },
                  {
                    "descripcion": "Descuentos otorgados a clientes",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.09",
                    "id": "4.2.1.04.09"
                  },
                  {
                    "descripcion": "Comisiones de terceros",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.10",
                    "id": "4.2.1.04.10"
                  },
                  {
                    "descripcion": "Quebrantos por deudores incobrables",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.11",
                    "id": "4.2.1.04.11"
                  },
                  {
                    "descripcion": "Viáticos Comercialización",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.04.12",
                    "id": "4.2.1.04.12"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.2.1.04",
                "id": "4.2.1.04"
              },
              {
                "descripcion": "GASTOS FINANCIEROS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Intereses y Gastos bancarios",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.01",
                    "id": "4.2.1.05.01"
                  },
                  {
                    "descripcion": "Intereses de Proveedores",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.02",
                    "id": "4.2.1.05.02"
                  },
                  {
                    "descripcion": "Intereses y Recargos impositivos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.03",
                    "id": "4.2.1.05.03"
                  },
                  {
                    "descripcion": "Diferencias de Cambio",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.04",
                    "id": "4.2.1.05.04"
                  },
                  {
                    "descripcion": "Diferencias de Cambio Bces. en M. Extranjera",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.05",
                    "id": "4.2.1.05.05"
                  },
                  {
                    "descripcion": "Resultado por tenencia (negativo)",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.06",
                    "id": "4.2.1.05.06"
                  },
                  {
                    "descripcion": "Amortizaciones Inversiones en Bienes Depreciables",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.07",
                    "id": "4.2.1.05.07"
                  },
                  {
                    "descripcion": "R.E.C.P.A.M",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.08",
                    "id": "4.2.1.05.08"
                  },
                  {
                    "descripcion": "Gastos por Rechazos Bancarios",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.09",
                    "id": "4.2.1.05.09"
                  },
                  {
                    "descripcion": "Cupones Rechazados",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.05.10",
                    "id": "4.2.1.05.10"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.2.1.05",
                "id": "4.2.1.05"
              },
              {
                "descripcion": "IMPUESTOS",
                "imputable": false,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": true,
                "hijos": [
                  {
                    "descripcion": "Impuesto a las Ganancias",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.06.01",
                    "id": "4.2.1.06.01"
                  },
                  {
                    "descripcion": "Impuesto a la Ganancia mínima presunta",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.06.02",
                    "id": "4.2.1.06.02"
                  },
                  {
                    "descripcion": "Impuesto a los Ingresos Brutos",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.06.03",
                    "id": "4.2.1.06.03"
                  },
                  {
                    "descripcion": "Tasa Municipal",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.06.04",
                    "id": "4.2.1.06.04"
                  },
                  {
                    "descripcion": "Impuestos Territoriales",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.06.05",
                    "id": "4.2.1.06.05"
                  },
                  {
                    "descripcion": "Impuesto s/los Débitos y Créditos Bancarios",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.06.06",
                    "id": "4.2.1.06.06"
                  },
                  {
                    "descripcion": "Impuestos internos y varios",
                    "imputable": true,
                    "ajustaInflacion": false,
                    "centroCosto": false,
                    "expanded": false,
                    "hijos": [],
                    "jerarquia": 5,
                    "codigo": "4.2.1.06.07",
                    "id": "4.2.1.06.07"
                  }
                ],
                "jerarquia": 4,
                "codigo": "4.2.1.06",
                "id": "4.2.1.06"
              }
            ],
            "jerarquia": 3,
            "codigo": "4.2.1",
            "id": "4.2.1"
          },
          {
            "descripcion": "EGRESOS EXTRAORDINARIOS",
            "imputable": false,
            "ajustaInflacion": false,
            "centroCosto": false,
            "expanded": true,
            "hijos": [
              {
                "descripcion": "Pérdida por venta bienes de uso",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.2.2.01",
                "id": "4.2.2.01"
              },
              {
                "descripcion": "Ajustes cuentas bancarias",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.2.2.02",
                "id": "4.2.2.02"
              },
              {
                "descripcion": "Amortizaciones extraordinarias",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.2.2.03",
                "id": "4.2.2.03"
              },
              {
                "descripcion": "Ajuste del valor de los bienes",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.2.2.04",
                "id": "4.2.2.04"
              },
              {
                "descripcion": "Ajuste de amortizaciones acumuladas de bienes",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.2.2.05",
                "id": "4.2.2.05"
              },
              {
                "descripcion": "Obsolescencia, Siniestros, Hurtos",
                "imputable": true,
                "ajustaInflacion": false,
                "centroCosto": false,
                "expanded": false,
                "hijos": [],
                "jerarquia": 4,
                "codigo": "4.2.2.06",
                "id": "4.2.2.06"
              }
            ],
            "jerarquia": 3,
            "codigo": "4.2.2",
            "id": "4.2.2"
          }
        ],
        "jerarquia": 2,
        "codigo": "4.2",
        "id": "4.2"
      }
    ],
    "jerarquia": 1,
    "codigo": "4",
    "id": "4"
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
