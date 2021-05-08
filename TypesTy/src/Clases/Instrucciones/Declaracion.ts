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

            let v = aux.valor.getTipo(controlador, tabla);
            console.log(v, this.type.type)
            if(v == this.type.type || (v == tipo.DECIMAL && this.type.type == tipo.ENTERO) || (v == 4 && this.type.type == 3)){
                let nuevo = new Simbolos(aux.simbolo, this.type, aux.identificador, val);
                console.log(nuevo);
                tabla.agregar(aux.identificador,nuevo)

            }else{
                controlador.errores.push(new Errores('Semantico', `La asignacion no es del mismo tipo`, this.fila, this.columna));
                controlador.append(`Err semantico: La asignacion no es del mismo tipo, fila: ${this.fila}, columna: ${this.columna}`);
            }
        }else{
            let nuevo = new Simbolos(aux.simbolo, this.type, aux.identificador, null);
            tabla.agregar(aux.identificador, nuevo);
        }
    }

    recorrer(): Nodo {
        throw new Error("Metodo no implementado");
    }
}
