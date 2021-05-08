import { Expression } from "@angular/compiler";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import Simbolos from "src/Clases/TablaSimbolos/Simbolos";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Asignacion from "../Asignacion";
import Declaracion from "../Declaracion";
import Continuar from "../SentenciaTransferencia/Continuar";
import Detener from "../SentenciaTransferencia/Detener";

export default class For implements Instruccion{

    public declara: Declaracion;
    public asigna: Asignacion;
    public condicion: Expresion;
    public actualizar: Asignacion;
    public fila: number;
    public columna: number;
    public listadoInstrucciones: Array<Instruccion>;

    constructor(declara, asigna, condicion, actualizar, listadoInstrucciones,fila, columna){
        this.declara = declara;
        this.asigna = asigna;
        this.condicion = condicion;
        this.actualizar = actualizar;
        this.listadoInstrucciones = listadoInstrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        if(this.declara != null){
            let tablaLocal = new TablaSimbolos(tabla);
            let tip = this.declara.type.type;
            if(tip == tipo.ENTERO){
                this.declara.ejecutar(controlador,tablaLocal);
                while(this.condicion.getValor(controlador,tablaLocal)){
                    for(let i of this.listadoInstrucciones){
                        let retorno = i.ejecutar(controlador,tablaLocal);
                        console.log(i instanceof Continuar);
                        if(i instanceof Detener || retorno instanceof Detener){
                            return retorno;
                        }
                        if(i instanceof Continuar || retorno instanceof Continuar){
                            this.actualizar.ejecutar(controlador,tablaLocal);
                        }
                    }
                    this.actualizar.ejecutar(controlador,tablaLocal); 
                }
            }
        }else if(this.asigna != null){
            let tablaLocal = new TablaSimbolos(tabla);
            if(tabla.getSimbolo(this.asigna.id).tipo.type == tipo.ENTERO){
                console.log("Dentro Asignar");
                this.asigna.ejecutar(controlador,tablaLocal);
                while(this.condicion.getValor(controlador,tabla)){
                    for(let i of this.listadoInstrucciones){
                        let retorno = i.ejecutar(controlador,tablaLocal);
                        if(i instanceof Detener || retorno instanceof Detener){
                            return retorno;
                        }else if(i instanceof Continuar){
                            this.actualizar.ejecutar(controlador,tablaLocal);
                        }
                    }
                    this.actualizar.ejecutar(controlador,tablaLocal);
                }
            }
        }

    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
   
}