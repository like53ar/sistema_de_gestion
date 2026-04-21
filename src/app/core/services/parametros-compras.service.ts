import { Injectable } from '@angular/core';

export interface ParametrosComprasData {
  razonSocial: string;
  cuit: string;
  inicioActividades: string;
  ingresosBrutos: string;
  calle: string;
  numero: string;
  localidad: string;
  codigoPostal: string;
  provincia: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosComprasService {
  private key = 'parametros_compras_data';

  getParametros(): ParametrosComprasData {
    const data = localStorage.getItem(this.key);
    if (data) {
      return JSON.parse(data);
    }
    return {
      razonSocial: 'SABIA S.A.',
      cuit: '30-12345678-9',
      inicioActividades: '2020-01-01',
      ingresosBrutos: '30-12345678-9',
      calle: 'Av. Corrientes',
      numero: '1234',
      localidad: 'CABA',
      codigoPostal: '1000',
      provincia: '0'
    };
  }

  saveParametros(data: ParametrosComprasData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
