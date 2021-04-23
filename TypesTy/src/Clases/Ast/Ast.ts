import Controlador from "../Controlador";
import { Instruccion } from "../Interfaz/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion{
    public listadoI: Array<Instruccion>;
    
    constructor(listadoI: any){
        this.listadoI = listadoI;
    }
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        for(let i of this.listadoI){
            i.ejecutar(controlador, tabla);
        }
    }
    
    recorrer(): Nodo {
        throw new Error("Metodo no implementado");
    }
    
}