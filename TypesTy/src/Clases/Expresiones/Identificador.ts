import { from } from "rxjs";
import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos"
import { tipo } from "../TablaSimbolos/Tipo";

export default class Identificador implements Expresion{
    public identificador: string;
    public fila: number;
    public columna: number;

    constructor(identificador: string, fila: number, columna: number){
        this.identificador =identificador;
        this.fila = fila;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, tabla: TablaSimbolos): tipo{
        let idExistente = tabla.getSimbolo(this.identificador);
        
        if(idExistente != null){
            return  idExistente.tipo.type;
        }
    }   
    getValor(controlador: Controlador, tabla: TablaSimbolos){
        let idExistente = tabla.getSimbolo(this.identificador);
        if(idExistente != null){
            return idExistente.valor;
        }else{
            let err = new Errores('Semantico', `No existe variable ${this.identificador} en la tabla de simbolos`, this.fila, this.columna);
            controlador.errores.push(err);
            controlador.append(`Error semantico`);
            return null;
        }
    }
    recorrer(): Nodo{
        throw new Error("Metodo no implementado");
    }
}
