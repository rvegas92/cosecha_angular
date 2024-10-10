import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DexieService } from 'src/app/shared/dixiedb/dexie-db.service';

@Component({
  selector: 'app-requerimiento-page',
  templateUrl: './requerimiento-page.component.html',
  styleUrls: ['./requerimiento-page.component.css']
})
export class RequerimientoPageComponent {
  user: any = [];
  cosechadores: any = [];
  isModalOpen = false;
  etiquetas : any = [];
  private dexieService = inject( DexieService );
  async ngOnInit(){
    this.user = await this.dexieService.showUsuario();
    this.cosechadores = await this.dexieService.showCosechadores();
    // console.log(this.cosechadores)
  }
  openModal(): void {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
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
  async guardarEtiquetas(){
    this.cosechadores.forEach((e:any) => {
      e.nrodocumento = e.cosechadores,
      e.imprimir = "true";
    });
    this.etiquetas = this.cosechadores;
    await this.dexieService.saveEtiquetas(this.etiquetas)
    this.closeModal()
    console.log(this.etiquetas)
  }
}
