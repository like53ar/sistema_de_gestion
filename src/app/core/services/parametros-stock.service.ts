import { Injectable } from '@angular/core';

export interface ParametrosStockData {
  depositoPredeterminado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosStockService {
  private key = 'parametros_stock_data';

  getParametros(): ParametrosStockData {
    const data = localStorage.getItem(this.key);
    if (data) {
      return JSON.parse(data);
    }
    return {
      depositoPredeterminado: ''
    };
  }

  saveParametros(data: ParametrosStockData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
