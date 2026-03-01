import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllClientes } from '../../store/ventas.selectors';
import { VentasActions } from '../../store/ventas.actions';

@Component({
    selector: 'app-informes',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './informes.html',
    styleUrl: './informes.scss'
})
export class Informes implements OnInit {
    clientes$: Observable<any[]>;
    clientesBackup: any[] = [];
    viendoPantalla = false;
    today = new Date();

    constructor(private store: Store) {
        this.clientes$ = this.store.select(selectAllClientes);
    }

    ngOnInit() {
        this.store.dispatch(VentasActions.loadClientes());
        this.clientes$.subscribe(data => {
            this.clientesBackup = data;
        });
    }

    imprimirPorImpresora() {
        window.print();
    }

    verPorPantalla() {
        this.viendoPantalla = true;
    }

    cerrarPantalla() {
        this.viendoPantalla = false;
    }

    exportarCSV() {
        if (!this.clientesBackup || this.clientesBackup.length === 0) {
            alert("No hay datos para exportar");
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,ID,Nombre\n"
            + this.clientesBackup.map(c => `${c.id},${c.name}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "padron_clientes.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    exportarPDF() {
        // Debido a que no hay librerías externas para PDF, activamos la impresión con aviso:
        alert("Para exportar a PDF, en la ventana de impresión seleccione 'Guardar como PDF' como destino.");
        window.print();
    }

    exportarWord() {
        if (!this.clientesBackup || this.clientesBackup.length === 0) return;

        const htmlToExport = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset="utf-8"><title>Padrón de Clientes</title></head>
      <body>
        <h1 style="text-align:center;">Padrón de Clientes</h1>
        <table border="1" cellpadding="5" cellspacing="0" width="100%" style="border-collapse: collapse;">
          <tr style="background-color: #f2f2f2;"><th>ID</th><th>Razón Social / Nombre</th></tr>
          ${this.clientesBackup.map(c => `<tr><td>${c.id}</td><td>${c.name}</td></tr>`).join('')}
        </table>
      </body></html>
    `;
        const blob = new Blob(['\ufeff', htmlToExport], {
            type: 'application/msword'
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "padron_clientes.doc";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
