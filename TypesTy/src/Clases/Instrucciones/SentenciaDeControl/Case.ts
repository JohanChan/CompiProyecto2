import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Detener";

export default class Caso implements Instruccion{
    public condicion: Expresion;
    public listadoInstrucciones: Array<Instruccion>;
    constructor(condicion, listadoInstrucciones){
        this.condicion = condicion;
        this.listadoInstrucciones = listadoInstrucciones;
    }   
    
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        if(this.condicion != null){
            let tablaLocal = new TablaSimbolos(tabla);
            for(let instruccion of this.listadoInstrucciones){
                let resultado = instruccion.ejecutar(controlador,tablaLocal);
                if(instruccion instanceof Detener || resultado instanceof Detener){
                    return resultado;
                }
            }
        }
        
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}