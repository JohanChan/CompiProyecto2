import { type } from "node:os";
import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";


export default class Aritmentica extends Operacion implements Expresion{

    public constructor(expresionIzq, operador, expresionDer, fila, columna, esUnario){
        super(expresionIzq,operador,expresionDer,fila,columna,esUnario);    
    }

    getTipo(controlador: Controlador, tabla: TablaSimbolos):tipo{
        let valor = this.getValor(controlador,tabla);

        if(typeof valor === 'number'){
            return tipo.DECIMAL;
        }else if(typeof valor === 'boolean'){
            return tipo.BOOLEANO
        }else if(typeof valor === 'string'){
            return tipo.CADENA
        }
    }
    getValor(controlador: Controlador, tabla: TablaSimbolos){
        let valorIzq;
        let valorDer;
        let valorUnario;

        if(this.esUnario == false){
            valorIzq = this.expresionIzq.getValor(controlador,tabla);
            valorDer = this.expresionDer.getValor(controlador,tabla);
        }else{
            valorUnario = this.expresionIzq.getValor(controlador,tabla);
        }

        switch(this.operador){
            case Operador.SUMA:
                if(typeof valorIzq === 'number'){
                    if(typeof valorDer === 'number'){
                        return valorIzq + valorDer;
                    }else if(typeof valorDer === 'boolean'){
                        let numero = 1;
                        if(valorDer == false){
                            numero = 0;
                        }
                        return valorIzq + numero;
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            let letra = valorDer.charCodeAt(0);
                            return valorIzq + letra;
                        }else{
                            return valorIzq + valorDer; 
                        }
                    }
                }else if(typeof valorIzq === 'boolean'){
                    if(typeof valorDer === 'number'){
                        let numero = 0;
                        if(valorIzq == true){
                            numero = 1;
                        }
                        return numero + valorDer;
                    }else if(typeof valorDer === 'boolean'){
                        controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden sumar, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden sumar`,this.fila, this.columna));
                        // Error semantico
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length != 1){
                            return valorIzq + valorDer;
                        }else{
                            controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden sumar, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden sumar`,this.fila, this.columna));
                        }
                    }
                }else if(typeof valorIzq === 'string'){
                    //return valorIzq + valorDer;
                        if(valorIzq.length == 1){
                            if(typeof valorDer === 'number'){
                                return valorIzq + valorDer;
                            }else if (typeof valorDer === 'boolean'){
                                controlador.append(`Error semantico: La variable ${valorIzq} tipo char no se puede sumar con variable ${valorDer} tipo boolean, fila: ${this.fila} columna: ${this.columna}`);
                                controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo char no se puede sumar con variable ${valorDer} tipo boolean`,this.fila, this.columna));    
                            }else if(typeof valorDer === 'string'){
                                return valorIzq + valorDer;
                            }
                        }else{
                            return valorIzq + valorDer;
                        }
                }
                break;
                case Operador.UNARIO:
                    if(typeof valorIzq === 'number'){
                        return -valorIzq;
                    }else{
                        controlador.append(`Error semantico: No se puede negar ${valorIzq}, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`No se puede negar ${valorIzq}`,this.fila, this.columna));                        
                    }
                break;
                case Operador.RESTA:
                    if(typeof valorIzq === 'number'){
                        if(typeof valorDer === 'number'){
                            return valorIzq - valorDer;
                        }else if(typeof valorDer === 'boolean'){
                            let numero = 0;
                            if(valorDer == true){
                                numero = 1;
                            }
                            return valorIzq - numero;
                        }else if(typeof valorDer === 'string'){
                            if(valorDer.length == 1){
                                let letra = valorDer.charCodeAt(0);
                                return valorIzq - letra;
                            }else{
                                controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden restar, fila: ${this.fila} columna: ${this.columna}`);
                                controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden restar`,this.fila, this.columna));                                
                            }
                        }
                    }else if(typeof valorIzq === 'boolean'){
                        if(typeof valorDer === 'number'){
                            let numero = 0;
                            if(valorIzq = true){
                                numero = 1;
                            }
                            return numero - valorDer;    
                        }else{
                            controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden restar, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden restar`,this.fila, this.columna));
                        }
                    }else if(typeof valorIzq === 'string'){
                        if(valorIzq.length == 1){
                            let letra = valorIzq.charCodeAt(0);
                            return letra - valorDer;
                        }else{
                            controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden restar, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden restar`,this.fila, this.columna));
                        }
                    }
                break;
                case Operador.MULTI:
                    if(typeof valorIzq === 'number'){
                        if(typeof valorDer === 'number'){
                            return valorIzq * valorDer;
                        }else if(typeof valorDer === 'string'){
                            if(valorDer.length == 1){
                                let letra = valorDer.charCodeAt(0);
                                return valorIzq * letra;
                            }
                        }
                    }else if(typeof valorIzq === 'string'){
                        if(valorIzq.length == 1){
                            if(typeof valorDer === 'number'){
                                let letra = valorIzq.charCodeAt(0);
                                return letra * valorDer;
                            }else{
                                controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden multiplicar, fila: ${this.fila} columna: ${this.columna}`);
                                controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden multiplicar`,this.fila, this.columna));
                            }
                        }
                    }else if(typeof valorIzq === 'boolean'){
                        controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden restar, multiplicar: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden multiplicar`,this.fila, this.columna));
                    }
                break;
                case Operador.DIV:
                    if(typeof valorIzq === 'number'){
                        if(typeof valorDer === 'number'){
                            return valorIzq / valorDer;
                        }else if(typeof valorDer === 'string'){
                            if(valorDer.length == 1){
                                let letra = valorDer.charCodeAt(0);
                                return valorIzq / letra
                            }else{
                              controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden dividir, fila: ${this.fila} columna: ${this.columna}`);
                              controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden dividir`,this.fila, this.columna));
                            }
                        }
                    }else if(typeof valorIzq === 'boolean'){
                        controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden dividir, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden dividir`,this.fila, this.columna));
                    }else if(typeof valorIzq === 'string'){
                        if(typeof valorDer === 'number'){
                            let letra = valorIzq.charCodeAt(0);
                            return letra / valorDer;
                        }else{
                            controlador.append(`Error semantico: La variables ${valorIzq} ${valorDer} no se pueden dividir, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variables ${valorIzq} ${valorDer} no se pueden dividir`,this.fila, this.columna));                            
                        }
                    }
                break;
                case Operador.MOD:
                    if(typeof valorIzq === 'number'){
                        if(typeof valorDer === 'number'){
                            return valorIzq % valorDer;
                        }else{
                            controlador.append(`Error semantico: Se esperaba variable tipo int o double, fila: ${this.fila}, columna: ${this.columna}`)
                            controlador.errores.push(new Errores('Semantico',`Se esperaba variable tipo int o double`,this.fila, this.columna));
                        }
                    }
                break;
                case Operador.POTENCIA:
                    if(typeof valorIzq === 'number'){
                        if(typeof valorDer === 'number'){
                            return Math.pow(valorIzq, valorDer);
                        }else{
                            controlador.append(`Error semantico: Se esperaba variable tipo int o double, fila: ${this.fila}, columna: ${this.columna}`)
                            controlador.errores.push(new Errores('Semantico',`Se esperaba variable tipo int o double`,this.fila, this.columna));
                        }
                    }
                break;
                default:
                    controlador.append(`Error semantico: No se espearaban ${valorIzq} ${valorDer}, ${this.fila} columna: ${this.columna}`);
                    controlador.errores.push(new Errores('Semantico',`No se espearaban ${valorIzq} ${valorDer}`,this.fila, this.columna));    
                break;
                
        }
    }
    recorrer(): Nodo{
        throw new Error("Method not implemented.");
    }
}