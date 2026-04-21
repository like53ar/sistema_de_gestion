import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParametrosComprasService, ParametrosComprasData } from '../../../../core/services/parametros-compras.service';
interface MenuItem {
  id: string;
  label: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-parametros-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras.html',
  styleUrl: './compras.scss'
})
export class ParametrosCompras implements OnInit {
  formData: ParametrosComprasData;
  activeView: string = 'dashboard';

  menuItems: MenuItem[] = [
    {
      id: 'archivos',
      label: 'Archivos',
      expanded: true,
      children: [
        { 
          id: 'actualizaciones', 
          label: 'Actualizaciones', 
          expanded: true,
          children: [
            { id: 'proveedores', label: 'Proveedores' },
            { id: 'clasificador-proveedores', label: 'Clasificador de Proveedores', children: [] },
            { id: 'rubros-comerciales', label: 'Rubros comerciales' },
            { id: 'compradores', label: 'Compradores' },
            { id: 'sectores', label: 'Sectores' },
            { id: 'conceptos-compra', label: 'Conceptos de compra' },
            { id: 'precios-compra', label: 'Precios de Compra', children: [] },
            { id: 'condiciones-compra', label: 'Condiciones de compra' },
            { id: 'solicitudes-compra-act', label: 'Solicitudes de Compra', children: [] },
            { id: 'retenciones', label: 'Retenciones' },
            { id: 'textos-comprobantes', label: 'Textos para comprobantes' },
            { id: 'motivos', label: 'Motivos' },
            { id: 'tipos-gasto', label: 'Tipos de gasto' }
          ] 
        },
        { id: 'altas-consultas', label: 'Altas y Consultas', children: [] },
        { 
          id: 'parametrizacion-contable', 
          label: 'Parametrización contable', 
          expanded: true,
          children: [
            { id: 'prov-contable', label: 'Proveedores' },
            { id: 'act-global-prov', label: 'Actualización global de proveedores' },
            { id: 'conceptos', label: 'Conceptos' },
            { id: 'act-global-conceptos', label: 'Actualización global de conceptos' },
            { id: 'tipos-gastos-cont', label: 'Tipos de gastos' },
            { id: 'tipos-comprobantes-cont', label: 'Tipos de comprobantes' },
            { id: 'modelos-asientos', label: 'Modelos de asientos' },
            { id: 'parametros-contables-fin', label: 'Parámetros contables' }
          ]
        },
        { 
          id: 'carga-inicial', 
          label: 'Carga Inicial', 
          expanded: true,
          children: [
            { id: 'agrupaciones-prov', label: 'Agrupaciones de Proveedores' },
            { id: 'tipos-comprobante-carga', label: 'Tipos de Comprobante' },
            { id: 'talonarios-carga', label: 'Talonarios' },
            { id: 'items-autorizacion', label: 'Ítems de autorización para orden de compra' },
            { 
              id: 'perfiles', 
              label: 'Perfiles', 
              expanded: true,
              children: [
                { id: 'perf-solicitud', label: 'de Solicitud de Compra' },
                { id: 'perf-orden', label: 'de Orden de Compra' },
                { id: 'perf-factura', label: 'de Factura de Compra' },
                { id: 'perf-aut-orden', label: 'de Autorización de Orden de Compra' },
                { id: 'perf-aut-comprob', label: 'de Autorización de comprobantes de compras' },
                { id: 'perf-adm-ai', label: 'Perfiles para el administrador de comprobantes por AI' }
              ]
            },
            {
              id: 'formularios',
              label: 'Formularios',
              expanded: true,
              children: [
                { id: 'form-canc-doc', label: 'Cancelación de Documentos' },
                { id: 'form-canc-fc', label: 'Cancelación de Factura de Crédito' }
              ]
            },
            { id: 'param-compras-leaf', label: 'Parámetros de Compras' }
          ]
        }
      ]
    },
    { id: 'solicitudes-compra', label: 'Solicitudes de compra', children: [] },
    { id: 'ordenes-compra', label: 'Ordenes de compra', children: [] },
    { id: 'comprobantes', label: 'Comprobantes', children: [] },
    { id: 'cuentas-corrientes', label: 'Cuentas Corrientes', children: [] },
    { id: 'procesos-periodicos', label: 'Procesos Periódicos', children: [] },
    { id: 'consultas', label: 'Consultas', children: [] },
    { id: 'informes', label: 'Informes', children: [] },
    { id: 'analisis-multidimensional', label: 'Análisis Multidimensional', children: [] }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ParametrosComprasService
  ) {
    this.formData = this.service.getParametros();
  }

  ngOnInit() {}

  toggleExpand(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  guardar() {
    this.service.saveParametros(this.formData);
    alert('✅ Parámetros de Compras guardados correctamente.');
    this.closeModal();
  }

  selectItem(item: MenuItem) {
    if (item.children && item.children.length > 0) {
      this.toggleExpand(item);
    } else {
      this.activeView = item.id;
      console.log('Selected view:', item.id);
    }
  }
}
