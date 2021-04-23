import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaz/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, {tipo} from "../TablaSimbolos/Tipo"

export default class Declaracion implements Instruccion{
    public type: Tipo;
    public tip: string = "";
    public simbolo: Simbolos;
    public fila:number;
    public columna: number;

    constructor(type: any, simbolo: any, fila:number, columna:number){
        this.columna=columna;
        this.fila=fila;
        this.simbolo=simbolo;
        this.type = type;
    }

    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        let aux = this.simbolo;

        if(tabla.existeEnActual(aux.identificador)){
            let err = new Errores('Semantico', `La variable ${aux.identificador} existe en el entorno actual`, this.fila, this.columna);
            controlador.errores.push(err);
            controlador.append(`Err semantico: La variable ${aux.identificador} existe en el entorno actual, fila: ${this.fila}, columna: ${this.columna}`);
            
        }

        if(aux.valor != null){
            let val = aux.valor.getValor(controlador, tabla);

            let tipVal = aux.valor.getTipo(controlador, tabla);
            console.log(tipVal, this.type.type);
            if(tipVal == this.type.type || (tipVal )){

            }
        }
    }
    recorrer(): Nodo {
        throw new Error("Metodo no implementado");
    }
}
