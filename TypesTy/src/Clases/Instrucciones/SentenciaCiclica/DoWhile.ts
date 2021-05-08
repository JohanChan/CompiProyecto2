import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Continuar from "../SentenciaTransferencia/Continuar";
import Detener from "../SentenciaTransferencia/Detener";

export default class DoWhile implements Instruccion{

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
            sig:
            do{
                let tablaLocal = new TablaSimbolos(tabla);

                for(let i of this.listadoInstrucciones){
                    let r = i.ejecutar(controlador,tablaLocal);
                    if(i instanceof Detener || r instanceof Detener){
                        return r;
                    }
                    if(i instanceof Continuar || r instanceof Continuar){
                        continue sig;
                    }                    
                }
            }while(this.condicion.getValor(controlador,tabla));
        }
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        let raiz = new Nodo('Do While','');
        raiz.agregarHijo(new Nodo('{',''));

        for(let i of this.listadoInstrucciones){
            raiz.agregarHijo(i.recorrer());
        }

        raiz.agregarHijo(new Nodo('}',''));

        raiz.agregarHijo(new Nodo('(',''));
        raiz.agregarHijo(this.condicion.recorrer());

        raiz.agregarHijo(new Nodo(')',''));
        return raiz;
    }
    
}