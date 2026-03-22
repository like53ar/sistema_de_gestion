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
    liquidaPercepcionIngresosBrutos: false
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
