export interface Fundo {
    id: number;
    fundo: number;
    empresa: number;
    codigoFundo: string;
    nombreFundo: string
}

export interface Cultivo {
    id: number;
    empresa: number;
    codigo: string;
    descripcion: string;
}

export interface Grupo {
    id: string;
    grupo: string;
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    estado: number;
    idProyecto: string;
    ruc: string;
}

export interface Tapa {
    id: number;
    idColor: number;
    color: string;
}

export interface Modulo {
    id: number;
    modulo: number;
    codModulo: string;
    nombreModulo: string;
    fundo: string;
    cultivo: string;
}

export interface Lote {
    id: number;
    lote: number;
    codLote: string;
    nombreLote: string;
    turno: number;
    cultivo: number;
}

export interface Turno {
    id: number;
    turno: number;
    codTurno: string;
    nombreTurno: string;
    modulo: number;
}

export interface Variedad {
    id: string;
    lote: number;
    variedad: number;
    cultivo: number;
    codigo: string;
    descripcion: string
}

export interface Envase {
    id: number;
    envase: number;
    descripcionEnvase: string;
    clasificacionEnvase: string;
    condicion: string;
    descripcion: string;
}

export interface Configuracion {
    nrodocumento: string;
    idfundo: number;
    idcultivo: number;
    idgrupo: number;
    idtapa: number;
    idmodulo: number;
    idlote: number;
    idturno: number;
    idenvase: number;
}

export interface Usuario {
    id: string;
    sociedad: number;
    ruc: string;
    razonSocial: string;
    idProyecto: string;
    proyecto: string;
    documentoIdentidad: string;
    usuario: string;
    clave: string;
    nombre: string;
    esAdministrador: string;
    esSupervisor: string;
}

export interface Cosechador {
    id: string;
    supervisor: string;
    cosechador: string;
    nombre: string;
}

export interface Avance {
    idavance: string;
    cabeceraAvance: string;
    fundo: string;
    codfundo: string;
    cultivo: string;
    codcultivo: string;
    modulo: string;
    codmodulo: string;
    turno: string;
    codturno: string;
    lote: string;
    codlote: string;
    variedad: string;
    codvariedad: string;
    clasificacionenvase: string;
    envase: string;
    condicion: string;
    fecharegistro: string;
    grupo: string;
    descripcionenvase: string;
    enviado: string;
    fecha: string;
    eliminado: number;
    nombreVariedad: string;
    nombreEnvase: string;
    davance: [];
}