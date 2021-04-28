import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";

export default class While implements Instruccion{

    public condicion: Expresion;
    public listadoInstrucciones: Array<Instruccion>;
    public fila: number;
    public columna: number;

    constructor(condicion, listadoInstrucciones, fila, columna){
        this.condicion= condicion;
        this.listadoInstrucciones = listadoInstrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        let val = this.condicion.getValor(controlador,tabla);
        
        if(typeof val === 'boolean'){
            while(this.condicion.getValor(controlador,tabla)){
                let tablaLocal = new TablaSimbolos(tabla);

                for(let i of this.listadoInstrucciones){
                    let r = i.ejecutar(controlador,tablaLocal);
                }
            }
        }
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}