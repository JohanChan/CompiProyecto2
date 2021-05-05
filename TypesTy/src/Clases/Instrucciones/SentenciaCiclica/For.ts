import { Expression } from "@angular/compiler";
import { type } from "node:os";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import Simbolos from "src/Clases/TablaSimbolos/Simbolos";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Declaracion from "../Declaracion";

export default class For implements Instruccion{
    public inicio: Simbolos;
    public condicion: Expresion;
    public listadoInstrucciones: Array<Instruccion>;
    public fila: number;
    public columna: number;
    public numero: Expresion;

    constructor(inicio, condicion, listadoInstrucciones, numero ,fila, columna){
        this.inicio = inicio;
        this.condicion = condicion;
        this.listadoInstrucciones = listadoInstrucciones;
        this.fila = fila;
        this.columna = columna;
        this.numero = numero;
    }
    
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        //throw new Error("Method not implemented.");
        let val = this.condicion.getValor(controlador,tabla);
        let ide = this.inicio.identificador;
        let valor = this.inicio.valor;

        console.log(ide,valor);
        /*if(typeof val === 'boolean'){
        }*/
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}