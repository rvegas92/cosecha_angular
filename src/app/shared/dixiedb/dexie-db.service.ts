import { Injectable } from '@angular/core';
import { Fundo,Cultivo,Grupo,Tapa,Modulo,Lote,Turno,Variedad,
  Envase,Configuracion,Usuario,Cosechador,Avance } from '../interfaces/Tables'
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})

export class DexieService extends Dexie {
  public fundos!: Dexie.Table<Fundo, number>;
  public cultivos!: Dexie.Table<Cultivo, number>;
  public grupos!: Dexie.Table<Grupo, number>;
  public tapas!: Dexie.Table<Tapa, number>;
  public modulos!: Dexie.Table<Modulo, number>;
  public lotes!: Dexie.Table<Lote, number>;
  public turnos!: Dexie.Table<Turno, number>;
  public variedades!: Dexie.Table<Variedad, number>;
  public envases!: Dexie.Table<Envase, number>;
  public configuracion!: Dexie.Table<Configuracion, number>;
  public usuario!: Dexie.Table<Usuario, number>;
  public cosechadores!: Dexie.Table<Cosechador, number>;
  public avances!: Dexie.Table<Avance, number>;

  constructor() {
    super('Cosecha');

    console.log('DexieService Constructor - Base de datos inicializada');

    this.version(1).stores({
      fundos: 'id,codigoFundo,empresa,fundo,nombreFundo',
      cultivos: 'id,cultivo,codigo,descripcion,empresa',
      grupos: 'id,numeroDocumento,nombres,apellidos,grupo,estado,idProyecto,ruc',
      tapas: 'id,idColor,color',
      modulos: 'id,codModulo,modulo,nombreModulo,fundo,cultivo',
      lotes: 'id,codLote,lote,nombreLote,turno',
      turnos: 'id,codTurno,turno,nombreTurno,modulo',
      variedades: 'id,variedad,cultivo,codigo,descripcion',
      envases: 'id,envase,descripcionEnvase,clasificacionEnvase,condicion,descripcion',
      configuracion: 'nrodocumento,idfundo,idcultivo,idgrupo,idtapa,idmodulo,idlote,idturno',
      usuario: 'id,sociedad,ruc,razonSocial,idProyecto,proyecto,documentoIdentidad,usuario,clave,nombre,esAdministrador,esSupervisor',
      cosechadores: 'id,supervisor,cosechador,nombre',
      avances:`idavance,cabeceraAvance,fundo,codfundo,cultivo,codcultivo,modulo,codmodulo,turno,codturno,lote,
              codlote,variedad,codvariedad,clasificacionenvase,envase,condicion,fecharegistro,grupo,descripcionenvase,
              enviado,fecha,eliminado,nombreVariedad,nombreEnvase,davance`
    });

    this.fundos = this.table('fundos');
    this.cultivos = this.table('cultivos');
    this.grupos = this.table('grupos');
    this.tapas = this.table('tapas');
    this.modulos = this.table('modulos');
    this.lotes = this.table('lotes');
    this.turnos = this.table('turnos');
    this.variedades = this.table('variedades');
    this.envases = this.table('envases');
    this.configuracion = this.table('configuracion');
    this.usuario = this.table('usuario');
    this.cosechadores = this.table('cosechadores');
    this.avances = this.table('avances');
  }

  async saveUsuario(usuario: Usuario) {await this.usuario.put(usuario);}
  async showUsuario() {return await this.usuario.toCollection().first()}
  async clearUsuario() {await this.usuario.clear();}

  async saveFundo(fundo: Fundo) {await this.fundos.put(fundo);}
  async saveFundos(fundos: Fundo[]) {await this.fundos.bulkPut(fundos);}
  async showFundos() {return await this.fundos.toArray();}
  async showFundoById(id: number) {return await this.fundos.where('id').equals(id).first()}
  async clearFundos() {await this.fundos.clear();}
  //
  async saveCultivo(cultivo: Cultivo) {await this.cultivos.put(cultivo);}  
  async saveCultivos(cultivos: Cultivo[]) {await this.cultivos.bulkPut(cultivos);}
  async showCultivos() {return await this.cultivos.toArray();}
  async showCultivoById(id: number) {return await this.cultivos.where('id').equals(id).first()}
  async clearCultivos() {await this.cultivos.clear();}
  //
  async saveGrupo(grupo: Grupo) {await this.grupos.put(grupo);}  
  async saveGrupos(grupos: Grupo[]) {await this.grupos.bulkPut(grupos);}
  async showGrupos() {return await this.grupos.toArray();}
  async showGrupoById(id: string) {return await this.grupos.where('id').equals(id).first()}
  async clearGrupos() {await this.grupos.clear();}
  //
  async saveTapa(tapa: Tapa) {await this.tapas.put(tapa);}  
  async saveTapas(tapas: Tapa[]) {await this.tapas.bulkPut(tapas);}
  async showTapas() {return await this.tapas.toArray();}
  async clearTapas() {await this.tapas.clear();}
  //
  async saveModulo(modulo: Modulo) {await this.modulos.put(modulo);}  
  async saveModulos(modulos: Modulo[]) {await this.modulos.bulkPut(modulos);}
  async showModulos() {return await this.modulos.toArray();}
  async showModuloById(id: number) {return await this.modulos.where('id').equals(id).first()}
  async ShowModulosByIdModulo(id: number) { return await this.modulos.filter(modulo => modulo.id == id).toArray()}
  // async ShowModulosByIdTurno(idturno: number) { return await this.modulos.filter(modulo => modulo.turno === idturno).toArray()}
  async clearModulos() {await this.modulos.clear();}
  //
  async saveLote(lote: Lote) {await this.lotes.put(lote);}
  async saveLotes(lotes: Lote[]) {await this.lotes.bulkPut(lotes);}
  async showLotes() {return await this.lotes.toArray();}
  async showLoteById(id: number) {return await this.lotes.where('id').equals(id).first()}
  async ShowLotesByIdLote(idlote: number) { return await this.lotes.filter(lote => lote.id == idlote).toArray()}
  async clearLotes() {await this.lotes.clear();}
  //
  async saveTurno(turno: Turno) {await this.turnos.put(turno);}
  async saveTurnos(turnos: Turno[]) {await this.turnos.bulkPut(turnos);}
  async showTurnos() {return await this.turnos.toArray();}
  async showTurnoById(id: number) {return await this.turnos.where('id').equals(id).first()}
  async ShowTurnosByIdTurno(idturno: number) { return await this.turnos.filter(turno => turno.id == idturno).toArray()}
  async clearTurnos() {await this.turnos.clear();}
  //
  async saveVariedad(variedad: Variedad) {await this.variedades.put(variedad);}
  async saveVariedades(variedades: Variedad[]) {await this.variedades.bulkPut(variedades);}
  async showVariedades() {return await this.variedades.toArray();}
  async showVariedadById(id: number) {return await this.variedades.where('id').equals(id).first()}
  async ShowVariedadesByProperties(idlote: any) { return await this.variedades
    .filter(variedad => variedad.lote == idlote)
    .toArray()}
  async clearVariedades() {await this.variedades.clear();}
  //
  async saveEnvase(envase: Envase) {await this.envases.put(envase);}
  async saveEnvases(envases: Envase[]) {await this.envases.bulkPut(envases);}
  async showEnvases() {return await this.envases.toArray();}
  async showEnvaseById(id: number) {return await this.envases.where('id').equals(id).first()}
  async ShowEnvasesByEnvase(idenvase: number) { return await this.envases.filter(envase => envase.envase == idenvase).toArray()}
  async clearEnvases() {await this.envases.clear();}
  //
  async saveCosechador(cosechador: Cosechador) {await this.cosechadores.put(cosechador);}
  async saveCosechadores(cosechadores: Cosechador[]) {await this.cosechadores.bulkPut(cosechadores);}
  async showCosechadores() {return await this.cosechadores.toArray();}
  async clearCosechadores() {await this.cosechadores.clear();}
  //
  async saveAvance(avance: Avance) {await this.avances.put(avance);}
  async saveAvances(avances: Avance[]) {await this.avances.bulkPut(avances);}
  async showAvances() {return await this.avances.orderBy('fecharegistro').toArray();}
  async showAvanceById(id: number) {return await this.avances.where('idavance').equals(id).first()}
  async clearAvances() {await this.avances.clear();}
  async clearAvanceById(id: number) {await this.avances.delete(id);}
  async updateEliminadoAvanceById(id: number) { await this.avances.update(id, { eliminado: 1 });}
  //
  async clearAllTables() {
      await this.clearFundos();
      await this.clearLotes();
      await this.clearCultivos();
      await this.clearGrupos();
      await this.clearTapas();
      await this.clearModulos();
      await this.clearLotes();
      await this.clearTurnos();
      await this.clearVariedades();
      await this.clearEnvases();
      await this.clearCosechadores();
      console.log('Todas las tablas de configuracion han sido limpiadas en indexedDB.');
  }
  //
  async saveConfiguracion(configuracion: Configuracion) { await this.configuracion.put(configuracion); }
  async obtenerConfiguracion() {return await this.configuracion.toArray();} 

  // // Método para agregar un nuevo ítem
  // async addItem(item: Item): Promise<number> {
  //   return await this.items.add(item);
  // }

  // // Método para obtener todos los ítems
  // async getAllItems(): Promise<Item[]> {
  //   return await this.items.toArray();
  // }

  // // Método para eliminar un ítem por su id
  // async deleteItem(id: number): Promise<void> {
  //   await this.items.delete(id);
  // }
}