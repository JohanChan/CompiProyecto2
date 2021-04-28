import Tipo from "./Tipo"

export default class Simbolos{

    public simbolo: number;
    public tipo: Tipo;
    public identificador: string;
    public valor: any;

    public listaParams: Array<Simbolos>;
    public metodo: boolean;

    constructor(simbolo: number, tipo: Tipo, identificador: string, valor: any, listaParams?, metodo?){
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.listaParams = listaParams;
        this.metodo = metodo;
    }

    setValor(valor: any){
        this.valor = valor;
    }

    getValor(): any{
        return this.valor;
    }
}