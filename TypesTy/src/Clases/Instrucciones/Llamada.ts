import { Expression } from "@angular/compiler";
import { Container } from "@angular/compiler/src/i18n/i18n_ast";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import Aritmentica from "../Expresiones/Aritmetica";
import Identificador from "../Expresiones/Identificador";
import { Expresion } from "../Interfaz/Expresion";
import { Instruccion } from "../Interfaz/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Declaracion from "./Declaracion";
import Metodo from "./Metodo";
import Retornar from "./SentenciaTransferencia/Retornar";

export default class Llamada implements Instruccion, Expresion{

    public id: string;
    public fila: number;
    public columna: number;
    public parametros: Array<Expresion>;

    constructor(id, fila, columna, parametros){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.parametros = parametros;
    }
    getTipo(controlador: Controlador, tabla: TablaSimbolos): tipo {
        let tipito = tabla.getSimbolo(this.id) as Metodo
        //console.log(tipito.tipo.type, tipito.tipo.stype);
        return tipito.tipo.type;
    }

    getValor(controlador: Controlador, tabla: TablaSimbolos) {
        let p = tabla.getSimbolo(this.id) as Metodo;
        console.log(p.listadosInstrucciones);
        let tablaLocal = new TablaSimbolos(tabla);
        if(this.esMismoMetodo(p,controlador,tablaLocal)){
            for(let i of p.listadosInstrucciones){
                if( i instanceof Retornar){
                    i.ejecutar(controlador,tabla); 
                    //console.log(i.retorno.getValor);
                    return i.retorno;     
                }
            }  
        }
      

        /*if(tabla.existe(this.id)){
            //let tablaLocal = new TablaSimbolos(tabla);
            let simbolo = tabla.getSimbolo(this.id) as Metodo;
            console.log(simbolo.listadosInstrucciones);
            if(this.esMismoMetodo(simbolo, controlador, tabla)){
                for(let i of simbolo.listadosInstrucciones){
                    if( i instanceof Retornar){
                        let r = i.ejecutar(controlador,tabla); 
                        if( r!= null){
                            return r;
                        } 
                    }
                }
              
            }   
        }else{
            console.log(this.id);
        }*/
    }

    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        if(tabla.existe(this.id)){
            let tablaLocal = new TablaSimbolos(tabla);
            let simbolo = tabla.getSimbolo(this.id) as Metodo;
            //console.log(simbolo.listadosInstrucciones);
            if(this.esMismoMetodo(simbolo, controlador, tablaLocal)){
                let r = simbolo.ejecutar(controlador,tablaLocal);              
                    if( r!= null){
                        return r;
                    }                
            }else{
                controlador.append('No es el mismo metodo');
            }
        }else{
            console.log(this.id);
        }
    }

    esMismoMetodo (simbolo: Metodo, controlador, tablaLocal: TablaSimbolos): boolean{
        let contador = 0;
        if(this.parametros.length == simbolo.listaParams.length){
            for(let i= 0; i<this.parametros.length; i++){
                let aux = this.parametros[i].getTipo(controlador,tablaLocal); 
                //console.log(aux);
                let aux2  = simbolo.listaParams[i].tipo; 
                //console.log(aux2);
                if( aux == aux2.type || aux == tipo.DECIMAL && aux2.type == tipo.ENTERO){
                    simbolo.listaParams[i].setValor(this.parametros[i].getValor(controlador,tablaLocal));
                    tablaLocal.agregar(simbolo.listaParams[i].identificador, simbolo.listaParams[i])
                    contador ++;
                }
            }
            if(contador == this.parametros.length){
                return true;
            }else{
                return false;
            }
        }
    }

    recorrer(): Nodo {
        let raiz = new Nodo("Llamada","");
        raiz.agregarHijo(new Nodo(this.id,""));
        raiz.agregarHijo(new Nodo("(",""));
        raiz.agregarHijo(new Nodo(")",""));
        return raiz;
    }
}