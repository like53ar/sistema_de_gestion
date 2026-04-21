import { Injectable } from '@angular/core';

export interface ParametrosTesoreriaData {
  configuracionGeneral: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosTesoreriaService {
  private key = 'parametros_tesoreria_data';

  getParametros(): ParametrosTesoreriaData {
    const data = localStorage.getItem(this.key);
    if (data) {
      return JSON.parse(data);
    }
    return {
      configuracionGeneral: ''
    };
  }

  saveParametros(data: ParametrosTesoreriaData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
