import { Injectable } from '@angular/core';

export interface ParametrosContabilidadData {
  // Principal - Cuentas Contables
  asignacionCuentasAlta: string;
  codigoJerarquiaPrincipal: string;
  descripcionJerarquia: string;

  // Principal - Asientos
  controlaDiasHabiles: boolean;
  utilizaAsientosResumen: boolean;
  editaApropiacionesRegistrados: boolean;
  visualizaAuxiliaresDetalle: boolean;

  // Principal - Cierre y apertura
  generaAsientoPasajeResultados: boolean;
  controlaResumenCierre: boolean;

  // Principal - Reportes
  leyendaImpresion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosContabilidadService {
  private key = 'parametros_contabilidad_data';

  private defaultData: ParametrosContabilidadData = {
    asignacionCuentasAlta: 'jerarquia_principal',
    codigoJerarquiaPrincipal: 'PLANCTAS',
    descripcionJerarquia: 'PLAN DE CUENTAS',
    
    controlaDiasHabiles: false,
    utilizaAsientosResumen: false,
    editaApropiacionesRegistrados: false,
    visualizaAuxiliaresDetalle: true,
    
    generaAsientoPasajeResultados: false,
    controlaResumenCierre: true,
    
    leyendaImpresion: 'Copia fiel del original'
  };

  getParametros(): ParametrosContabilidadData {
    const data = localStorage.getItem(this.key);
    if (data) {
      try {
        return { ...this.defaultData, ...JSON.parse(data) };
      } catch (e) {
        return { ...this.defaultData };
      }
    }
    return { ...this.defaultData };
  }

  saveParametros(data: ParametrosContabilidadData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
