import { Component, inject } from '@angular/core';
import { DexieService } from '../../../shared/dixiedb/dexie-db.service'

@Component({
  selector: 'app-envio-page',
  templateUrl: './envio-page.component.html',
  styleUrls: ['./envio-page.component.css']
})
export class EnvioPageComponent {

  private dexieService = inject( DexieService );

  //
  grupo: any = null
  fundo: any = null
  cultivo: any = null
  modulo: any = null
  turno: any = null
  lote: any = null
  variedad: any = null
  envase: any = null
  variedades: any = []
  envases: any = []

  nombresConfiguracion: any = {
    nombreFundo: null,
    nombreCultivo: null,
    nombreModulo: null,
    nombreTurno: null,
    nombreLote: null,
    nombreVariedad: null,
    nombreEnvase: null,
    nombreGrupo: null
  }

  configuracion: any = {
    idfundo: null,
    idcultivo: null,
    idgrupo: null,
    idtapa: null,
    idmodulo: null,
    idlote: null,
    idturno: null,
    idvariedad: null,
    idenvase: null,
    tipoenvase: null
  }

  async ngOnInit() {
    await this.getConfiguracion()
  }

  async guardarDatosMaestros(config: any) {
    //
    this.configuracion.idfundo = config.idfundo;
    this.fundo = await this.dexieService.showFundoById(Number(config.idfundo))
    this.nombresConfiguracion.nombreFundo = this.fundo.nombreFundo
    //
    this.configuracion.idcultivo = config.idcultivo;
    this.cultivo = await this.dexieService.showCultivoById(Number(config.idcultivo))
    this.nombresConfiguracion.nombreCultivo = this.cultivo.descripcion
    //
    this.configuracion.idmodulo = config.idmodulo;
    this.modulo = await this.dexieService.showModuloById(Number(config.idmodulo))
    this.nombresConfiguracion.nombreModulo = this.modulo.nombreModulo
    //
    this.configuracion.idturno = config.idturno;
    this.turno = await this.dexieService.showTurnoById(Number(config.idturno))
    this.nombresConfiguracion.nombreTurno = this.turno.nombreTurno
    //
    this.configuracion.idlote = config.idlote;
    this.lote = await this.dexieService.showLoteById(Number(config.idlote))
    this.nombresConfiguracion.nombreLote = this.lote.nombreLote
    //
    this.configuracion.tipoenvase = Number(config.idenvase);
    //
    if(!!config.idgrupo) {
      this.configuracion.idgrupo = config.idgrupo;
      this.grupo = await this.dexieService.showGrupoById(config.idgrupo)
      this.nombresConfiguracion.nombreGrupo = this.grupo.grupo
    } else {
      // this.$alertWarning('No cuenta con un grupo asignado')
    }
  }

  async getConfiguracion() {
    const configuracion = await this.dexieService.obtenerConfiguracion();
    if(!!configuracion && configuracion.length>0){
      const config = configuracion[0];
      await this.guardarDatosMaestros(config)
      await this.llenarDropdowns()
    } else {
      // this.$alertWarning('No existe una configuracion almacenada');
    }
    
  }

  async llenarDropdowns() {
    await this.ListarVariedades()
  }

  async ListarVariedades() {
    if(!!!this.configuracion.idlote) {
      // this.$alertWarning('Por favor seleccione un lote en su configuracion')
    } else {
      this.variedades = await this.dexieService.ShowVariedadesByProperties(Number(this.configuracion.idlote));
    }
  }

  placa: any = ''
  tickets: any = [
      { id: 1, grupo: 'GRUPO A', codigo: 'TicketEnvio1', lote: 'xfbdf', fecha: '09/08 15:12' },
      { id: 2, grupo: 'GRUPO B', codigo: 'TicketEnvio2', lote: 'xfbdf', fecha: '09/08 15:12' },
      // Más tickets...
  ]

}
