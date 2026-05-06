import { Injectable } from '@angular/core';

export interface ParametrosTesoreriaData {
  // Principal - Comprobantes
  fechaCierreIngresoComprobantes: string;
  fechaReversiones: string;
  controlFecha: string;
  cotizacion: string;
  ingresaCodigoOperacion: boolean;
  ingresaCodigoRelacion: boolean;
  depuraAuditoriaIngresosMasivos: boolean;
  mesesConservaAuditoriaIngresosMasivos: number;

  // Principal - Cheques
  utilizaLectoraCheques: boolean;
  buscaCheques: string;
  editaNumeroInternoCheques: boolean;
  // Administración de Tarjetas - Administración de cupones
  modoEmisionCupones: string;
  estadoCuponIngresoManual: string;
  utilizaLectorTarjetas: string;
  permiteModificarCuotas: boolean;
  generaComprobantesAutomaticosCupones: boolean;
  reversionConciliacionCupones: string;
  numeracionAutomaticaConciliacion: boolean;
  proximoNumeroLiquidacion: number;
  baseCalculoRetencionIB: string;

  // Administración de Tarjetas - POS no integrado
  terminalPOS: string;
  numeracionLotePOS: string;
  numeracionCuponPOS: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrosTesoreriaService {
  private key = 'parametros_tesoreria_data';

  private defaultData: ParametrosTesoreriaData = {
    // Comprobantes
    fechaCierreIngresoComprobantes: '',
    fechaReversiones: 'misma_fecha',
    controlFecha: 'confirma_futura',
    cotizacion: 'actualiza_actual',
    ingresaCodigoOperacion: false,
    ingresaCodigoRelacion: false,
    depuraAuditoriaIngresosMasivos: false,
    mesesConservaAuditoriaIngresosMasivos: 0,

    // Cheques
    utilizaLectoraCheques: false,
    buscaCheques: 'por_numero_interno',
    editaNumeroInternoCheques: false,

    // Tarjetas - Cupones
    modoEmisionCupones: 'manual',
    estadoCuponIngresoManual: 'cartera',
    utilizaLectorTarjetas: 'no_utiliza',
    permiteModificarCuotas: true,
    generaComprobantesAutomaticosCupones: false,
    reversionConciliacionCupones: 'elimina_datos',
    numeracionAutomaticaConciliacion: true,
    proximoNumeroLiquidacion: 1,
    baseCalculoRetencionIB: 'neto_estimado',

    // Tarjetas - POS
    terminalPOS: 'edita',
    numeracionLotePOS: 'edita',
    numeracionCuponPOS: 'edita'
  };

  getParametros(): ParametrosTesoreriaData {
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

  saveParametros(data: ParametrosTesoreriaData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}

