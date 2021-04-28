import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import Exec from "../Instrucciones/Exec";
import Metodo from "../Instrucciones/Metodo";
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
            if(i instanceof Metodo){
                let metodo = i as Metodo;
                metodo.agregarSimbolFunc(controlador,tabla);
            }
        }
        let execActivado = 0;
        for(let i of this.listadoI){
            if(i instanceof Exec && execActivado == 0){
                i.ejecutar(controlador, tabla);
                execActivado = 1;
            }else if(execActivado == 1){
                controlador.append('Error: Exec solo puede venir una vez');
                return;
            }
            if(i instanceof Declaracion){
                i.ejecutar(controlador, tabla);
            }
        }
    }
    
    recorrer(): Nodo {
        throw new Error("Metodo no implementado");
    }
    
}