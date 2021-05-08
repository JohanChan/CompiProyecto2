import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaz/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";
import Continuar from "./SentenciaTransferencia/Continuar";

export default class Metodo extends Simbolos implements Instruccion{
    public listadosInstrucciones: Array<Instruccion>;
    public fila: number;
    public columna: number;
    
    constructor(Simbolo: number, tipo: Tipo, id: string, listaParametros: any, metodo: any,listaInstrucciones: any, fila: number,columna: number){
        super(Simbolo, tipo, id, null, listaParametros, metodo);
        this.listadosInstrucciones = listaInstrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    agregarSimbolFunc(controlador: Controlador, tabla: TablaSimbolos){
        if(!(tabla.existe(this.identificador))){
             
            tabla.agregar(this.identificador, this);
        }else{

        }
    }
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        let tablaLocal = new TablaSimbolos(tabla);
        
        for(let instruccion of this.listadosInstrucciones){
            let a = instruccion.ejecutar(controlador, tablaLocal);
            if(a!=null){
                return a;
            }
            if(instruccion instanceof Continuar){
                console.log("No se puede ");
            }
        }
        return null;
    }
    
    recorrer(): Nodo {
        let raiz = new Nodo("Funcion","");
        raiz.agregarHijo(new Nodo(this.tipo.stype,""));
        raiz.agregarHijo(new Nodo(this.identificador,""));

        raiz.agregarHijo(new Nodo("(",""));

        raiz.agregarHijo(new Nodo(")",""));
        raiz.agregarHijo(new Nodo("{",""));

        let instruccion = new Nodo("Instrucciones","");
        for(let i of this.listadosInstrucciones){
            instruccion.agregarHijo(i.recorrer());
        }

        raiz.agregarHijo(instruccion);
        raiz.agregarHijo(new Nodo("}",""));

        return raiz;
    }
    
}