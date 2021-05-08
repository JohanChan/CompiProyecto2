import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaz/Expresion";
import { Instruccion } from "../Interfaz/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class Asignacion implements Instruccion{

    public id: string;
    public valor: Expresion;
    public fila: number;
    public columna: number;

    constructor(id: string, valor: Expresion, fila: number, columna:number){
        this.columna= columna;
        this.fila= fila;
        this.id= id;
        this.valor= valor;
    }
    ejecutar(controlador: Controlador, tabla: TablaSimbolos) {
        if(tabla.existe(this.id)){
            let aux = this.valor.getValor(controlador,tabla);
            console.log(aux);
            let atipo = this.valor.getTipo(controlador, tabla);
            let auxTipo = tabla.getSimbolo(this.id)?.tipo;
            //console.log(auxTipo.type, atipo);
            if(auxTipo?.type === atipo || (auxTipo?.stype === 'ENTERO' && atipo === 1) || (auxTipo.type == 3 && atipo == 4)){
                tabla.getSimbolo(this.id)?.setValor(aux);
            }else{
                controlador.errores.push(new Errores('Semantico',`Valor a asignar no es compatible con ${this.id}`,this.fila, this.columna));
                controlador.append(`Error Semantico: Valor a asignar no es compatible con ${this.id}, fila: ${this.fila} columna: ${this.columna}`);
            }
        }else{
            controlador.errores.push(new Errores('Semantico',`Variable ${this.id} no existe`,this.fila, this.columna));
            controlador.append(`Error Semantico: Variable ${this.id} no existe, fila: ${this.fila} columna: ${this.columna}`);
        }
    }

    recorrer(): Nodo {
        let raiz = new Nodo('Asignacion','');
        raiz.agregarHijo(new Nodo(this.id,''),);
        raiz.agregarHijo(new Nodo('=',''));        
        raiz.agregarHijo(this.valor.recorrer());
        return raiz;
        
        //throw new Error("Method not implemented.");
    }

    
}