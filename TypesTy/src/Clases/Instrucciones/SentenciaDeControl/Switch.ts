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
            console.log("====================");
            console.log(this.instruccionesDef);
            console.log("====================");
            if(this.instruccionesDef != null){
                    console.log("Pooto pero afuera");
                for(let ins of this.instruccionesDef){
                    console.log("Pooto");
                    ins.ejecutar(controlador,tablaLocal);
                }
            }


        //}
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}