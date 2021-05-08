import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaz/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Llamada from "./Llamada";

export default class Exec implements Instruccion{

    llamarMetodo: Llamada;
    public fila: number;
    public columna: number;
    
    constructor(llamarMetodo,fila,columna){
        this.llamarMetodo = llamarMetodo;
        this.fila = fila;
        this.columna = columna;
    }
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        this.llamarMetodo.ejecutar(controlador,tabla);
        //throw new Error("Method not implemented.");
    }

    recorrer(): Nodo {
        let raiz = new Nodo('Exec','');
        raiz.agregarHijo(this.llamarMetodo.recorrer());
        return raiz;
    }
    
}