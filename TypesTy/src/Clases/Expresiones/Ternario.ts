import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Ternario implements Expresion{

    public condicion: Expresion;
    public verdadero: Expresion;
    public falso: Expresion;
    public fila: number;
    public columna: number;

    constructor(condicion,verdadero,falso,fila,columna){
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.fila = fila;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, tabla: TablaSimbolos): tipo {
        let valor = this.condicion.getValor(controlador,tabla);
        
        if(typeof valor === 'boolean'){
            return valor ? this.verdadero.getTipo(controlador,tabla) : this.falso.getTipo(controlador,tabla);
        }else{

        }
        //throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, tabla: TablaSimbolos) {
        let valor = this.condicion.getValor(controlador,tabla);
        
        if(typeof valor === 'boolean'){
            return valor ? this.verdadero.getValor(controlador,tabla) : this.falso.getValor(controlador,tabla);
        }else{
            
        }
        //throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        let raiz = new Nodo('Ternario','');
        raiz.agregarHijo(this.condicion.recorrer());
        raiz.agregarHijo(new Nodo('?',''));        
        raiz.agregarHijo(this.verdadero.recorrer());
        raiz.agregarHijo(new Nodo(':',''));
        raiz.agregarHijo(this.falso.recorrer());
        return raiz;
    }
    
}