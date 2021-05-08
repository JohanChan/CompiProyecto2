import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Continuar from "../SentenciaTransferencia/Continuar";
import Detener from "../SentenciaTransferencia/Detener";

export default class If implements Instruccion{
    
    public condicion: Expresion;
    public listadoIf: Array<Instruccion>;
    public listadoElse: Array<Instruccion>;
    public fila: number;
    public columna: number;

    constructor(condicion, listadoIf, listadoElse, fila, columna){
        this.condicion = condicion;
        this.listadoIf = listadoIf;
        this.listadoElse = listadoElse;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        let tablaLocal = new TablaSimbolos(tabla);
        
        let valor = this.condicion.getValor(controlador,tabla);

        if(this.condicion.getTipo(controlador,tabla) == tipo.BOOLEANO){
            if(valor){
                for(let i of this.listadoIf){
                    let res = i.ejecutar(controlador,tablaLocal);
                    if(i instanceof Detener || res instanceof Detener){
                        return res;
                    }
                    if(i instanceof Continuar || res instanceof Continuar){
                        return res;
                    }
                }
            }else{
                for(let i of this.listadoElse){
                    let res = i.ejecutar(controlador,tablaLocal);
                    if(i instanceof Detener || res instanceof Detener){
                        return res;
                    }
                    if(i instanceof Continuar || res instanceof Continuar){
                        return res;
                    }
                }
            }
        } 
        return null;
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}