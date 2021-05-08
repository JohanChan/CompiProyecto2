import { type } from "node:os";
import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Relacional extends Operacion implements Expresion{
    public constructor(expresionIzq: Expresion, operador: string, expresionDer: Expresion, fila: number,columna:number, esUnario: boolean){
        super(expresionIzq, operador, expresionDer, fila,columna, esUnario);
    }

    getTipo(controlador: Controlador, tabla: TablaSimbolos): tipo{
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
            valorIzq = this.expresionIzq.getValor(controlador,tabla);
            valorDer = this.expresionDer.getValor(controlador,tabla);            
        }else{
            valorUnario = this.expresionIzq.getValor(controlador,tabla);
        }

        switch(this.operador){
            case Operador.COMPARAR: 
                if(typeof valorIzq === 'number'){
                    if(typeof valorDer === 'number'){
                        return valorIzq == valorDer;
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            let letra = valorDer.charCodeAt(0);
                            return valorIzq == letra;
                        }else{
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo double/int no se puede comparar con variable ${valorDer} tipo string, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo double/int no se puede comparar con variable ${valorDer} tipo string`,this.fila, this.columna));    
                        }
                    }else if(typeof valorDer === 'boolean'){
                        let num = 0;
                        if(valorDer == true){
                            num = 1;
                        }
                        return valorIzq == num;
                    }
                }else if(typeof valorIzq == 'boolean'){
                    if(typeof valorDer === 'boolean'){
                        return valorIzq == valorDer;
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo boolean no se puede comparar con variable ${valorDer} que no sea boolean, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo boolean no se puede comparar con variable ${valorDer} que no sea boolean`,this.fila, this.columna));    
                    }
                }else if(typeof valorIzq === 'string'){
                    if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede comparar con variable ${valorDer} tipo char, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede comparar con variable ${valorDer} tipo char`,this.fila, this.columna));    
                        }else{
                            return valorIzq == valorDer;
                        }
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede comparar con variable ${valorDer} que no sea string, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede comparar con variable ${valorDer} que no sea string`,this.fila, this.columna));                            
                    }                    
                }
            break;
            case Operador.DIFERENTE:
                if(typeof valorIzq === 'number'){
                    if(typeof valorDer === 'number'){
                        return valorIzq != valorDer;
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            let letra = valorDer.charCodeAt(0);
                            return valorIzq != letra;
                        }else{
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo double/int no se puede diferenciar con variable ${valorDer} tipo string, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo double/int no se puede diferenciar con variable ${valorDer} tipo string`,this.fila, this.columna));    
                        }
                    }else if(typeof valorDer === 'boolean'){
                        let num = 0;
                        if(valorDer == true){
                            num = 1;
                        }
                        return valorIzq != num;
                    }
                }else if(typeof valorIzq == 'boolean'){
                    if(typeof valorDer === 'boolean'){
                        return valorIzq != valorDer;
                    }else {
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo boolean no se puede comparar con variable ${valorDer} que no sea boolean, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo boolean no se puede comparar con variable ${valorDer} que no sea boolean`,this.fila, this.columna));    
                    }
                }else if(typeof valorIzq === 'string'){
                    if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede diferenciar con variable ${valorDer} tipo char, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede diferenciar con variable ${valorDer} tipo char`,this.fila, this.columna));    
                        }else{
                            return valorIzq != valorDer;
                        }
                    }else {
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede diferenciar con variable ${valorDer} que no sea string, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede diferenciar con variable ${valorDer} que no sea string`,this.fila, this.columna));                            
                    }
                }
            break;
            case Operador.MAYORIGUAL:
                if(typeof valorIzq === 'number'){
                    if(typeof valorDer === 'number'){
                        return valorIzq >= valorDer;
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            let letra = valorDer.charCodeAt(0);
                            return valorIzq >= letra;
                        }else{
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo double/int no se puede aplicar Mayor igual que con variable ${valorDer} tipo string, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo double/int no se puede aplicar Mayor igual que con variable ${valorDer} tipo string`,this.fila, this.columna));    
                        }
                    }else if(typeof valorDer === 'boolean'){
                        let num = 0;
                        if(valorDer == true){
                            num = 1;
                        }
                        return valorIzq >= num;
                    }
                }else if(typeof valorIzq == 'boolean'){

                    if(typeof valorDer === 'boolean'){
                        return valorIzq >= valorDer;
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo boolean no se puede aplicar Mayor igual con variable ${valorDer} que no sea boolean, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo boolean no se puede comparar con variable ${valorDer} que no sea boolean`,this.fila, this.columna));    
                    }
                }else if(typeof valorIzq === 'string'){
                    if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Mayor igual que con variable ${valorDer} tipo char, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Mayor igual que con variable ${valorDer} tipo char`,this.fila, this.columna));    
                        }else{
                            return valorIzq >= valorDer;
                        }
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Mayor igual que con variable ${valorDer} que no sea string, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Mayor igual que con variable ${valorDer} que no sea string`,this.fila, this.columna));                            
                    }
                }
            break;
            case Operador.MAYORQ:
                if(typeof valorIzq === 'number'){
                    if(typeof valorDer === 'number'){
                        return valorIzq > valorDer;
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            let letra = valorDer.charCodeAt(0);
                            return valorIzq > letra;
                        }else{
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo double/int no se puede aplicar Mayor que con variable ${valorDer} tipo string, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo double/int no se puede aplicar Mayor que con variable ${valorDer} tipo string`,this.fila, this.columna));    
                        }
                    }else if(typeof valorDer === 'boolean'){
                        let num = 0;
                        if(valorDer == true){
                            num = 1;
                        }
                        return valorIzq > num;
                    }
                }else if(typeof valorIzq == 'boolean'){
                    if(typeof valorDer === 'boolean'){
                        return valorIzq > valorDer;
                    }else {
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo boolean no se puede aplicar Mayor que con variable ${valorDer} que no sea boolean, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo boolean no se puede aplicar Mayor que con variable ${valorDer} que no sea boolean`,this.fila, this.columna));    
                        
                    }
                }else if(typeof valorIzq === 'string'){
                    if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Mayor que con variable ${valorDer} tipo char, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Mayor que con variable ${valorDer} tipo char`,this.fila, this.columna));    
                        }else{
                            return valorIzq > valorDer;
                        }
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Mayor que con variable ${valorDer} que no sea string, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Mayor que con variable ${valorDer} que no sea string`,this.fila, this.columna));    
                    }
                }                
            break;
            case Operador.MENORQ:
                if(typeof valorIzq === 'number'){
                    if(typeof valorDer === 'number'){
                        return valorIzq < valorDer;
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            let letra = valorDer.charCodeAt(0);
                            return valorIzq < letra;
                        }else{
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo double/int no se puede aplicar Menor que con variable ${valorDer} tipo string, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo double/int no se puede aplicar Menor que con variable ${valorDer} tipo string`,this.fila, this.columna));    
                        }
                    }else if(typeof valorDer === 'boolean'){
                        let num = 0;
                        if(valorDer == true){
                            num = 1;
                        }
                        return valorIzq < num;
                    }
                }else if(typeof valorIzq == 'boolean'){
                    if(typeof valorDer === 'boolean'){
                        return valorIzq < valorDer;
                    }else {
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Menor que con variable ${valorDer} que no sea boolean, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Menor que con variable ${valorDer} que no sea boolean`,this.fila, this.columna));    
                }
                }else if(typeof valorIzq === 'string'){
                    if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Menor que con variable ${valorDer} tipo char, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Menor que con variable ${valorDer} tipo char`,this.fila, this.columna));    
                        }else{
                            return valorIzq < valorDer;
                        }
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Menor que con variable ${valorDer} que no sea string, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Menor que con variable ${valorDer} que no sea string`,this.fila, this.columna));    
                    }
                }
            break;
            case Operador.MENORIGUAL:
                if(typeof valorIzq === 'number'){
                    if(typeof valorDer === 'number'){
                        return valorIzq <= valorDer;
                    }else if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            let letra = valorDer.charCodeAt(0);
                            return valorIzq <= letra;
                        }else{
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo double/int no se puede aplicar Menor igual que con variable ${valorDer} tipo string, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo double/int no se puede aplicar Menor igual que con variable ${valorDer} tipo string`,this.fila, this.columna));    
                        }
                    }else if(typeof valorDer === 'boolean'){
                        let num = 0;
                        if(valorDer == true){
                            num = 1;
                        }
                        return valorIzq <= num;
                    }
                }else if(typeof valorIzq == 'boolean'){
                    if(typeof valorDer === 'boolean'){
                        return valorIzq <= valorDer;
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo boolean no se puede aplicar Menor igual que con variable ${valorDer} que no sea boolean, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo boolean no se puede aplicar Menor igual que con variable ${valorDer} que no sea boolean`,this.fila, this.columna));    
                        
                    }
                }else if(typeof valorIzq === 'string'){
                    if(typeof valorDer === 'string'){
                        if(valorDer.length == 1){
                            controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Menor igual que con variable ${valorDer} tipo char, fila: ${this.fila} columna: ${this.columna}`);
                            controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Menor igual que con variable ${valorDer} tipo char`,this.fila, this.columna));    
                        }else{
                            return valorIzq <= valorDer;
                        }
                    }else{
                        controlador.append(`Error semantico: La variable ${valorIzq} tipo string no se puede aplicar Menor igual que con variable ${valorDer} que no sea string, fila: ${this.fila} columna: ${this.columna}`);
                        controlador.errores.push(new Errores('Semantico',`La variable ${valorIzq} tipo string no se puede aplicar Menor igual que con variable ${valorDer} que no sea string`,this.fila, this.columna));                            
                    }
                }
            break;
        }
    }
    recorrer():Nodo{
        let raiz = new Nodo('Relacional','');
        raiz.agregarHijo(this.expresionIzq.recorrer());
        raiz.agregarHijo(new Nodo(this.operadorStr,''));
        raiz.agregarHijo(this.expresionDer.recorrer());
        return raiz;
    }
}