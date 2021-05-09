import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaz/Expresion";
import { Instruccion } from "src/Clases/Interfaz/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";

export default class Retonar implements Instruccion{
    
    public retorno: Expresion;

    constructor(retorno){
        this.retorno = retorno;
    }
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        if(this.retorno != null){

            return this.retorno.getValor(controlador, tabla);
        }else{
            return this;
        }
    }
    recorrer(): Nodo {
        let raiz = new Nodo('Return','');
        if(this.retorno != null){
            raiz.agregarHijo(this.retorno.recorrer());
        }
        return raiz;
    }
    
}