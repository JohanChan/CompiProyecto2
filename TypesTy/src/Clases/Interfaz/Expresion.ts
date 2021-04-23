import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export interface Expresion{
    
    getTipo(controlador: Controlador, tabla : TablaSimbolos): tipo;

    getValor(controlador: Controlador, tabla: TablaSimbolos): any;

    recorrer():Nodo;
}