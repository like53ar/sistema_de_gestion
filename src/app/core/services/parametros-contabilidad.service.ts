import { Injectable } from '@angular/core';

export interface ParametrosContabilidadData {
  ejercicioActual: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosContabilidadService {
  private key = 'parametros_contabilidad_data';

  getParametros(): ParametrosContabilidadData {
    const data = localStorage.getItem(this.key);
    if (data) {
      return JSON.parse(data);
    }
    return {
      ejercicioActual: ''
    };
  }

  saveParametros(data: ParametrosContabilidadData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
