import { Injectable } from '@angular/core';

export interface ProveedorData {
  // Identificación
  numeroProveedor: string;  // XXXXX formato 00001-99999

  // Domicilio
  domicilio: string;
  localidad: string;
  codigoPostal: string;
  codigoProvincia: string;
  descripcionProvincia: string;

  // Datos de contacto
  telefono1: string;
  telefono2: string;
  movil: string;
  correoElectronico: string;
  paginaWeb: string;

  // Información comercial
  nombre: string;
  domicilioComercial: string;
  codigoRubro: string;
  descripcionRubro: string;
  actividad: string;

  // Información adicional
  fechaAlta: string;
  fechaInhabilitacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private readonly DB_KEY = 'proveedores_db';
  private readonly COUNTER_KEY = 'proveedores_counter';

  /** Obtiene todos los proveedores */
  getAll(): ProveedorData[] {
    const raw = localStorage.getItem(this.DB_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  /** Guarda (insert/update) un proveedor */
  save(proveedor: ProveedorData): void {
    const list = this.getAll();
    const idx = list.findIndex(p => p.numeroProveedor === proveedor.numeroProveedor);
    if (idx >= 0) {
      list[idx] = proveedor;
    } else {
      list.push(proveedor);
    }
    localStorage.setItem(this.DB_KEY, JSON.stringify(list));
  }

  /** Elimina un proveedor por número */
  delete(numeroProveedor: string): void {
    const list = this.getAll().filter(p => p.numeroProveedor !== numeroProveedor);
    localStorage.setItem(this.DB_KEY, JSON.stringify(list));
  }

  /** Obtiene un proveedor por número */
  getByNumero(numero: string): ProveedorData | undefined {
    return this.getAll().find(p => p.numeroProveedor === numero);
  }

  /** Genera el siguiente número de proveedor autonumérico (00001 → 99999) */
  getNextNumero(): string {
    const raw = localStorage.getItem(this.COUNTER_KEY);
    const current = raw ? parseInt(raw, 10) : 0;
    const next = current + 1;
    if (next > 99999) {
      throw new Error('Se alcanzó el límite máximo de proveedores (99999).');
    }
    localStorage.setItem(this.COUNTER_KEY, next.toString());
    return next.toString().padStart(5, '0');
  }

  /** Construye un proveedor vacío con número autonumérico */
  createEmpty(): ProveedorData {
    return {
      numeroProveedor: this.getNextNumero(),
      domicilio: '',
      localidad: '',
      codigoPostal: '',
      codigoProvincia: '01',
      descripcionProvincia: 'Buenos Aires',
      telefono1: '',
      telefono2: '',
      movil: '',
      correoElectronico: '',
      paginaWeb: '',
      nombre: '',
      domicilioComercial: '',
      codigoRubro: '',
      descripcionRubro: '',
      actividad: '',
      fechaAlta: new Date().toLocaleDateString('es-AR'),
      fechaInhabilitacion: ''
    };
  }
}
