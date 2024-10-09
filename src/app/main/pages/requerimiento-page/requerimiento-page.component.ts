import { Component, inject } from '@angular/core';
import { DexieService } from 'src/app/shared/dixiedb/dexie-db.service';

@Component({
  selector: 'app-requerimiento-page',
  templateUrl: './requerimiento-page.component.html',
  styleUrls: ['./requerimiento-page.component.css']
})
export class RequerimientoPageComponent {
  user: any = [];
  cosechadores: any = [];
  private dexieService = inject( DexieService );
  async ngOnInit(){
    this.user = await this.dexieService.showUsuario();
    this.cosechadores = await this.dexieService.showCosechadores();
    // console.log(this.cosechadores)
  }
  asignarTodos(){
    const inputs = document.querySelectorAll('.checkbox');
    console.log(inputs)
    inputs.forEach((check:any)=>{
      check.checked = true;
    })
  }
  desasignar(){
    const inputs = document.querySelectorAll('.checkbox');
    console.log(inputs)
    inputs.forEach((check:any)=>{
      check.checked = false;
    })
  }
}
