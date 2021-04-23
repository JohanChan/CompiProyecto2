import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { Instruccion } from "../Interfaz/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class Print implements Instruccion{
        public expresion: Expresion;
        public fila: number;
        public columna: number;

        constructor(expresion: any, fila: any, columna: any){
            this.expresion = expresion;
            this.fila = fila;
            this.columna = columna;
        }

        ejecutar(Controlador: Controlador, tabla: TablaSimbolos){
            
            let valor = this.expresion.getValor(Controlador,tabla);
            console.log(`Imprimiendo ${valor}`);
            Controlador.append(valor);

            return null;
        }

        recorrer(): Nodo{
            throw new Error("Metodo no implementado");
        }
}