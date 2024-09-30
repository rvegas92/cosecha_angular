import { Component } from '@angular/core';

@Component({
  selector: 'app-envio-page',
  templateUrl: './envio-page.component.html',
  styleUrls: ['./envio-page.component.css']
})
export class EnvioPageComponent {

  placa: any = ''
  tickets: any = [
      { id: 1, grupo: 'GRUPO A', codigo: 'TicketEnvio1', lote: 'xfbdf', fecha: '09/08 15:12' },
      { id: 2, grupo: 'GRUPO B', codigo: 'TicketEnvio2', lote: 'xfbdf', fecha: '09/08 15:12' },
      // Más tickets...
  ]

}
