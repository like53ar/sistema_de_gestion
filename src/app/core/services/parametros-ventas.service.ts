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

  // --- NUEVOS CAMPOS (TAB COMPROBANTES -> GENERAL) ---
  actualizaInfoClienteAfip: string;
  descAdicionalesCreditosDebitosPedidos: string;
  metodoIngresoDescripciones: string;
  editaObservaciones: string;
  impuestoInternoFijo: string;
  direccionEntrega: string;
  percepcionesImporteFijo: string;
  numeracionAutomaticaRemitos: boolean;
  imprimeFacturasCreditoFacturacion: boolean;
  proximoNumeroFacturaCredito: number;
  modeloReciboAnulacionFacturasCredito: string;
  trasladaVencimientoDiaHabil: boolean;
  generaDiferenciasCambio: string;
  fechaAsignarDiferenciasCambio: string;
  motivoDiferenciasCambio: string;
  descMotivoDiferenciasCambio: string;
  generaAjusteCobroFechaAlt: string;
  fechaAsignarAjusteCobroFechaAlt: string;
  motivoAjusteCobroFechaAlt: string;
  descMotivoAjusteCobroFechaAlt: string;
  rg3572: boolean;
  rg4520: boolean;
  rg5003: boolean;
  rg5614: boolean;
  rg5616: boolean;
  pagoMismaMonedaComprobante: string;
  consideraDescuentoFlete: boolean;

  // --- NUEVOS CAMPOS (TAB COMPROBANTES -> TRANSPORTE DE BIENES) ---
  generaRemitosElectronicos: boolean;
  plantaRemito: number;
  puertaRemito: number;
  editaCantidadTotalKilos: boolean;
  editaImporteTotalConImpuestos: boolean;
  importeMinimoSinImpuestos: number;
  versionRemito: string;
  cantidadTotalMinimaKilos: number;

  // --- NUEVOS CAMPOS (TAB COMPROBANTES -> INTEGRACIÓN CON SHOPPINGS) ---
  generaInformacionShoppings: string;
  rubroLocalShopping: number;
  nroContratoShopping: string;
  nroLocalShopping: string;
  ubicacionArchivoLocalShopping: string;
  ubicacionArchivoRemotoShopping: string;
  utiliza5DigitosPuntoVenta: boolean;
  puntosVentaTerminalShopping: any[];

  // --- NUEVOS CAMPOS (TAB COMPROBANTES -> SEÑAS) ---
  utilizaFacturacionSenas: boolean;
  respetaPreciosAlAplicarSena: boolean;
  codigoIvaSena: string;
  descIvaSena: string;
  codigoPercIvaSena: string;
  descPercIvaSena: string;
  codigoImpuestoInternoSena: string;
  descImpuestoInternoSena: string;
  codigoPercImpuestoInternoSena: string;
  descPercImpuestoInternoSena: string;
  codigoImpuestoInternoAdicSena: string;
  descImpuestoInternoAdicSena: string;
  codigoPercImpuestoInternoAdicSena: string;
  descPercImpuestoInternoAdicSena: string;
  codigoPercIibdSena: string;
  descPercIibdSena: string;
  codigoPercIbBsAsSena: string;
  descPercIbBsAsSena: string;
  codigoPercNoCategSena: string;
  descPercNoCategSena: string;

  // --- NUEVOS CAMPOS (TAB COMPROBANTES -> PEDIDOS) ---
  mantienePedidosFacturadosYEntregados: boolean;
  consultaAfipFacturaCredito: boolean;
  apruebaPedidos: boolean;
  apruebaCondiciones: boolean;
  apruebaPreciosPedidos: boolean;
  apruebaCantidades: boolean;
  activaCantidadesAlAprobar: boolean;
  usaPlanesEntrega: boolean;
  diasHabitualesFechaEntrega: number;
  generaPedidosAutomaticosTango: boolean;
  procesaOrdenesCanceladasTango: boolean;
  codigoMotivoPedidosTango: string;
  descMotivoPedidosTango: string;
  depurarRevisionPedidosTango: boolean;
  conservaPedidosTangoMeses: number;
  codigoTipoOperacionRG3685: string;
  descTipoOperacionRG3685: string;
  calculaPromocionesPedidos: string;
  diasVigenciaPromociones: number;
  actualizaPreciosModelos: boolean;
  actualizaPreciosNovedades: boolean;
  tipoBusquedaArticuloDefecto: string;
  campoBusquedaArticuloPredeterminado: string;
  agregarAutoSiCoincidenciaArticulo: string;
  cantCaracteresCoincidenciaArticulo: number;

  // --- NUEVOS CAMPOS (TAB COMPROBANTES -> COTIZACIONES) ---
  autorizaCotizaciones: boolean;
  aceptaCotizaciones: boolean;
  aplicaPermisosRestringirAccesoCotiz: boolean;
  mantieneCotizacionesTransformadas: boolean;
  diasVigenciaHabitualCotiz: number;
  descFechaAdicional1Cotiz: string;
  descFechaAdicional2Cotiz: string;
  cantDiasFechaAdicional1Cotiz: number;
  cantDiasFechaAdicional2Cotiz: number;
  descClasificacion1Cotiz: string;
  descClasificacion2Cotiz: string;
  imprimeCotizacionesNoAutorizadas: boolean;
  imprimeAlGenerarCotiz: boolean;
  generaPedidosAprobadosCotiz: boolean;
  generaPedidosAutoProcesosCotiz: boolean;
  diasHabitualesEntregaDesdeCotiz: number;

  // --- NUEVOS CAMPOS (TAB COMPROBANTES -> RECIBOS) ---
  editaMonedaRecibo: string;
  monedaRecibo: string;
  ordenCargaDatosRecibo: string;
  modoImputacionRecibo: string;
  modoImputacionCobranzasMasivas: string;
  modoImputacionNexoCobranzas: string;
  seleccionAutoComprobantesImporte: string;
  muestraPendientesRecibo: string;
  criterioAsignacionRecibo: string;
  incluyeNotasCreditoRecibo: boolean;
  incluyeNotasDebitoRecibo: boolean;
  asignacionIgualFechaRecibo: string;
  codigoCuentaRedondeoRecibo: string;
  descCuentaRedondeoRecibo: string;
  sugiereIngresoDocumentosRecibo: boolean;
  sugiereIngresoLeyendasRecibo: boolean;
  permiteReimprimirRecibo: boolean;
  leyenda1Recibo: string;
  leyenda2Recibo: string;
  leyenda3Recibo: string;
  leyenda4Recibo: string;
  leyenda5Recibo: string;
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
    talonariosExcluidosActualizacionPrecios: [],

    // Inicialización de campos (Tab Comprobantes -> General)
    actualizaInfoClienteAfip: '',
    descAdicionalesCreditosDebitosPedidos: '',
    metodoIngresoDescripciones: '',
    editaObservaciones: '',
    impuestoInternoFijo: '',
    direccionEntrega: '',
    percepcionesImporteFijo: '',
    numeracionAutomaticaRemitos: false,
    imprimeFacturasCreditoFacturacion: false,
    proximoNumeroFacturaCredito: 0,
    modeloReciboAnulacionFacturasCredito: '',
    trasladaVencimientoDiaHabil: false,
    generaDiferenciasCambio: '',
    fechaAsignarDiferenciasCambio: '',
    motivoDiferenciasCambio: '',
    descMotivoDiferenciasCambio: '',
    generaAjusteCobroFechaAlt: '',
    fechaAsignarAjusteCobroFechaAlt: '',
    motivoAjusteCobroFechaAlt: '',
    descMotivoAjusteCobroFechaAlt: '',
    rg3572: false,
    rg4520: false,
    rg5003: false,
    rg5614: false,
    rg5616: false,
    pagoMismaMonedaComprobante: '',
    consideraDescuentoFlete: false,

    // Inicialización de campos (Tab Comprobantes -> Transporte de bienes)
    generaRemitosElectronicos: false,
    plantaRemito: 0,
    puertaRemito: 0,
    editaCantidadTotalKilos: false,
    editaImporteTotalConImpuestos: false,
    importeMinimoSinImpuestos: 0,
    versionRemito: '',
    cantidadTotalMinimaKilos: 0,

    // Inicialización de campos (Tab Comprobantes -> Integración con shoppings)
    generaInformacionShoppings: '',
    rubroLocalShopping: 0,
    nroContratoShopping: '',
    nroLocalShopping: '',
    ubicacionArchivoLocalShopping: '',
    ubicacionArchivoRemotoShopping: '',
    utiliza5DigitosPuntoVenta: false,
    puntosVentaTerminalShopping: [],

    // Inicialización de campos (Tab Comprobantes -> Señas)
    utilizaFacturacionSenas: false,
    respetaPreciosAlAplicarSena: false,
    codigoIvaSena: '',
    descIvaSena: '',
    codigoPercIvaSena: '',
    descPercIvaSena: '',
    codigoImpuestoInternoSena: '',
    descImpuestoInternoSena: '',
    codigoPercImpuestoInternoSena: '',
    descPercImpuestoInternoSena: '',
    codigoImpuestoInternoAdicSena: '',
    descImpuestoInternoAdicSena: '',
    codigoPercImpuestoInternoAdicSena: '',
    descPercImpuestoInternoAdicSena: '',
    codigoPercIibdSena: '',
    descPercIibdSena: '',
    codigoPercIbBsAsSena: '',
    descPercIbBsAsSena: '',
    codigoPercNoCategSena: '',
    descPercNoCategSena: '',

    // Inicialización de campos (Tab Comprobantes -> Pedidos)
    mantienePedidosFacturadosYEntregados: false,
    consultaAfipFacturaCredito: false,
    apruebaPedidos: false,
    apruebaCondiciones: false,
    apruebaPreciosPedidos: false,
    apruebaCantidades: false,
    activaCantidadesAlAprobar: false,
    usaPlanesEntrega: false,
    diasHabitualesFechaEntrega: 0,
    generaPedidosAutomaticosTango: false,
    procesaOrdenesCanceladasTango: false,
    codigoMotivoPedidosTango: '',
    descMotivoPedidosTango: '',
    depurarRevisionPedidosTango: false,
    conservaPedidosTangoMeses: 0,
    codigoTipoOperacionRG3685: '',
    descTipoOperacionRG3685: '',
    calculaPromocionesPedidos: '',
    diasVigenciaPromociones: 0,
    actualizaPreciosModelos: false,
    actualizaPreciosNovedades: false,
    tipoBusquedaArticuloDefecto: '',
    campoBusquedaArticuloPredeterminado: '',
    agregarAutoSiCoincidenciaArticulo: '',
    cantCaracteresCoincidenciaArticulo: 0,

    // Inicialización de campos (Tab Comprobantes -> Cotizaciones)
    autorizaCotizaciones: false,
    aceptaCotizaciones: false,
    aplicaPermisosRestringirAccesoCotiz: false,
    mantieneCotizacionesTransformadas: false,
    diasVigenciaHabitualCotiz: 0,
    descFechaAdicional1Cotiz: '',
    descFechaAdicional2Cotiz: '',
    cantDiasFechaAdicional1Cotiz: 0,
    cantDiasFechaAdicional2Cotiz: 0,
    descClasificacion1Cotiz: '',
    descClasificacion2Cotiz: '',
    imprimeCotizacionesNoAutorizadas: false,
    imprimeAlGenerarCotiz: false,
    generaPedidosAprobadosCotiz: false,
    generaPedidosAutoProcesosCotiz: false,
    diasHabitualesEntregaDesdeCotiz: 0,

    // Inicialización de campos (Tab Comprobantes -> Recibos)
    editaMonedaRecibo: 'Edita',
    monedaRecibo: '',
    ordenCargaDatosRecibo: '',
    modoImputacionRecibo: 'Manual',
    modoImputacionCobranzasMasivas: 'A cuenta',
    modoImputacionNexoCobranzas: 'A cuenta',
    seleccionAutoComprobantesImporte: '',
    muestraPendientesRecibo: '',
    criterioAsignacionRecibo: '',
    incluyeNotasCreditoRecibo: false,
    incluyeNotasDebitoRecibo: false,
    asignacionIgualFechaRecibo: '',
    codigoCuentaRedondeoRecibo: '',
    descCuentaRedondeoRecibo: '',
    sugiereIngresoDocumentosRecibo: true,
    sugiereIngresoLeyendasRecibo: true,
    permiteReimprimirRecibo: true,
    leyenda1Recibo: 'Leyenda 1',
    leyenda2Recibo: 'Leyenda 2',
    leyenda3Recibo: 'Leyenda 3',
    leyenda4Recibo: 'Leyenda 4',
    leyenda5Recibo: 'Leyenda 5'
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
