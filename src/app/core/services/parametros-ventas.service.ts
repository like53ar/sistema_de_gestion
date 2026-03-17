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
    leyendaMonedaExtranjera: ''
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
