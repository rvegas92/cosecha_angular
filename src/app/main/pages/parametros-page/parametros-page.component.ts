import { Component, inject } from '@angular/core';
import { DexieService } from '../../../shared/dixiedb/dexie-db.service'
import { MaestrasService } from '../../services/maestras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parametros-page',
  templateUrl: './parametros-page.component.html',
  styleUrls: ['./parametros-page.component.css']
})
export class ParametrosPageComponent {

  usuario: any;
  fundos: any = [];
  cultivos: any = [];
  grupos: any = [];
  tapas: any = [];
  modulos: any = [];
  lotes: any = [];
  turnos: any = [];
  envases: any = [];
  configuracion: any = {
    idfundo: null,
    idcultivo: null,
    idgrupo: null,
    idtapa: null,
    idmodulo: null,
    idlote: null,
    idturno: null,
    idenvase: null
  }
  isLoading = false;
  private dexieService = inject( DexieService );
  private maestrasService = inject( MaestrasService );

  constructor() {}

  async ngOnInit() {
    this.usuario = await this.dexieService.showUsuario()
    this.getConfiguration()
  }

  async getConfiguration() {
    this.llenarDropdowns()
    const configuration = await this.dexieService.obtenerConfiguracion();
    if(!!configuration && configuration.length>0) {
      this.configuracion = configuration[0];
      this.configuracion.nrodocumento = this.usuario.documentoIdentidad
      await this.cargarTurnosModulos()
    }
  }

  async cargarLotes() {
    // const cultivo = await this.dexieService.ShowLotesByIdLote(this.configuracion.idlote);
    // this.turnos = await this.dexieService.ShowTurnosByIdTurno(lote[0].turno);
    // this.configuracion.idturno = this.turnos[0].id
    // this.modulos = await this.dexieService.ShowModulosByIdModulo(this.turnos[0].modulo);
    // this.configuracion.idmodulo = this.turnos[0].modulo
  }

  async cargarTurnosModulos() {
    const lote = await this.dexieService.ShowLotesByIdLote(this.configuracion.idlote);
    this.turnos = await this.dexieService.ShowTurnosByIdTurno(lote[0].turno);
    this.configuracion.idturno = this.turnos[0].id
    this.modulos = await this.dexieService.ShowModulosByIdModulo(this.turnos[0].modulo);
    this.configuracion.idmodulo = this.turnos[0].modulo
  }

  async guardarConfiguracion() {
    this.configuracion.nrodocumento = this.usuario?.documentoIdentidad
    await this.dexieService.saveConfiguracion(this.configuracion)
    Swal.fire({
      title: '¡Éxito!',
      text: 'La operación se completó correctamente.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
    this.getConfiguration()
  }

  async sincronizarTablasMaestras() {
    this.maestrasService.getFundos().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveFundos(resp);await this.ListarFundos();}
    });
    this.maestrasService.getCultivos().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveCultivos(resp);await this.ListarCultivos();}
    });
    this.maestrasService.getGrupos({nrodocumento: this.usuario?.documentoIdentidad}).subscribe(async (resp)=> {
      if(!!resp && resp.length) { await this.dexieService.saveGrupos(resp);await this.ListarGrupos();}
    });
    this.maestrasService.getTapas().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveTapas(resp);await this.ListarTapas();}
    });
    this.maestrasService.getModulos().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveModulos(resp);await this.ListarModulos();}
    });
    this.maestrasService.getLotes().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveLotes(resp);await this.ListarLotes();}
    });
    this.maestrasService.getTurnos().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveTurnos(resp);await this.ListarTurnos();}
    });
    this.maestrasService.getVariedades().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveVariedades(resp);}
    });
    this.maestrasService.getEnvases().subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveEnvases(resp);await this.ListarEnvases()}
    });
    this.maestrasService.getCosechadores({nrodocumento: this.usuario?.documentoIdentidad}).subscribe(async (resp)=> {
      if(!!resp && resp.length) {await this.dexieService.saveCosechadores(resp);}
    });
    Swal.fire({
      title: '¡Éxito!',
      text: 'La operación se completó correctamente.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }

  async llenarDropdowns() {
    await this.ListarFundos()
    await this.ListarCultivos()
    await this.ListarLotes()
    await this.ListarGrupos()
    await this.ListarTapas()
    await this.ListarEnvases()
  }

  async ListarFundos() {
    this.fundos = await this.dexieService.showFundos();
  }

  async ListarCultivos() {
    this.cultivos = await this.dexieService.showCultivos();
  }
  
  async ListarGrupos() {
    this.grupos = await this.dexieService.showGrupos();
  }

  async ListarTapas() {
    this.tapas = await this.dexieService.showTapas();
  }

  async ListarModulos() {
    this.modulos = await this.dexieService.showModulos();
  }

  async ListarLotes() {
    this.lotes = await this.dexieService.showLotes();
  }

  async ListarTurnos() {
    this.turnos = await this.dexieService.showTurnos();
  }

  async ListarEnvases() {
    const envases = await this.dexieService.showEnvases();
    this.envases = Object.values(envases.reduce((acc: any, { envase, descripcionEnvase }) => {
      if (!acc[envase]) {
        acc[envase] = { envase, descripcionEnvase };
      }
      return acc;
    }, {}));
  }

}
