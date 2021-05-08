export default class Nodo{
    public token: string;
    public lexema: string;
    public hijos: Array<Nodo>;

    constructor(token: string, lexema: string){
        this.token = token;
        this.lexema = lexema;
        this.hijos = new Array<Nodo>();
    }

    public agregarHijo(nuevo: Nodo):void{
        this.hijos.push(nuevo);
    }

    public getToken(){
        return this.token;
    }

    public GraficarSintactico():string{
        let grafica: string = `digraph {\n\n${this.GraficarNodos(this, "0")} \n\n}`
        return grafica;
    }

    public GraficarNodos(nodo: Nodo, i: string):string{
        let k = 0;
        let r = "";
        let nodoTerm : string = nodo.token;
        nodoTerm = nodoTerm.replace("\"","");
        r = `node${i}[label = \"${nodoTerm}\"];\n`;

        for(let j = 0; j<= nodo.hijos.length - 1; j++){
            r = `${r}node${i} -> node${i}${k}\n`;
            r = r + this.GraficarNodos(nodo.hijos[j], ""+i+k);
            k = k + 1;
        }

        if(!(nodo.lexema.match(''))||!(nodo.lexema.match(""))){
            let nodoToken = nodo.lexema;
            nodoToken = nodoToken.replace("\"","");
            r = r + `node${i}c[label = \"${nodoToken}\"];\n`;
            r = r + `node${i} -> node${i}c\n`;
        }
        return r;
    }

}