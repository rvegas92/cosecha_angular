import { Component } from '@angular/core';
import { DexieService } from './shared/dixiedb/dexie-db.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cosecha';
  constructor(private dexieService: DexieService) {
    // Al inyectar el servicio aquí, el constructor se ejecutará cuando se cargue la aplicación.
    console.log('DexieService inicializado');
  }
}
