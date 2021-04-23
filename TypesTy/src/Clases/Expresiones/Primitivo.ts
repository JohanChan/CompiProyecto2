import { type } from "node:os"
import Nodo from "../Ast/Nodo"
import Controlador from "../Controlador"
import { Expresion } from "../Interfaz/Expresion"
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos"
import { tipo } from "../TablaSimbolos/Tipo"

export default class Primitivo implements Expresion{
    public primitivo: any;
    public fila: number;
    public columna: number;

    constructor(primitivo: any, fila: number, columna: number){
        this.primitivo = primitivo;
        this.fila = fila;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, tabla: TablaSimbolos): tipo{
        let valor = this.getTipo(controlador,tabla);
        let tip = tipo.INDEFINIDO;
        if(typeof valor === 'number'){
            tip =  tipo.DECIMAL;
        }else if(typeof valor === 'string'){
            tip = tipo.CADENA;
        }else if(typeof valor==='boolean'){
            tip = tipo.BOOLEANO;
        }
        return tip;
    }

    getValor(controlador: Controlador, tabla: TablaSimbolos){
        return this.primitivo;
    }

    recorrer():Nodo{
        throw new Error("Metodo no implementado");
    }

}