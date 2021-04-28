import { Expression } from "@angular/compiler";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { Instruccion } from "../Interfaz/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Metodo from "./Metodo";

export default class Llamada implements Instruccion{

    public id: string;
    public fila: number;
    public columna: number;
    public parametros: Array<Expresion>;

    constructor(id, fila, columna, parametros){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.parametros = parametros;
    }

    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        if(tabla.existe(this.id)){
            let tablaLocal = new TablaSimbolos(tabla);
            let simbolo = tabla.getSimbolo(this.id) as Metodo;
            
            let r = simbolo.ejecutar(controlador,tablaLocal);

            if( r!= null){
                return r;
            }
        }else{
            console.log(this.id);
        }
        
        //throw new Error("Method not implemented.");
    }

    recorrer(): Nodo {
        let raiz = new Nodo("Llamada","");
        raiz.agregarHijo(new Nodo(this.id,""));
        raiz.agregarHijo(new Nodo("(",""));
        //throw new Error("Method not implemented.");
        raiz.agregarHijo(new Nodo(")",""));
        return raiz;
    }
    
}