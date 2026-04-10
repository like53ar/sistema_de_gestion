import { Injectable } from '@angular/core';

export interface ParametrosVentasData {
  // Empresa
  razonSocial: string;
  nroIdentificacionTributaria: string;
  inicioActividades: string;
  nroIngresosBrutos: string;
  
  // Domicilio
  calle: string;
  numero: string;
  piso: string;
  departamento: string;
  sector: string;
  torre: string;
  manzana: string;
  localidad: string;
  codigoPostal: string;
  codigoProvincia: string;

  // Siglas y Leyendas
  siglaIdentificacionTributaria: string;
  siglaSubdiarioIva: string;
  leyendaMonedaCorriente: string;
  leyendaMonedaExtranjera: string;

  // Impuestos - Fletes e Intereses
  codigoIva: string;
  descCodigoIva: string;
  codigoPercepcionIva: string;
  descCodigoPercepcionIva: string;
  baseCalculoIvaIntereses: string;
  baseCalculoIvaFlete: string;
  calcularInteresesSegunIvaArticulos: boolean;

  // IVA Simple - Fletes e Intereses
  codigoClasificacionFletes: string;
  descCodigoClasificacionFletes: string;
  codigoActividadEconomicaFletes: string;
  descCodigoActividadEconomicaFletes: string;
  codigoClasificacionIntereses: string;
  descCodigoClasificacionIntereses: string;
  codigoActividadEconomicaIntereses: string;
  descCodigoActividadEconomicaIntereses: string;

  // Valores por defecto
  codigoCategoriaIva: string;
  descCodigoCategoriaIva: string;
  calculaPercepcionIva: boolean;
  liquidaImpuestosInternos: boolean;
  discriminaImpuestosInternos: boolean;
  calculaPercepcionImpuestosInternos: boolean;
  liquidaIvaLiberado: boolean;
  liquidaPercepcionIngresosBrutos: boolean;

  // --- NUEVOS CAMPOS (TAB CLIENTES) ---
  ingresoObligatorioCuit: boolean;
  
  // Clientes habituales
  permiteAltaClientesDesdeProcesos: boolean;
  codificacionAutomaticaClientes: boolean;
  proximoCodigoCliente: string;
  utilizaPrefijoCodificacion: string;
  valorPrefijo: string;
  duplicacionTipoNroDocumento: string;
  asignacionNumeroPagoElectronico: string;

  // Clientes habituales / ocasionales
  codigoTipoDocumento: string;
  descTipoDocumento: string;
  actualizaInformacionAfip: string;
  codigoProvinciaHabitual: string;
  descProvinciaHabitual: string;
  codigoCondicionVentaHabitual: string;
  descCondicionVentaHabitual: string;
  codigoZonaHabitual: string;
  descZonaHabitual: string;

  // Solo clientes ocasionales
  codigoTipoOperacion: string;
  descTipoOperacion: string;

  // Control de clientes inhabilitados
  controlFacturasCreditosDebitos: string;
  controlPedidos: string;
  controlRemitos: string;
  controlCotizaciones: string;

  // Clientes potenciales
  codificacionAutomaticaClientesPotenciales: boolean;
  proximoCodigoClientePotencial: string;
  clasificaClientesPotencialesAltas: boolean;
  fechaConversionClienteHabitual: string;

  // Longitud de agrupaciones
  longitudFamilia: number;
  longitudGrupo: number;
  longitudIndividuo: number;

  // --- NUEVOS CAMPOS (TAB ARTÍCULOS) ---
  // Stock
  descargaStockAlFacturar: boolean;
  ingresaArticulosEscalaMatriz: boolean;
  muestraTodasCombinacionesMatriz: boolean;
  
  // Partidas
  descargaPartidasNegativo: boolean;
  permiteAltaPartidasFactura: boolean;
  permiteAltaPartidasNotaCredito: boolean;

  // Consulta de saldos
  muestraPrecioArticulo: boolean;
  muestraUnicamenteSaldoDeposito: boolean;

  // Etiquetas
  codigoModeloImpresionEtiquetas: string;
  descModeloImpresionEtiquetas: string;
  codigoListaPreciosEtiquetas: string;
  descListaPreciosEtiquetas: string;
  imprimeEtiquetasEmisionRemitos: string;

  // Tango Tiendas
  valorHabitualPublicacionTangoTiendas: string;

  // Precios
  guardarHistorialPrecios: boolean;
  depurarHistorialPrecios: boolean;
  mesesConservarPreciosHistoricos: number;

  // Talonarios a excluir
  talonariosExcluidosActualizacionPrecios: any[]; 
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosVentasService {
  private data: ParametrosVentasData = {
    razonSocial: '',
    nroIdentificacionTributaria: '',
    inicioActividades: '',
    nroIngresosBrutos: '',
    
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    sector: '',
    torre: '',
    manzana: '',
    localidad: '',
    codigoPostal: '',
    codigoProvincia: '',

    siglaIdentificacionTributaria: '',
    siglaSubdiarioIva: '',
    leyendaMonedaCorriente: '',
    leyendaMonedaExtranjera: '',

    codigoIva: '',
    descCodigoIva: '',
    codigoPercepcionIva: '',
    descCodigoPercepcionIva: '',
    baseCalculoIvaIntereses: '',
    baseCalculoIvaFlete: '',
    calcularInteresesSegunIvaArticulos: false,

    codigoClasificacionFletes: '',
    descCodigoClasificacionFletes: '',
    codigoActividadEconomicaFletes: '',
    descCodigoActividadEconomicaFletes: '',
    codigoClasificacionIntereses: '',
    descCodigoClasificacionIntereses: '',
    codigoActividadEconomicaIntereses: '',
    descCodigoActividadEconomicaIntereses: '',

    codigoCategoriaIva: '',
    descCodigoCategoriaIva: '',
    calculaPercepcionIva: false,
    liquidaImpuestosInternos: false,
    discriminaImpuestosInternos: false,
    calculaPercepcionImpuestosInternos: false,
    liquidaIvaLiberado: false,
    liquidaPercepcionIngresosBrutos: false,

    // Inicialización de nuevos campos (Vacíos por ahora)
    ingresoObligatorioCuit: false,
    permiteAltaClientesDesdeProcesos: false,
    codificacionAutomaticaClientes: false,
    proximoCodigoCliente: '',
    utilizaPrefijoCodificacion: '',
    valorPrefijo: '',
    duplicacionTipoNroDocumento: '',
    asignacionNumeroPagoElectronico: '',
    codigoTipoDocumento: '',
    descTipoDocumento: '',
    actualizaInformacionAfip: '',
    codigoProvinciaHabitual: '',
    descProvinciaHabitual: '',
    codigoCondicionVentaHabitual: '',
    descCondicionVentaHabitual: '',
    codigoZonaHabitual: '',
    descZonaHabitual: '',
    codigoTipoOperacion: '',
    descTipoOperacion: '',
    controlFacturasCreditosDebitos: '',
    controlPedidos: '',
    controlRemitos: '',
    controlCotizaciones: '',
    codificacionAutomaticaClientesPotenciales: false,
    proximoCodigoClientePotencial: '',
    clasificaClientesPotencialesAltas: false,
    fechaConversionClienteHabitual: '',
    longitudFamilia: 0,
    longitudGrupo: 0,
    longitudIndividuo: 6,

    // Inicialización de campos (Tab Artículos)
    descargaStockAlFacturar: false,
    ingresaArticulosEscalaMatriz: false,
    muestraTodasCombinacionesMatriz: false,
    descargaPartidasNegativo: false,
    permiteAltaPartidasFactura: false,
    permiteAltaPartidasNotaCredito: false,
    muestraPrecioArticulo: false,
    muestraUnicamenteSaldoDeposito: false,
    codigoModeloImpresionEtiquetas: '',
    descModeloImpresionEtiquetas: '',
    codigoListaPreciosEtiquetas: '',
    descListaPreciosEtiquetas: '',
    imprimeEtiquetasEmisionRemitos: '',
    valorHabitualPublicacionTangoTiendas: '',
    guardarHistorialPrecios: false,
    depurarHistorialPrecios: false,
    mesesConservarPreciosHistoricos: 0,
    talonariosExcluidosActualizacionPrecios: []
  };

  constructor() { }

  getParametros(): ParametrosVentasData {
    return { ...this.data };
  }

  saveParametros(newData: ParametrosVentasData): void {
    this.data = { ...newData };
    console.log('Parámetros de Ventas Guardados:', this.data);
  }
}
