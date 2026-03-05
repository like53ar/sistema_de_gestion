import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../../../../shared/tooltip/tooltip.directive';

export interface Moneda {
  codigo: string;
  nombre: string;
}

@Component({
  selector: 'app-monedas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monedas.html',
  styleUrl: './monedas.scss'
})
export class Monedas {
  constructor(private router: Router, private route: ActivatedRoute) { }

  closeModal() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  monedasBD: Moneda[] = [
    { codigo: '000', nombre: 'OTRAS MONEDAS' },
    { codigo: 'PES', nombre: 'PESOS' },
    { codigo: 'DOL', nombre: 'Dólar ESTADOUNIDENSE' },
    { codigo: '002', nombre: 'Dólar EEUU LIBRE' },
    { codigo: '003', nombre: 'FRANCOS FRANCESES' },
    { codigo: '004', nombre: 'LIRAS ITALIANAS' },
    { codigo: '005', nombre: 'PESETAS' },
    { codigo: '006', nombre: 'MARCOS ALEMANES' },
    { codigo: '007', nombre: 'FLORINES HOLANDESES' },
    { codigo: '008', nombre: 'FRANCOS BELGAS' },
    { codigo: '009', nombre: 'FRANCOS SUIZOS' },
    { codigo: '010', nombre: 'PESOS MEJICANOS' },
    { codigo: '011', nombre: 'PESOS URUGUAYOS' },
    { codigo: '012', nombre: 'REAL' },
    { codigo: '013', nombre: 'ESCUDOS PORTUGUESES' },
    { codigo: '014', nombre: 'CORONAS DANESAS' },
    { codigo: '015', nombre: 'CORONAS NORUEGAS' },
    { codigo: '016', nombre: 'CORONAS SUECAS' },
    { codigo: '017', nombre: 'CHELINES AUTRIACOS' },
    { codigo: '018', nombre: 'Dólar CANADIENSE' },
    { codigo: '019', nombre: 'YENS' },
    { codigo: '021', nombre: 'LIBRA ESTERLINA' },
    { codigo: '022', nombre: 'MARCOS FINLANDESES' },
    { codigo: '023', nombre: 'BOLIVAR (VENEZOLANO)' },
    { codigo: '024', nombre: 'CORONA CHECA' },
    { codigo: '025', nombre: 'DINAR (YUGOSLAVO)' },
    { codigo: '026', nombre: 'Dólar AUSTRALIANO' },
    { codigo: '027', nombre: 'DRACMA (GRIEGO)' },
    { codigo: '028', nombre: 'FLORIN (ANTILLAS HOLA)' },
    { codigo: '029', nombre: 'GUARANI' },
    { codigo: '030', nombre: 'SHEKEL (ISRAEL)' },
    { codigo: '031', nombre: 'PESO BOLIVIANO' },
    { codigo: '032', nombre: 'PESO COLOMBIANO' },
    { codigo: '033', nombre: 'PESO CHILENO' },
    { codigo: '034', nombre: 'RAND (SUDAFRICANO)' },
    { codigo: '035', nombre: 'NUEVO SOL PERUANO' },
    { codigo: '036', nombre: 'SUCRE (ECUATORIANO)' },
    { codigo: '040', nombre: 'LEI RUMANOS' },
    { codigo: '041', nombre: 'DERECHOS ESPECIALES DE GIRO' },
    { codigo: '042', nombre: 'PESOS DOMINICANOS' },
    { codigo: '043', nombre: 'BALBOAS PANAMEÑAS' },
    { codigo: '044', nombre: 'CORDOBAS NICARAGÜENSES' },
    { codigo: '045', nombre: 'DIRHAM MARROQUÍES' },
    { codigo: '046', nombre: 'LIBRAS EGIPCIAS' },
    { codigo: '047', nombre: 'RIYALS SAUDITAS' },
    { codigo: '048', nombre: 'BRANCOS BELGAS FINANCIERAS' },
    { codigo: '049', nombre: 'GRAMOS DE ORO FINO' },
    { codigo: '050', nombre: 'LIBRAS IRLANDESAS' },
    { codigo: '051', nombre: 'Dólar DE HONG KONG' },
    { codigo: '052', nombre: 'Dólar DE SINGAPUR' },
    { codigo: '053', nombre: 'Dólar DE JAMAICA' },
    { codigo: '054', nombre: 'Dólar DE TAIWAN' },
    { codigo: '055', nombre: 'QUETZAL (GUATEMALTECOS)' },
    { codigo: '056', nombre: 'FORINT (HUNGRIA)' },
    { codigo: '057', nombre: 'BAHT (TAILANDIA)' },
    { codigo: '058', nombre: 'ECU' },
    { codigo: '059', nombre: 'DINAR KUWAITI' },
    { codigo: '060', nombre: 'EURO' },
    { codigo: '061', nombre: 'ZLTYS POLACOS' },
    { codigo: '062', nombre: 'RUPIAS HINDÚES' },
    { codigo: '063', nombre: 'LEMPIRAS HONDUREÑAS' },
    { codigo: '064', nombre: 'YUAN (Rep. Pop. China)' }
  ];

  searchTerm: string = '';

  get monedasFiltradas(): Moneda[] {
    return this.monedasBD.filter(m =>
      m.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.codigo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
