import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export enum Operador{
    SUMA,
    RESTA,
    MULTI,
    DIV,
    MENORQ,
    MAYORQ,
    MENORIGUAL,
    MAYORIGUAL,
    OR,
    AND,
    NOT,
    UNARIO,
    POTENCIA,
    MOD,
    COMPARAR,
    DIFERENTE
}

export default class Operacion implements Expresion{
    
    public expresionIzq: Expresion;
    public expresionDer: Expresion;
    public esUnario: boolean;
    public operador: Operador;
    public fila: number;
    public columna: number;

    constructor(expresionIzq, operador, expresionDer, fila, columna, esUnario){
        this.columna = columna;
        this.esUnario = esUnario;
        this.expresionDer = expresionDer;
        this.expresionIzq = expresionIzq;
        this.fila = fila;
        this.operador = this.getOperador(operador);
    }
    

    getOperador(auxoperador: string): Operador{
        switch(auxoperador){
            case '+':  return Operador.SUMA; break;
            case '-': return Operador.RESTA; break;
            case '*': return Operador.MULTI; break;
            case '/': return Operador.DIV; break;
            case '<': return Operador.MENORQ; break;
            case '>': return Operador.MAYORQ; break;
            case '<=': return Operador.MENORIGUAL; break;
            case '>=': return Operador.MAYORIGUAL; break;
            case '||': return Operador.OR; break;
            case '&&': return Operador.AND; break;
            case '!': return Operador.NOT; break;
            case 'UNARIO': return Operador.MAYORIGUAL; break;
            case '%': return Operador.MOD; break;
            case '^': return Operador.POTENCIA; break;
            case '==': return Operador.COMPARAR; break;
            case '!=': return Operador.DIFERENTE; break;
        }

    }
    getTipo(controlador: Controlador, tabla: TablaSimbolos): tipo {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, tabla: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}