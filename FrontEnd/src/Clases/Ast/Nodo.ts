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

}