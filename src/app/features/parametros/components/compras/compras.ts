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
                { id: 'prov-principal', label: 'Principal' },
                { id: 'prov-impuestos', label: 'Impuestos' },
                { id: 'prov-resoluciones', label: 'Resoluciones' },
                { id: 'prov-comprobantes', label: 'Comprobantes' },
                { id: 'prov-pagos', label: 'Pagos' },
                { id: 'prov-articulos', label: 'Artículos/Conceptos' },
                { id: 'prov-contactos', label: 'Contactos' },
                { id: 'prov-clasificacion', label: 'Clasificación' },
                { id: 'prov-sucursales', label: 'Sucursales' },
                { id: 'prov-observaciones', label: 'Observaciones' }
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
