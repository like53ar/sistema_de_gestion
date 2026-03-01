import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../../shared/tooltip/tooltip.directive';

export interface Banco {
  id: string; // Alfanumérico
  nombre: string;
}

@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bancos.html',
  styleUrl: './bancos.scss'
})
export class Bancos {
  bancosBD: Banco[] = [
    { id: '007', nombre: 'BANCO DE GALICIA Y BUENOS AIRES S.A.U.' },
    { id: '011', nombre: 'BANCO DE LA NACIÓN ARGENTINA' },
    { id: '014', nombre: 'BANCO DE LA PROVINCIA DE BUENOS AIRES' },
    { id: '015', nombre: 'INDUSTRIAL AND COMMERCIAL BANK OF CHINA (ARGENTINA) S.A.U.' },
    { id: '016', nombre: 'CITIBANK N.A.' },
    { id: '017', nombre: 'BANCO BBVA ARGENTINA S.A.' },
    { id: '020', nombre: 'BANCO DE LA PROVINCIA DE CÓRDOBA S.A.' },
    { id: '027', nombre: 'BANCO SUPERVIELLE S.A.' },
    { id: '029', nombre: 'BANCO DE LA CIUDAD DE BUENOS AIRES' },
    { id: '034', nombre: 'BANCO PATAGONIA S.A.' },
    { id: '044', nombre: 'BANCO HIPOTECARIO S.A.' },
    { id: '045', nombre: 'BANCO DE SAN JUAN S.A.' },
    { id: '065', nombre: 'BANCO MUNICIPAL DE ROSARIO' },
    { id: '072', nombre: 'BANCO SANTANDER ARGENTINA S.A.' },
    { id: '083', nombre: 'BANCO DEL CHUBUT S.A.' },
    { id: '086', nombre: 'BANCO DE SANTA CRUZ S.A.' },
    { id: '093', nombre: 'BANCO DE LA PAMPA SOCIEDAD DE ECONOMÍA MIXTA' },
    { id: '094', nombre: 'BANCO DE CORRIENTES S.A.' },
    { id: '097', nombre: 'BANCO PROVINCIA DEL NEUQUÉN S.A.' },
    { id: '131', nombre: 'BANK OF CHINA LIMITED, SUCURSAL BUENOS AIRES' },
    { id: '143', nombre: 'BRUBANK S.A.U.' },
    { id: '147', nombre: 'BANCO INTERFINANZAS S.A.' },
    { id: '150', nombre: 'HSBC BANK ARGENTINA S.A.' },
    { id: '158', nombre: 'OPEN BANK ARGENTINA S.A.' },
    { id: '165', nombre: 'J P MORGAN CHASE BANK, NATIONAL ASSOCIATION (SUCURSAL BUENOS AIRES)' },
    { id: '191', nombre: 'BANCO CREDICOOP COOPERATIVO LIMITADO' },
    { id: '198', nombre: 'BANCO DE VALORES S.A.' },
    { id: '247', nombre: 'BANCO ROELA S.A.' },
    { id: '254', nombre: 'BANCO MARIVA S.A.' },
    { id: '259', nombre: 'BANCO ITAÚ ARGENTINA S.A.' },
    { id: '266', nombre: 'BNP PARIBAS' },
    { id: '268', nombre: 'BANCO PROVINCIA DE TIERRA DEL FUEGO' },
    { id: '269', nombre: 'BANCO DE LA REPÚBLICA ORIENTAL DEL URUGUAY' },
    { id: '277', nombre: 'BANCO SÁENZ S.A.' },
    { id: '281', nombre: 'BANCO MERIDIAN S.A.' },
    { id: '285', nombre: 'BANCO MACRO S.A.' },
    { id: '299', nombre: 'BANCO COMAFI S.A.' },
    { id: '300', nombre: 'BANCO DE INVERSIÓN Y COMERCIO EXTERIOR S.A.' },
    { id: '301', nombre: 'BANCO PIANO S.A.' },
    { id: '305', nombre: 'BANCO JULIO S.A.' },
    { id: '309', nombre: 'BANCO RIOJA SOCIEDAD ANÓNIMA UNIPERSONAL' },
    { id: '310', nombre: 'BANCO DEL SOL S.A.' },
    { id: '311', nombre: 'NUEVO BANCO DEL CHACO S.A.' },
    { id: '312', nombre: 'BANCO VOII S.A.' },
    { id: '315', nombre: 'BANCO DE FORMOSA S.A.' },
    { id: '319', nombre: 'BANCO CMF S.A.' },
    { id: '321', nombre: 'BANCO DE SANTIAGO DEL ESTERO S.A.' },
    { id: '322', nombre: 'BANCO INDUSTRIAL S.A.' },
    { id: '330', nombre: 'NUEVO BANCO DE SANTA FE S.A.' },
    { id: '331', nombre: 'BANCO CETELEM ARGENTINA S.A.' },
    { id: '332', nombre: 'BANCO DE SERVICIOS FINANCIEROS S.A.' },
    { id: '338', nombre: 'BANCO DE SERVICIOS Y TRANSACCIONES S.A.' },
    { id: '339', nombre: 'RCI BANQUE S.A.' },
    { id: '340', nombre: 'BACS BANCO DE CREDITO Y SECURITIZACION S.A.' },
    { id: '341', nombre: 'BANCO MASVENTAS S.A.' },
    { id: '384', nombre: 'WILOBANK S.A.U.' },
    { id: '386', nombre: 'NUEVO BANCO DE ENTRE RÍOS S.A.' },
    { id: '389', nombre: 'BANCO COLUMBIA S.A.' },
    { id: '426', nombre: 'BANCO BICA S.A.' },
    { id: '431', nombre: 'BANCO COINAG S.A.' },
    { id: '432', nombre: 'BANCO DE COMERCIO S.A.' },
    { id: '435', nombre: 'BANCO SUCRÉDITO REGIONAL S.A.U.' },
    { id: '448', nombre: 'BANCO DINO S.A.' }
  ];

  searchTerm: string = '';

  get bancosFiltrados(): Banco[] {
    return this.bancosBD.filter(b =>
      b.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
