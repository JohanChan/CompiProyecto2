import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Logica extends Operacion implements Expresion{

    public constructor(expresionIzq: Expresion, operador: string, expresionDer: Expresion, fila: number, columna: number, esUnario: boolean){
        super(expresionIzq,operador,expresionDer,fila,columna,esUnario);
    }
    getTipo(controlador: Controlador, tabla: TablaSimbolos):tipo{
        let aux = this.getValor(controlador,tabla);

        if(typeof aux === 'number'){
            return tipo.DECIMAL;
        }else if(typeof aux === 'string'){
            return tipo.CADENA;
        }else if(typeof aux === 'boolean'){
            return tipo.BOOLEANO;
        }
    }

    getValor(controlador: Controlador, tabla: TablaSimbolos){
        let valorIzq;
        let valorDer;
        let valorUnario;
        
        if(this.esUnario == false){
            valorIzq = this.expresionIzq.getValor(controlador, tabla);
            console.log('Entre al getValor');
            valorDer = this.expresionDer.getValor(controlador, tabla);
        }else{
            valorUnario = this.expresionIzq.getValor(controlador, tabla);
            
        }
        switch(this.operador){
            case Operador.AND:
                if(typeof valorIzq === 'boolean'){
                    if(typeof valorDer === 'boolean'){
                        return valorIzq && valorDer;
                    }else{
                        controlador.errores.push(new Errores('Error Semantico',`variable ${valorDer} no es del mismo tipo`,this.fila, this.columna));
                        controlador.append(`Error Semantico: variable ${valorDer} no es del mismo tipo, fila: ${this.fila}, columna: ${this.columna}`);
                    }
                }
            break;
            case Operador.OR:
                if(typeof valorIzq === 'boolean'){
                    if(typeof valorDer === 'boolean'){
                        return valorIzq || valorDer;
                    }else{
                        controlador.errores.push(new Errores('Error Semantico',`variable ${valorDer} no es del mismo tipo`,this.fila, this.columna));
                        controlador.append(`Error Semantico: variable ${valorDer} no es del mismo tipo, fila: ${this.fila}, columna: ${this.columna}`);
                    }
                }
            break;
            case Operador.NOT:
                
                if(typeof valorUnario === 'boolean'){
                    return !valorUnario
                    
                }else{
                    controlador.errores.push(new Errores('Error Semantico',`variable ${valorUnario} no es de tipo boolean`,this.fila, this.columna));
                    controlador.append(`Error Semantico: variable ${valorUnario} no es de tipo boolean, fila: ${this.fila}, columna: ${this.columna}`);
                }
            break;
            default:
                //controlador.errores.push(new Errores('Error Semantico',`variable ${valorDer} no es de tipo boolean`,this.fila, this.columna));
                //controlador.append(`Error Semantico: variable ${valorDer} no es de tipo boolean, fila: ${this.fila}, columna: ${this.columna}`);                
            break;
        }
    }

    recorrer():Nodo{
        let raiz = new Nodo('Logica','');

        if(this.esUnario){ //Si es negativo
            raiz.agregarHijo(new Nodo(this.operadorStr, ""));
            raiz.agregarHijo(this.expresionIzq.recorrer());
        } else { //Si es positivo
            raiz.agregarHijo(this.expresionIzq.recorrer());
            raiz.agregarHijo(new Nodo(this.operadorStr, ""));
            raiz.agregarHijo(this.expresionDer.recorrer());
        }
        return raiz;
    }
}