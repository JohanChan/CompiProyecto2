const analizador = require('../Analizador/gramatica');
import { parse } from "node:path";
import Controlador from "./Controlador";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";


export class Analizador{

    public exec(entrada:any):any{
        try {
            //let salida = sintactico.parse(input);
            
            let ast = analizador.parse(entrada);
            console.log(ast);
            let controlador = new Controlador();
            let tablaGlobal = new TablaSimbolos(null as any);
            ast.ejecutar(controlador, tablaGlobal);
            let retorno = {"consola" : controlador.consola}
            return retorno;
        } catch (error) {
            console.log("Ocurrio un error al analizar la entrada");
            return "Ocurrio un error al analizar"
        }
    }
    
}