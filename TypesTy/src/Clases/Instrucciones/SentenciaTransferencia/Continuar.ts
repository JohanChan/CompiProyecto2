import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";

export default class Continuar implements Instruccion{
    
    constructor(){}
    
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        return this;
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        return new Nodo('CONTINUE','');
    }
    
}