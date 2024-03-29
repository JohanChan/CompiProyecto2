import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Continuar from "../SentenciaTransferencia/Continuar";
import Detener from "../SentenciaTransferencia/Detener";
import Retonar from "../SentenciaTransferencia/Retornar";

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
                    if(i instanceof Retonar || res instanceof Retonar){
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
                    if(i instanceof Retonar || res instanceof Retonar){
                        return res;
                    }
                }
            }
        } 
        return null;
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        let raiz = new Nodo('If','');

        raiz.agregarHijo(new Nodo('(',''));
        raiz.agregarHijo(this.condicion.recorrer());
        raiz.agregarHijo(new Nodo(')',''));
        raiz.agregarHijo(new Nodo('{',''));
        for(let i of this.listadoIf){
            raiz.agregarHijo(i.recorrer());
        }
        raiz.agregarHijo(new Nodo('}',''));
        if(this.listadoElse != null){
            let raux = new Nodo('Else','');
            //raiz.agregarHijo(new Nodo('Else',''));
            raux.agregarHijo(new Nodo('{',''));
            for(let i of this.listadoElse){
                raux.agregarHijo(i.recorrer());
            }
            raux.agregarHijo(new Nodo('}',''));
            raiz.agregarHijo(raux);
        }

        return raiz;
        
        //throw new Error("Method not implemented.");
    }
    
}