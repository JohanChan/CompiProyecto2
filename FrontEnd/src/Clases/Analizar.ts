const parser = require('../Analizador/gramatica');
import { parse } from "node:path";
import Controlador from "./controlador";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";


export class Analizador{
    public exec(entrada:any):any{
        console.log('Puta que oferton');
        try {
            //let salida = sintactico.parse(input);
            let ast = parser.parse(entrada);
            //let controlado = new Controlador();
            //let ts_global = new TablaSimbolos(null);

            //ast.ejecutar(controlado, ts_global);

            //let ts_html = controlado.graficar_ts(controlado,ts_global);

            //let retorno = { "errores" : controlado.errores, "ts" : ts_html, "consola" : controlado.consola}
            return ast;
        } catch (error) {
            console.log("Ocurrio un error al analizar la entrada");
            return "Ocurrio un error al analizar"
        }
    }
}