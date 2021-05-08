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
        let valor = this.getValor(controlador,tabla);
        
        if(typeof valor === 'number'){
            return  tipo.DECIMAL;
        }else if(typeof valor === 'string'){
            return tipo.CADENA;
        }else if(typeof valor==='boolean'){
            return tipo.BOOLEANO;
        }
    }

    getValor(controlador: Controlador, tabla: TablaSimbolos){
        return this.primitivo;
    }

    recorrer():Nodo{
        
        let raiz = new Nodo("Primitivo","");
        raiz.agregarHijo(new Nodo(this.primitivo.toString(),""));
        return raiz;
        //throw new Error("Metodo no implementado");
    }

}