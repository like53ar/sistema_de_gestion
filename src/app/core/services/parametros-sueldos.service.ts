import { Injectable } from '@angular/core';

export interface ParametrosSueldosData {
  configGeneral: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosSueldosService {
  private key = 'parametros_sueldos_data';

  getParametros(): ParametrosSueldosData {
    const data = localStorage.getItem(this.key);
    if (data) {
      return JSON.parse(data);
    }
    return {
      configGeneral: ''
    };
  }

  saveParametros(data: ParametrosSueldosData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
