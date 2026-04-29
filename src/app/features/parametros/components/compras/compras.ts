import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametros-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras.html',
  styleUrl: './compras.scss'
})
export class ParametrosCompras {
  activeTab: string = 'principal';

  // Modelo de datos para la solapa Principal
  config = {
    cuit: {
      obligatorio: true,
      obtieneDatosFiscales: true,
      actualizaDatosAfip: true,
      verificaLimitadas: 'si_confirma' // Siempre y confirma el ingreso
    },
    proveedores: {
      codificacionAutomatica: true,
      proximoCodigo: 2166,
      utilizaPrefijo: 'no',
      valorPrefijo: ''
    },
    controles: {
      permiteAltaDesdeProcesos: true,
      duplicacionDoc: 'cuit_estricto'
    },
    habituales: {
      tipoDoc: '80',
      tipoDocDesc: 'C.U.I.T.',
      provincia: '01',
      provinciaDesc: 'Buenos Aires',
      tipoOperacionCiti: '0', // Operación gravada
      clasificacionComprasCiti: 'bs', // Bienes y servicios
      tipoOperacionAfip: '0',
      tipoOperacionAfipDesc: 'Operaciones gravadas',
      comprobanteAfip: '001',
      comprobanteAfipDesc: 'Facturas A'
    },
    clasificacionIva: {
        facturas: 'oculta',
        notasDebito: 'oculta',
        notasCredito: 'oculta',
        despachos: 'oculta'
    },
    resoluciones: {
        rg1361: false,
        rg3572: false
    },
    leyendas: {
        siglaIdentificacionTributaria: 'C.U.I.T.',
        siglaSubdiarioIva: 'I.V.A.',
        leyendaMonedaCorriente: 'PESOS',
        leyendaMonedaExtranjera: 'DOLARES'
    },
    agrupaciones: {
        longFamilia: 1,
        longGrupo: 2,
        longIndividuo: 3
    },
    precios: {
        depuraSolicitudes: false,
        mesesConservacion: 0
    },
    impuestos: {
      fletesIva: '1',
      fletesIvaDesc: 'IVA TASA GENERAL',
      fletesPercepcion: '40',
      fletesPercepcionDesc: 'IMP INT',
      defectoLiquidaIva: true,
      defectoLiquidaImpInternos: false,
      defectoCalculaPercepIva: true,
      defectoCalculaPercepImpInternos: false,
      leyendaRetencion1: '',
      leyendaRetencion2: '',
      leyendaRetencion3: '',
      leyendaRetencion4: ''
    },
    retenciones: {
      calculaIva: true,
      calculaGanancias: true,
      calculaOtras: false,
      calculaIibb: true,
      editaTipoRetencion: 'si',
      editaCodigos: 'si',
      editaImportes: true,
      distribuyePagoCuenta: false,
      alicuotaIvaPagoCuenta: 21.00,
      calculaOcasionales: true,
      // Datos Empresa
      empresaRazonSocial: 'SABIA S.A.',
      empresaCuit: '30-70725866-3',
      empresaIibb: '30-70725866-3',
      empresaDomicilio: '',
      empresaLocalidad: '',
      empresaFirmante: '',
      empresaCargo: ''
    }
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  tabs = [
    { id: 'principal', label: 'Principal' },
    { id: 'impuestos', label: 'Impuestos' },
    { id: 'retenciones', label: 'Retenciones' },
    { id: 'comprobantes', label: 'Comprobantes' },
    { id: 'controles', label: 'Controles' },
    { id: 'referencia', label: 'Comprobantes de Referencia' },
    { id: 'clasificacion', label: 'Clasificacion de Comprobantes' }
  ];

  selectTab(id: string) {
    this.activeTab = id;
  }

  close() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  save() {
    // Lógica de guardado futuro
    alert('✅ Cambios guardados correctamente.');
    this.close();
  }
}
