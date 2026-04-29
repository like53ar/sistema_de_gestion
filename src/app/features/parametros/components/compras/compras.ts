import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParametrosComprasService, ParametrosComprasData } from '../../../../core/services/parametros-compras.service';
import { ProveedoresService, ProveedorData } from '../../../../core/services/proveedores.service';

// ── Modelos Impuestos ─────────────────────────────────────────────────────────
export interface JurisdiccionRow {
  codigoProvincia: string;
  descripcionProvincia: string;
  clasificacionSifere: string;
  sede: boolean;
  coeficienteUnificado: string;
}

export interface ImpuestosData {
  // IVA
  codigoCategoriaIva: string;
  descripcionCategoriaIva: string;
  // IIBB
  regimenIIBB: string;
  nroIngresosBrutos: string;
  fechaVigenciaCoeficientes: string;
  // Jurisdicciones CM
  jurisdicciones: JurisdiccionRow[];
  // RG 3685 / 4597 - Libro IVA Digital
  codigoTipoOperacionAfip: string;
  codigoComprobanteAfip: string;
  generaInformacion: boolean;
  // Clasificación SIAp
  codigoClasificacionSiap: string;
  // RG 3572 - Sujetos Vinculados
  empresaVinculada: boolean;
  codigoTipoOpVinculada: string;
  // RG 1361 / RG 3665 - Controladores Fiscales
  emiteControladorFiscal: boolean;
  tipoComprobanteControlador: string;
  cai: string;
  fechaVencimientoTalonario: string;
}

// ── Modelo Resoluciones (DGI-CITI) ────────────────────────────────────────
export interface ResolucionesData {
  tipoOperacionCiti: string;
  descripcionTipoOperacion: string;
  clasificacionHabitual: string;
  descripcionClasificacion: string;
}

// ── Modelo Comprobantes ─────────────────────────────────────────────────────────
export interface ComprobantesData {
  // Créditos y Moneda
  cupoCredito: number;
  moneda: string;
  clausulaMonedaExtranjera: boolean;
  incluyeEnIvaCompras: boolean;
  // Comprobantes
  tipoNumeracion: string;
  letraHabitual: string;
  monedaHabitual: string;
  codigoCondicionCompra: string;
  descripcionCondicion: string;
  porcentajeBonificacion: number;
  // Lista de Precios
  listaIncluyeIva: boolean;
  listaIncluyeImpuestosInternos: boolean;
  // Logística
  controlRemito: string;
  controlFacturaRemito: string;
  tipoComprobanteRemito: string;
  tipoComprobanteFactura: string;
  permiteSinRemito: boolean;
}

// ── Modelo Pagos ──────────────────────────────────────────────────────────────
export interface PagosData {
  // Medios de pago
  codigoMedioPago: string;
  descripcionMedioPago: string;
  codigoCuentaDebitar: string;
  descripcionCuenta: string;
  // Cheques
  emiteCheques: boolean;
  diasCheque: number;
  ordenImpresionCheque: string;
  // CBU 1
  cbu1: string;
  cbu1Desc: string;
  cbu1Valid: boolean | null;
  // CBU 2
  cbu2: string;
  cbu2Desc: string;
  cbu2Valid: boolean | null;
  // CBU 3
  cbu3: string;
  cbu3Desc: string;
  cbu3Valid: boolean | null;
  // Pagos masivos
  habilitadoPagosMasivos: boolean;
}

// ── Modelo Clasificación ────────────────────────────────────────────────────────
export interface ClasificacionNode {
  id: string;
  label: string;
  familia?: string;
  grupo?: string;
  individuo?: string;
  children?: ClasificacionNode[];
  expanded?: boolean;
  hidden?: boolean;
  match?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}

export interface ClasificacionData {
  familia: string;
  grupo: string;
  individuo: string;
}
interface MenuItem {
  id: string;
  label: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-parametros-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras.html',
  styleUrl: './compras.scss'
})
export class ParametrosCompras implements OnInit {
  formData: ParametrosComprasData;
  activeView: string = 'dashboard';

  // Proveedor activo en la subrama Principal
  currentProveedor: ProveedorData = {
    numeroProveedor: '',
    domicilio: '', localidad: '', codigoPostal: '',
    codigoProvincia: '01', descripcionProvincia: 'Buenos Aires',
    telefono1: '', telefono2: '', movil: '',
    correoElectronico: '', paginaWeb: '',
    nombre: '', domicilioComercial: '',
    codigoRubro: '', descripcionRubro: '', actividad: '',
    fechaAlta: '', fechaInhabilitacion: ''
  };
  proveedorLoaded = false;

  // ── Datos subrama Impuestos ───────────────────────────────────────────────
  impuestosData: ImpuestosData = {
    codigoCategoriaIva: 'RI',
    descripcionCategoriaIva: 'Responsable Inscripto',
    regimenIIBB: 'local',
    nroIngresosBrutos: '',
    fechaVigenciaCoeficientes: '',
    jurisdicciones: [],
    // RG 3685 / 4597
    codigoTipoOperacionAfip: '',
    codigoComprobanteAfip: '',
    generaInformacion: true,
    // SIAp
    codigoClasificacionSiap: '',
    // RG 3572
    empresaVinculada: false,
    codigoTipoOpVinculada: '',
    // RG 1361 / 3665
    emiteControladorFiscal: false,
    tipoComprobanteControlador: '',
    cai: '',
    fechaVencimientoTalonario: ''
  };

  readonly categoriaIvaOpciones = [
    { codigo: 'RI', descripcion: 'Responsable Inscripto' },
    { codigo: 'EX', descripcion: 'Exento' },
    { codigo: 'CF', descripcion: 'Consumidor Final' },
    { codigo: 'MT', descripcion: 'Monotributo' },
    { codigo: 'NR', descripcion: 'No Responsable' },
    { codigo: 'PE', descripcion: 'Proveedor del Exterior' }
  ];

  readonly regimenIIBBOpciones = [
    { valor: 'local',         label: 'Local' },
    { valor: 'cm',            label: 'Convenio Multilateral' },
    { valor: 'no_liquida',    label: 'No liquida' },
    { valor: 'simplificado',  label: 'Régimen Simplificado' }
  ];

  /** Actualiza la descripción de IVA al cambiar el código */
  onCategoriaIvaChange() {
    const found = this.categoriaIvaOpciones.find(
      o => o.codigo === this.impuestosData.codigoCategoriaIva
    );
    this.impuestosData.descripcionCategoriaIva = found ? found.descripcion : '';
  }

  /** Agrega una fila vacía a la grilla de jurisdicciones */
  agregarJurisdiccion() {
    this.impuestosData.jurisdicciones.push({
      codigoProvincia: '',
      descripcionProvincia: '',
      clasificacionSifere: '',
      sede: false,
      coeficienteUnificado: '0,0000'
    });
  }

  /** Elimina una fila de la grilla */
  eliminarJurisdiccion(index: number) {
    this.impuestosData.jurisdicciones.splice(index, 1);
  }

  /** Solo una fila puede ser Sede = true */
  onSedeChange(index: number) {
    this.impuestosData.jurisdicciones.forEach((j, i) => {
      j.sede = i === index;
    });
  }

  /** Guarda impuestos en localStorage adjunto al proveedor actual */
  guardarImpuestos() {
    const key = 'prov_impuestos_' + this.currentProveedor.numeroProveedor;
    localStorage.setItem(key, JSON.stringify(this.impuestosData));
    alert('✅ Datos de Impuestos guardados correctamente.');
  }

  /** Continuar desde Impuestos → Resoluciones */
  continuarImpuestos() {
    this.guardarImpuestos();
    this.activeView = 'prov-resoluciones';
  }

  // ── Resoluciones (DGI-CITI) ────────────────────────────────────────────
  resolucionesData: ResolucionesData = {
    tipoOperacionCiti: '',
    descripcionTipoOperacion: '',
    clasificacionHabitual: '',
    descripcionClasificacion: ''
  };

  private readonly citiDescMap: Record<string, string> = {
    '0': 'Operaciones gravadas',
    '1': 'Operaciones no gravadas',
    '2': 'Operaciones exentas',
    '3': 'Exportaciones a zona franca',
    '4': 'Importaciones del exterior',
    '5': 'Operaciones con no inscriptos'
  };

  private readonly clasificacionDescMap: Record<string, string> = {
    'BCL': 'Compras de bienes en el mercado local',
    'GAS': 'Gastos y servicios contratados',
    'BUS': 'Bienes de uso',
    'IMP': 'Importaciones de bienes',
    'EXP': 'Exportaciones',
    'MAT': 'Materias primas e insumos',
    'OTR': 'Otros conceptos'
  };

  /** Autocompleta descripción al seleccionar Tipo de Operación CITI */
  onTipoOperacionCitiChange() {
    this.resolucionesData.descripcionTipoOperacion =
      this.citiDescMap[this.resolucionesData.tipoOperacionCiti] ?? '';
  }

  /** Autocompleta descripción al seleccionar Clasificación habitual */
  onClasificacionHabitualChange() {
    this.resolucionesData.descripcionClasificacion =
      this.clasificacionDescMap[this.resolucionesData.clasificacionHabitual] ?? '';
  }

  /** Guarda resoluciones en localStorage */
  guardarResoluciones() {
    const key = 'prov_resoluciones_' + this.currentProveedor.numeroProveedor;
    localStorage.setItem(key, JSON.stringify(this.resolucionesData));
    alert('✅ Datos de Resoluciones guardados correctamente.');
  }

  /** Continuar desde Resoluciones → Comprobantes */
  continuarResoluciones() {
    this.guardarResoluciones();
    this.activeView = 'prov-comprobantes';
  }

  // ── Comprobantes ───────────────────────────────────────────────────────
  comprobantesData: ComprobantesData = {
    cupoCredito: 0,
    moneda: 'ARS',
    clausulaMonedaExtranjera: false,
    incluyeEnIvaCompras: true,
    tipoNumeracion: 'manual',
    letraHabitual: '',
    monedaHabitual: 'corriente',
    codigoCondicionCompra: '',
    descripcionCondicion: '',
    porcentajeBonificacion: 0,
    listaIncluyeIva: false,
    listaIncluyeImpuestosInternos: false,
    controlRemito: 'flexible',
    controlFacturaRemito: 'flexible',
    tipoComprobanteRemito: '',
    tipoComprobanteFactura: '',
    permiteSinRemito: false
  };

  private readonly condicionCompraMap: Record<string, string> = {
    'CON':      'Contado',
    'CC':       'Cuenta Corriente',
    '30D':      '30 días',
    '60D':      '60 días',
    '90D':      '90 días',
    '60_90':    '60/90 días',
    '30_60_90': '30/60/90 días'
  };

  /** Autocompleta descripción de condición de compra */
  onCondicionCompraChange() {
    this.comprobantesData.descripcionCondicion =
      this.condicionCompraMap[this.comprobantesData.codigoCondicionCompra] ?? '';
  }

  /** Guarda comprobantes en localStorage */
  guardarComprobantes() {
    const key = 'prov_comprobantes_' + this.currentProveedor.numeroProveedor;
    localStorage.setItem(key, JSON.stringify(this.comprobantesData));
    alert('✅ Datos de Comprobantes guardados correctamente.');
  }

  /** Continuar desde Comprobantes → Pagos */
  continuarComprobantes() {
    this.guardarComprobantes();
    this.activeView = 'prov-pagos';
  }

  // ── Pagos ────────────────────────────────────────────────────────────
  pagosData: PagosData = {
    codigoMedioPago: '',
    descripcionMedioPago: '',
    codigoCuentaDebitar: '',
    descripcionCuenta: '',
    emiteCheques: false,
    diasCheque: 0,
    ordenImpresionCheque: '',
    cbu1: '', cbu1Desc: '', cbu1Valid: null,
    cbu2: '', cbu2Desc: '', cbu2Valid: null,
    cbu3: '', cbu3Desc: '', cbu3Valid: null,
    habilitadoPagosMasivos: false
  };

  private readonly medioPagoMap: Record<string, string> = {
    'EFE': 'Efectivo',
    'TRF': 'Transferencia bancaria',
    'CHQ': 'Cheque propio',
    'ECH': 'Echeq (cheque electrónico)',
    'DEB': 'Débito automático',
    'TAR': 'Tarjeta de crédito/débito',
    'OTR': 'Otros'
  };

  onMedioPagoChange() {
    this.pagosData.descripcionMedioPago =
      this.medioPagoMap[this.pagosData.codigoMedioPago] ?? '';
  }

  /**
   * Valida el CBU según algoritmo BCRA:
   * Bloque 1: 7 dígitos (banco/sucursal) con dígito verificador en pos 7.
   * Bloque 2: 13 dígitos (cuenta) con dígito verificador en pos 13 (22 total).
   * Ponderadores: [3,1,7,9,3,1,7] para bloque 1 y [3,1,7,9,3,1,7,9,3,1,7,9,3] para bloque 2.
   */
  private checkCbuBlock(digits: string, pesos: number[]): boolean {
    let suma = 0;
    for (let i = 0; i < pesos.length; i++) suma += parseInt(digits[i], 10) * pesos[i];
    const dv = (10 - (suma % 10)) % 10;
    return dv === parseInt(digits[pesos.length], 10);
  }

  validarCbu(n: 1 | 2 | 3) {
    const raw = (n === 1 ? this.pagosData.cbu1 : n === 2 ? this.pagosData.cbu2 : this.pagosData.cbu3)
                  .replace(/\D/g, '');
    if (!raw || raw.length === 0) {
      if (n === 1) this.pagosData.cbu1Valid = null;
      else if (n === 2) this.pagosData.cbu2Valid = null;
      else this.pagosData.cbu3Valid = null;
      return;
    }
    const ok = raw.length === 22
      && this.checkCbuBlock(raw.substring(0, 8),  [3,1,7,9,3,1,7])
      && this.checkCbuBlock(raw.substring(8),      [3,1,7,9,3,1,7,9,3,1,7,9,3]);
    if (n === 1) { this.pagosData.cbu1 = raw; this.pagosData.cbu1Valid = ok; }
    else if (n === 2) { this.pagosData.cbu2 = raw; this.pagosData.cbu2Valid = ok; }
    else { this.pagosData.cbu3 = raw; this.pagosData.cbu3Valid = ok; }
  }

  guardarPagos() {
    const key = 'prov_pagos_' + this.currentProveedor.numeroProveedor;
    localStorage.setItem(key, JSON.stringify(this.pagosData));
    alert('✅ Datos de Pagos guardados correctamente.');
  }

  continuarPagos() {
    this.guardarPagos();
    this.activeView = 'prov-articulos';
  }

  // ── Artículos / Conceptos ─────────────────────────────────────────────────────
  articulosTab: 'articulos' | 'conceptos' = 'articulos';
  artFiltroVisible = false;
  artModalVisible  = false;
  artCodigoError   = false;

  artFiltro = { codDesde: '', codHasta: '', keyword: '', unidad: '' };
  artSort   = { col: 'codigo', asc: true };

  /** Catálogo de unidades de medida */
  readonly unidadesMedida = [
    { codigo: 'UN',  descripcion: 'Unidades',      sinonimo: 'u.'   },
    { codigo: 'KG',  descripcion: 'Kilogramos',     sinonimo: 'kg.'  },
    { codigo: 'GR',  descripcion: 'Gramos',         sinonimo: 'g.'   },
    { codigo: 'MT',  descripcion: 'Metros',         sinonimo: 'm.'   },
    { codigo: 'CM',  descripcion: 'Centímetros',    sinonimo: 'cm.'  },
    { codigo: 'MM',  descripcion: 'Milímetros',     sinonimo: 'mm.'  },
    { codigo: 'MT2', descripcion: 'Metros cuadrados', sinonimo: 'm²' },
    { codigo: 'MT3', descripcion: 'Metros cúbicos',   sinonimo: 'm³' },
    { codigo: 'LT',  descripcion: 'Litros',         sinonimo: 'lt.'  },
    { codigo: 'HS',  descripcion: 'Horas',          sinonimo: 'hs.'  },
    { codigo: 'JG',  descripcion: 'Juego',          sinonimo: 'jgo.' },
    { codigo: 'CJ',  descripcion: 'Caja',           sinonimo: 'cj.'  },
  ];

  /** Artículos del proveedor */
  articulosData: { codigo: string; descripcion: string; sinonimo: string;
                   codUnidad: string; descUnidad: string; sinUnidad: string }[] = [
    { codigo: 'P-001', descripcion: 'Hierro Ángulo 1"', sinonimo: 'Ángulo 25mm',
      codUnidad: 'MT', descUnidad: 'Metros', sinUnidad: 'm.' },
    { codigo: 'P-002', descripcion: 'Tornillo Autoperforante 14x3/4',
      sinonimo: 'Tornillo AP 3/4',
      codUnidad: 'UN', descUnidad: 'Unidades', sinUnidad: 'u.' },
  ];

  conceptosData: typeof this.articulosData = [];

  /** Vista filtrada/ordenada */
  articulosFiltrados: typeof this.articulosData = [];

  ngOnInit_articulos() { this.aplicarFiltroArticulos(); }

  get listaActual() {
    return this.articulosTab === 'articulos' ? this.articulosData : this.conceptosData;
  }

  /** Ordena la tabla */
  sortArticulos(col: 'codigo' | 'descripcion') {
    if (this.artSort.col === col) {
      this.artSort.asc = !this.artSort.asc;
    } else {
      this.artSort.col = col;
      this.artSort.asc = true;
    }
    this.aplicarFiltroArticulos();
  }

  /** Aplica filtros y refresca articulosFiltrados */
  aplicarFiltroArticulos() {
    const kw   = this.artFiltro.keyword.toLowerCase();
    const desde = this.artFiltro.codDesde.toLowerCase();
    const hasta = this.artFiltro.codHasta.toLowerCase();
    const un   = this.artFiltro.unidad;

    let rows = this.listaActual.filter(r => {
      if (desde && r.codigo.toLowerCase() < desde) return false;
      if (hasta && r.codigo.toLowerCase() > hasta) return false;
      if (kw && !r.descripcion.toLowerCase().includes(kw)
             && !r.sinonimo.toLowerCase().includes(kw)) return false;
      if (un && r.codUnidad !== un) return false;
      return true;
    });

    const col = this.artSort.col as 'codigo' | 'descripcion';
    rows = rows.sort((a, b) =>
      this.artSort.asc
        ? a[col].localeCompare(b[col])
        : b[col].localeCompare(a[col])
    );

    this.articulosFiltrados = rows;
  }

  limpiarFiltroArticulos() {
    this.artFiltro = { codDesde: '', codHasta: '', keyword: '', unidad: '' };
    this.aplicarFiltroArticulos();
  }

  /** Nuevo artículo — formulario vacío */
  artNuevo = { codigo: '', descripcion: '', sinonimo: '',
               codUnidad: '', descUnidad: '', sinUnidad: '' };

  abrirModalArticulo() {
    this.artNuevo = { codigo: '', descripcion: '', sinonimo: '',
                      codUnidad: '', descUnidad: '', sinUnidad: '' };
    this.artCodigoError = false;
    this.artModalVisible = true;
  }

  cerrarModalArticulo() { this.artModalVisible = false; }

  /** Autocompleta descripción y sinónimo al seleccionar unidad */
  onUnidadChange() {
    const u = this.unidadesMedida.find(x => x.codigo === this.artNuevo.codUnidad);
    this.artNuevo.descUnidad = u?.descripcion ?? '';
    this.artNuevo.sinUnidad  = u?.sinonimo    ?? '';
  }

  /** Guarda el nuevo artículo con validación de código duplicado */
  guardarArticulo() {
    const cod = this.artNuevo.codigo.trim().toUpperCase();
    if (!cod || !this.artNuevo.descripcion.trim()) return;

    const lista = this.listaActual;
    if (lista.some(r => r.codigo.toUpperCase() === cod)) {
      this.artCodigoError = true;
      return;
    }

    lista.push({ ...this.artNuevo, codigo: cod });
    this.cerrarModalArticulo();
    this.aplicarFiltroArticulos();

    // Persistencia
    const key = `prov_articulos_${this.articulosTab}_${this.currentProveedor.numeroProveedor}`;
    localStorage.setItem(key, JSON.stringify(lista));
  }

  /** Elimina artículo por índice (solo si sin movimientos — verificación local) */
  eliminarArticulo(idx: number) {
    if (!confirm('¿Eliminar este artículo del proveedor?')) return;
    this.listaActual.splice(
      this.listaActual.indexOf(this.articulosFiltrados[idx]), 1
    );
    this.aplicarFiltroArticulos();
  }

  // ── Clasificación ─────────────────────────────────────────────────────────────
  clasificacionSeleccionada: ClasificacionData = { familia: '', grupo: '', individuo: '' };
  clasificacionSearchTerm = '';
  todosClasificacionChecked = false;

  clasificacionTree: ClasificacionNode[] = [
    {
      id: 'mercado', label: 'Mercado', familia: 'Mercado', expanded: true,
      children: [
        {
          id: 'locales', label: 'Locales', familia: 'Mercado', grupo: 'Locales', expanded: true,
          children: [
            { id: 'minorista', label: 'Minorista', familia: 'Mercado', grupo: 'Locales', individuo: 'Minorista' },
            { id: 'mayorista', label: 'Mayorista', familia: 'Mercado', grupo: 'Locales', individuo: 'Mayorista' }
          ]
        },
        {
          id: 'exterior', label: 'Exterior', familia: 'Mercado', grupo: 'Exterior', expanded: true,
          children: [
            { id: 'mercosur', label: 'Mercosur', familia: 'Mercado', grupo: 'Exterior', individuo: 'Mercosur' },
            { id: 'resto', label: 'Resto del Mundo', familia: 'Mercado', grupo: 'Exterior', individuo: 'Resto del Mundo' }
          ]
        }
      ]
    },
    {
      id: 'rubro', label: 'Rubro', familia: 'Rubro', expanded: true,
      children: [
        {
          id: 'materia-prima', label: 'Materia Prima', familia: 'Rubro', grupo: 'Materia Prima', expanded: true,
          children: [
            { id: 'metales', label: 'Metales', familia: 'Rubro', grupo: 'Materia Prima', individuo: 'Metales' },
            { id: 'plasticos', label: 'Plásticos', familia: 'Rubro', grupo: 'Materia Prima', individuo: 'Plásticos' }
          ]
        },
        {
          id: 'servicios', label: 'Servicios', familia: 'Rubro', grupo: 'Servicios', expanded: true,
          children: [
            { id: 'logistica', label: 'Logística', familia: 'Rubro', grupo: 'Servicios', individuo: 'Logística' },
            { id: 'consultoria', label: 'Consultoría', familia: 'Rubro', grupo: 'Servicios', individuo: 'Consultoría' }
          ]
        }
      ]
    }
  ];

  toggleClasifExpand(node: ClasificacionNode) {
    node.expanded = !node.expanded;
  }

  expandAllClasificacion(nodes: ClasificacionNode[] = this.clasificacionTree, expand = true) {
    for (const n of nodes) {
      n.expanded = expand;
      if (n.children) this.expandAllClasificacion(n.children, expand);
    }
  }

  collapseAllClasificacion() {
    this.expandAllClasificacion(this.clasificacionTree, false);
  }

  onClasificacionSearch() {
    const term = this.clasificacionSearchTerm.toLowerCase().trim();
    if (!term) {
      this.clearClasificacionSearch(this.clasificacionTree);
      return;
    }
    this.filterClasificacionNode(this.clasificacionTree, term);
  }

  private clearClasificacionSearch(nodes: ClasificacionNode[]) {
    for (const n of nodes) {
      n.hidden = false;
      n.match = false;
      if (n.children) this.clearClasificacionSearch(n.children);
    }
  }

  private filterClasificacionNode(nodes: ClasificacionNode[], term: string): boolean {
    let anyVisible = false;
    for (const n of nodes) {
      const isMatch = n.label.toLowerCase().includes(term);
      n.match = isMatch;
      let childrenVisible = false;
      if (n.children) {
        childrenVisible = this.filterClasificacionNode(n.children, term);
      }
      n.hidden = !(isMatch || childrenVisible);
      if (!n.hidden) anyVisible = true;
      if (isMatch && n.children) {
        this.expandAllClasificacion([n], true);
      } else if (childrenVisible) {
        n.expanded = true;
      }
    }
    return anyVisible;
  }

  selectClasificacion(node: ClasificacionNode) {
    this.clasificacionSeleccionada = {
      familia: node.familia ?? '',
      grupo: node.grupo ?? '',
      individuo: node.individuo ?? ''
    };
  }

  toggleClasifNode(node: ClasificacionNode, event: any) {
    const checked = event.target.checked;
    this.cascadeCheck(node, checked);
    this.bubbleUpCheck(this.clasificacionTree);
    this.checkTodosState();
  }

  private cascadeCheck(node: ClasificacionNode, checked: boolean) {
    node.checked = checked;
    node.indeterminate = false;
    if (node.children) {
      for (const child of node.children) {
        this.cascadeCheck(child, checked);
      }
    }
  }

  private bubbleUpCheck(nodes: ClasificacionNode[]): { c: number, i: number, t: number } {
    let checkedCount = 0;
    let indetCount = 0;
    let total = nodes.length;

    for (const n of nodes) {
      if (n.children && n.children.length > 0) {
        const stats = this.bubbleUpCheck(n.children);
        if (stats.c === stats.t && stats.t > 0) {
          n.checked = true;
          n.indeterminate = false;
        } else if (stats.c > 0 || stats.i > 0) {
          n.checked = false;
          n.indeterminate = true;
        } else {
          n.checked = false;
          n.indeterminate = false;
        }
      }
      if (n.checked) checkedCount++;
      if (n.indeterminate) indetCount++;
    }
    return { c: checkedCount, i: indetCount, t: total };
  }

  toggleTodosClasificacion(event: any) {
    const checked = event.target.checked;
    this.todosClasificacionChecked = checked;
    for (const root of this.clasificacionTree) {
      this.cascadeCheck(root, checked);
    }
  }

  private checkTodosState() {
    let allChecked = true;
    let noneChecked = true;
    for (const root of this.clasificacionTree) {
      if (!root.checked) allChecked = false;
      if (root.checked || root.indeterminate) noneChecked = false;
    }
    if (allChecked) {
      this.todosClasificacionChecked = true;
      // You might need an indeterminate state for 'Todos' as well if you want.
    } else {
      this.todosClasificacionChecked = false;
    }
  }

  continuarClasificacion() {
    // Guarda el estado de la clasificacion en el LocalStorage si quieres
    const key = 'prov_clasificacion_' + this.currentProveedor.numeroProveedor;
    localStorage.setItem(key, JSON.stringify({
      seleccionada: this.clasificacionSeleccionada,
      tree: this.clasificacionTree
    }));
    alert('✅ Datos de Clasificación guardados correctamente.');
  }

  menuItems: MenuItem[] = [
    {
      id: 'archivos',
      label: 'Archivos',
      expanded: true,
      children: [
        { 
          id: 'actualizaciones', 
          label: 'Actualizaciones', 
          expanded: true,
          children: [
            { 
              id: 'proveedores', 
              label: 'Proveedores',
              expanded: true,
              children: [
                { id: 'prov-principal',    label: 'Principal' },
                { id: 'prov-impuestos',    label: 'Impuestos' },
                { id: 'prov-resoluciones', label: 'Resoluciones' },
                { id: 'prov-comprobantes', label: 'Comprobantes' },
                { id: 'prov-pagos',        label: 'Pagos' },
                { id: 'prov-articulos',    label: 'Artículos/Conceptos' },
                { id: 'prov-clasificacion',label: 'Clasificación' }
              ]
            },
            { id: 'clasificador-proveedores', label: 'Clasificador de Proveedores', children: [] },
            { id: 'rubros-comerciales', label: 'Rubros comerciales' },
            { id: 'compradores', label: 'Compradores' },
            { id: 'sectores', label: 'Sectores' },
            { id: 'conceptos-compra', label: 'Conceptos de compra' },
            { id: 'precios-compra', label: 'Precios de Compra', children: [] },
            { id: 'condiciones-compra', label: 'Condiciones de compra' },
            { id: 'solicitudes-compra-act', label: 'Solicitudes de Compra', children: [] },
            { id: 'retenciones', label: 'Retenciones' },
            { id: 'textos-comprobantes', label: 'Textos para comprobantes' },
            { id: 'motivos', label: 'Motivos' },
            { id: 'tipos-gasto', label: 'Tipos de gasto' }
          ] 
        },
        { id: 'altas-consultas', label: 'Altas y Consultas', children: [] },
        { 
          id: 'parametrizacion-contable', 
          label: 'Parametrización contable', 
          expanded: true,
          children: [
            { id: 'prov-contable', label: 'Proveedores' },
            { id: 'act-global-prov', label: 'Actualización global de proveedores' },
            { id: 'conceptos', label: 'Conceptos' },
            { id: 'act-global-conceptos', label: 'Actualización global de conceptos' },
            { id: 'tipos-gastos-cont', label: 'Tipos de gastos' },
            { id: 'tipos-comprobantes-cont', label: 'Tipos de comprobantes' },
            { id: 'modelos-asientos', label: 'Modelos de asientos' },
            { id: 'parametros-contables-fin', label: 'Parámetros contables' }
          ]
        },
        { 
          id: 'carga-inicial', 
          label: 'Carga Inicial', 
          expanded: true,
          children: [
            { id: 'agrupaciones-prov', label: 'Agrupaciones de Proveedores' },
            { id: 'tipos-comprobante-carga', label: 'Tipos de Comprobante' },
            { id: 'talonarios-carga', label: 'Talonarios' },
            { id: 'items-autorizacion', label: 'Ítems de autorización para orden de compra' },
            { 
              id: 'perfiles', 
              label: 'Perfiles', 
              expanded: true,
              children: [
                { id: 'perf-solicitud', label: 'de Solicitud de Compra' },
                { id: 'perf-orden', label: 'de Orden de Compra' },
                { id: 'perf-factura', label: 'de Factura de Compra' },
                { id: 'perf-aut-orden', label: 'de Autorización de Orden de Compra' },
                { id: 'perf-aut-comprob', label: 'de Autorización de comprobantes de compras' },
                { id: 'perf-adm-ai', label: 'Perfiles para el administrador de comprobantes por AI' }
              ]
            },
            {
              id: 'formularios',
              label: 'Formularios',
              expanded: true,
              children: [
                { id: 'form-canc-doc', label: 'Cancelación de Documentos' },
                { id: 'form-canc-fc', label: 'Cancelación de Factura de Crédito' }
              ]
            },
            { id: 'param-compras-leaf', label: 'Parámetros de Compras' }
          ]
        }
      ]
    },
    { id: 'solicitudes-compra', label: 'Solicitudes de compra', children: [] },
    { id: 'ordenes-compra', label: 'Ordenes de compra', children: [] },
    { id: 'comprobantes', label: 'Comprobantes', children: [] },
    { id: 'cuentas-corrientes', label: 'Cuentas Corrientes', children: [] },
    { id: 'procesos-periodicos', label: 'Procesos Periódicos', children: [] },
    { id: 'consultas', label: 'Consultas', children: [] },
    { id: 'informes', label: 'Informes', children: [] },
    { id: 'analisis-multidimensional', label: 'Análisis Multidimensional', children: [] }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ParametrosComprasService,
    private proveedoresService: ProveedoresService
  ) {
    this.formData = this.service.getParametros();
  }

  ngOnInit() {}

  // ── Acciones subrama Principal ─────────────────────────────────────

  /** Carga un proveedor nuevo con número autonumérico */
  nuevoProveedor() {
    this.currentProveedor = this.proveedoresService.createEmpty();
  }

  /** Guarda el proveedor en la base de datos (Aceptar) */
  guardarProveedor() {
    if (!this.currentProveedor) return;
    this.proveedoresService.save(this.currentProveedor);
    alert('✅ Proveedor ' + this.currentProveedor.numeroProveedor + ' guardado correctamente.');
  }

  /** Avanza al siguiente paso / subrama sin cerrar (Continuar) */
  continuarProveedor() {
    if (!this.currentProveedor) return;
    this.proveedoresService.save(this.currentProveedor);
    // Navega automáticamente a la siguiente subrama: Impuestos
    this.activeView = 'prov-impuestos';
  }

  /** Cancela y limpia el formulario (mantiene el número pero borra los datos) */
  cancelarProveedor() {
    this.proveedorLoaded = false;
    this.currentProveedor = this.proveedoresService.createEmpty();
    this.proveedorLoaded = true;
  }

  toggleExpand(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  guardar() {
    this.service.saveParametros(this.formData);
    alert('✅ Parámetros de Compras guardados correctamente.');
    this.closeModal();
  }

  selectItem(item: MenuItem) {
    if (item.children && item.children.length > 0) {
      this.toggleExpand(item);
      if (item.id === 'proveedores' || item.id === 'actualizaciones') {
          return;
      }
    }
    // Al entrar a prov-principal: asegurar proveedor cargado ANTES de cambiar la vista
    if (item.id === 'prov-principal') {
      if (!this.proveedorLoaded) {
        try {
          this.currentProveedor = this.proveedoresService.createEmpty();
          this.proveedorLoaded = true;
          console.log('✅ Proveedor inicializado:', this.currentProveedor.numeroProveedor);
        } catch (e) {
          console.error('❌ Error al crear proveedor:', e);
          // Fallback: crear objeto manual sin incrementar contador
          this.currentProveedor = {
            numeroProveedor: '00001',
            domicilio: '', localidad: '', codigoPostal: '',
            codigoProvincia: '01', descripcionProvincia: 'Buenos Aires',
            telefono1: '', telefono2: '', movil: '',
            correoElectronico: '', paginaWeb: '',
            nombre: '', domicilioComercial: '',
            codigoRubro: '', descripcionRubro: '', actividad: '',
            fechaAlta: new Date().toLocaleDateString('es-AR'),
            fechaInhabilitacion: ''
          };
          this.proveedorLoaded = true;
        }
      }
    }
    this.activeView = item.id;
    console.log('Selected view:', item.id, '| loaded:', this.proveedorLoaded);
  }
}
