import Errores from "./Ast/Errores";
import Simbolos from "./TablaSimbolos/Simbolos";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";
import { tipo } from "./TablaSimbolos/Tipo";

export default class Controlador{
    public errores: Array<Errores>;
    public consola: string;

    constructor(){
        this.errores = new Array<Errores>();
        this.consola = "";
    }

    public append(texto: string){
        this.consola += texto + '\n';
    }

    getValor(simbol: Simbolos):string{
        if(simbol.valor != null){
            return simbol.valor.toString();
        }else{
            return '...';
        }
    }

    getTipo(simbol: any):string{
        return simbol.tipo.stype.toLowerCase();
    }

    getRol(simbol: Simbolos):string{
        let rol: string = '';
        switch(simbol.simbolo){
            case 1:
                rol = "variable";
                break;
            case 2: 
                rol = "funcion";
                break;
            case 3:
                rol = "metodo";
                break;
            case 4:
                rol = "vector";
                break;
            case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro";
                break;                
        }
        return rol;
    }

    getAmbito():string{
        return 'global';
    }

    parametros(simbol:any){
        if(simbol.listaParams != undefined){
            return simbol.listaParams.length;
        }else{
            return '...';
        }
    }

    graficar(controlador: Controlador, tabla: TablaSimbolos){
        var cadena = "<thead><tr><td colspan=\"6\">Tabla de Simbolos</td></tr><tr><th>Rol</th><th>Nombre</th><th>Tipo</th><th>Ambito</th><th>Valor</th><th>Parametros</th></tr></thead>";
        while(tabla != null){
            for(let simbolo of tabla.tabla.values()){
                console.log();
                cadena += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" +  this.getRol(simbolo) + "</th><td>" + simbolo.identificador + 
                "</td><td>" + this.getTipo(simbolo) +"</td>"  + 
                "</td><td>" + this.getAmbito() + 
                "</td><td>" + this.getValor(simbolo) + 
                "</td><td>" + this.parametros(simbolo) +"</td>" +  "</tr>";
            }
            tabla = tabla.ant;
        }
        return cadena;
    }
}