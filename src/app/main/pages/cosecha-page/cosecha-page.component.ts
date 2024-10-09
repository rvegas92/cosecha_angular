import { Component, inject } from '@angular/core';
import { DexieService } from '../../../shared/dixiedb/dexie-db.service'
import { AvancesService } from '../../services/avances.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-cosecha-page',
  templateUrl: './cosecha-page.component.html',
  styleUrls: ['./cosecha-page.component.css']
})
export class CosechaPageComponent {

  isModalOpen = false;
  private dexieService = inject( DexieService );
  private avancesService = inject( AvancesService );
  avances: any = [] 
  usuario: any;
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
  cosechadores: any = []
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

  avance: any = {
    enviado: 0,
    idavance: null, 
    fundo: null, 
    codfundo: null, 
    cultivo: null, 
    codcultivo: null, 
    modulo: null, 
    codmodulo: null, 
    turno: null, 
    codturno: null, 
    lote: null, 
    codlote: null, 
    variedad: null, 
    codvariedad: null, 
    clasificacionenvase: null, 
    envase: null, 
    condicion: null, 
    fecharegistro: null, 
    grupo: null, 
    descripcionenvase: null, 
    fecha: null,
    nombreVariedad: null,
    nombreEnvase: null,
    davance: []
  }

  async ngOnInit() {
    this.usuario = await this.dexieService.showUsuario()
    await this.getConfiguracion()
    await this.getAvances()
    console.log(this.avance.davance)
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
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
    //
    this.configuracion.nrodocumento = this.usuario.documentoIdentidad
  }

  async llenarDropdowns() {
    await this.ListarVariedades()
    await this.ListarEnvases()
    await this.ListarCosechadores()
  }

  async ListarVariedades() {
    if(!!!this.configuracion.idlote) {
      // this.$alertWarning('Por favor seleccione un lote en su configuracion')
    } else {
      this.variedades = await this.dexieService.ShowVariedadesByProperties(Number(this.configuracion.idlote));
    }
  }

  async ListarEnvases() {
    this.envases = await this.dexieService.ShowEnvasesByEnvase(Number(this.configuracion.tipoenvase));
  }

  async ListarCosechadores() {
    this.cosechadores = await this.dexieService.showCosechadores();
    this.cosechadores.forEach( (c: any) => c.cantidad = 0)
  }

  async sincronizarAvances() {
    if(!!this.avances && this.avances.length == 0) {
      Swal.fire({
        title: 'Importante!',
        text: 'No existen avances para importar',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Confirma que desea registrar los avances',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, deseo registrar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-warning'
        },
        buttonsStyling: false // para aplicar tus propias clases
      }).then((result) => {
        if (result.isConfirmed) {
          // const avancesEnviar = this.avances.filter( (a: any) => a.enviado = 0)
          const formatoValido = this.formatoEnvio()
          this.avancesService.enviarAvance(formatoValido).subscribe();
          this.avances.forEach(async (avance: any) => { 
            avance.enviado = 1;
            await this.dexieService.saveAvance(avance)
            await this.getAvances()
          });
          Swal.fire({
            title: 'Exito!',
            text: 'Se registraron sus avances',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
		}
  }

  formatoEnvio() {
    return [{
      sociedad: 1,
      ruc: this.usuario.ruc,
      idproyecto: this.usuario.idProyecto,
      documentoidentidad: this.usuario.documentoIdentidad,
      usuario: this.usuario.documentoIdentidad,
      avance: this.avances
    }]
  }

  async getAvances() {
    this.avances = await this.dexieService.showAvances()
  }

  async crearAvance() {
    if(!!this.configuracion.idvariedad && !!this.configuracion.idenvase) {
      if(!!this.configuracion.idgrupo) {
        const igual = this.avances.filter((a: any) => a.idvariedad == this.configuracion.idvariedad 
        && a.envase == this.configuracion.idenvase)
        await this.llenarNombresVariedadEnvase()
        if(this.avance.davance.length < 1){
          Swal.fire({
            title: 'Error en usuario',
            text: 'No hay usuario asignado',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
        }
        else if(igual.length > 0) {
          if(igual[0].eliminado === 1) {
            this.iniciarAvance()
            this.openModal()
          } else {
            this.editarAvance(igual[0].idavance)
          }
        } else {
          this.iniciarAvance()
          this.openModal()
        }
      } else {
        Swal.fire({
          title: 'Importante!',
          text: 'No cuenta con un grupo asignado',
          icon: 'info',
          timer: 2000,
          showConfirmButton: false
        });
        // this.$alertWarning('No cuenta con un grupo asignado')
      }
    } else {
      Swal.fire({
        title: 'Importante!',
        text: 'Seleccione una variedad y un envase',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      });
      // this.$alertWarning('Seleccione una variedad y un envase')
    }
  }

  async editarAvance(idavance: any) {
    this.avance = await this.dexieService.showAvanceById(idavance)
    this.avance.enviado = 0
    this.openModal()
  }

  async llenarNombresVariedadEnvase() {
    //
    this.variedad = await this.dexieService.showVariedadById(this.configuracion.idvariedad)
    this.nombresConfiguracion.nombreVariedad = this.variedad.descripcion
    //
    this.envase = await this.dexieService.showEnvaseById(Number(this.configuracion.idenvase))
    this.nombresConfiguracion.nombreEnvase = this.envase.descripcion
  }

  generateIdAvance() {
    return this.usuario.sociedad+this.usuario.idProyecto+this.usuario.documentoIdentidad
        +this.configuracion.idfundo 
        +this.configuracion.idcultivo+this.configuracion.idmodulo+this.configuracion.idturno
        +this.configuracion.idlote+this.variedad.variedad+this.envase.clasificacionEnvase
        +this.getGenerateId(); 
  }

  getGenerateId() {
    return +moment(new Date()).format('YYYYMMDD')
  }

  iniciarAvance() {
    this.avance = {
      enviado: 0,
      idavance: this.generateIdAvance(),
      cabeceraAvance: this.grupo.grupo+'-'+this.getGenerateId(),
      fundo: this.fundo.id, 
      codfundo: this.fundo.codigoFundo, 
      cultivo: this.cultivo.id, 
      codcultivo: this.cultivo.codigo, 
      modulo: this.modulo.id, 
      codmodulo: this.modulo.codModulo, 
      turno: this.turno.id, 
      codturno: this.turno.codTurno, 
      lote: this.lote.id, 
      codlote: this.lote.codLote, 
      idvariedad: this.variedad.id,
      variedad: this.variedad.variedad, 
            codvariedad: this.variedad.codigo, 
      clasificacionenvase: this.envase.clasificacionEnvase, 
      envase: this.envase.envase, 
      condicion: this.envase.condicion, 
      fecharegistro: this.getDate2(), 
      grupo: this.grupo.grupo, 
      descripcionenvase: this.envase.descripcionEnvase, 
      fecha: this.getDate4(),
      eliminado: 0,
      nombreVariedad: this.variedad.descripcion,
      nombreEnvase: this.envase.descripcion,
      davance: this.cosechadores.map((c: any) => ({
        codigoetiqueta: c.cosechador,
        nrodocumento: c.cosechador,
        nombre: c.nombre,
        cantidad: c.cantidad
      }))
    }
  }

  getDate2() {
    return moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  }
  getDate3() {
      return moment(new Date()).format('DD-MM-YYYY')
  }
  getDate4() {
      return moment(new Date()).format('YYYYMMDD')
  }
  formatDate1( fecha: any ) {
    return moment(fecha).format('YYYY-MM-DD')
  }
  eliminarAvance(id: any) {
    const vm = this
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma que desea eliminar el avance?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, deseo eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: false // para aplicar tus propias clases
    }).then((result) => {
      this.eliminarAvanceLocal(id)
    });
  }

  async eliminarAvanceLocal(id: any) {
    await this.dexieService.updateEliminadoAvanceById(id)
    await this.getAvances()
  }

  getFilteredAvances() {
    return this.avances.filter((a: any) => a.eliminado === 0);
  }

  contarJarras(nrodocumento: any) {
    const avancesJarras = this.avances.filter((a: any) => a.descripcionenvase == 'JARRA')
    if (avancesJarras.length === 0) {return 0;}
    const sumaPorNroDocumento = avancesJarras.reduce((acc: any, item: any) => {
      item.davance.forEach((det: any) => {
        if (!acc[det.nrodocumento]) {
          acc[det.nrodocumento] = 0;
        }
        acc[det.nrodocumento] += det.cantidad;
      });
      return acc;
    }, {});
    return sumaPorNroDocumento[nrodocumento] || 0;
  }

  contarClamshell(nrodocumento: any) {
    const avancesClamshell = this.avances.filter((a: any) => a.descripcionenvase == 'CLAMSHELL')
    if (avancesClamshell.length === 0) {return 0;}
    const sumaPorNroDocumento = avancesClamshell.reduce((acc: any, item: any) => {
      item.davance.forEach((det: any) => {
        if (!acc[det.nrodocumento]) {
          acc[det.nrodocumento] = 0;
        }
        acc[det.nrodocumento] += det.cantidad;
      });
      return acc;
    }, {});

    return sumaPorNroDocumento[nrodocumento] || 0;
  }

  async guardarAvance() {
    await this.dexieService.saveAvance(this.avance)
    await this.getAvances()
    this.closeModal()
  }}
