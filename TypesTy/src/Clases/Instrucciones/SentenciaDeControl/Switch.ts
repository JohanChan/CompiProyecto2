import { resolveSanitizationFn } from "@angular/compiler/src/render3/view/template";
import { faOtter } from "@fortawesome/free-solid-svg-icons";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Detener";
import Caso from "./Case";

export default class Switch implements Instruccion{
    public valor: Expresion;
    public listadoCasos: Array<Caso>;
    public instruccionesDef: Array<Instruccion>;

    constructor(valor, listadoCasos, instruccionesDef){
        this.valor = valor;
        this.listadoCasos = listadoCasos;
        this.instruccionesDef = instruccionesDef;
    }
    
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        let tablaLocal = new TablaSimbolos(tabla);
        //if(this.valor != null){

            let valorSwitch = this.valor.getValor(controlador,tabla);
    
            if(this.listadoCasos != null){
                for(let casito of this.listadoCasos){
                    if(valorSwitch === casito.condicion.getValor(controlador,tablaLocal)){
                        let resultado = casito.ejecutar(controlador,tablaLocal);    
                        if(casito instanceof Detener || resultado instanceof Detener){
                            return resultado;
                        }                    
                    }
                }
            }

            if(this.instruccionesDef != null){
                for(let ins of this.instruccionesDef){
                    ins.ejecutar(controlador,tablaLocal);
                }
            }
    }
    recorrer(): Nodo {
        let raiz = new Nodo('Switch','');
        raiz.agregarHijo(new Nodo('(',''));
        raiz.agregarHijo(this.valor.recorrer());
        raiz.agregarHijo(new Nodo(')',''));
        raiz.agregarHijo(new Nodo('{',''));
        for(let ins of this.listadoCasos){
            raiz.agregarHijo(ins.recorrer());
        }


        if(this.instruccionesDef != null){
            let rdfa = new Nodo('Default','');
//            raiz.agregarHijo(new Nodo('Default','')); 
            rdfa.agregarHijo(new Nodo('{',''));        
           for(let i of this.instruccionesDef){
            rdfa.agregarHijo(i.recorrer());
            }            
            rdfa.agregarHijo(new Nodo('}',''));
            raiz.agregarHijo(rdfa);
        }

        raiz.agregarHijo(new Nodo('}',''));
        
        return raiz;
        //throw new Error("Method not implemented.");
    }
    
}