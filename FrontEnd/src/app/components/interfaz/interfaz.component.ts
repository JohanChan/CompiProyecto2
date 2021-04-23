import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { element } from 'protractor';
import { count } from 'console';
import { read } from 'node:fs';
import * as analizador from "src/Clases/Analizar"

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})
export class InterfazComponent implements OnInit {
  codigo = "";
  file: any;
  consola = "";
  constructor() { 

  }

  ngOnInit(): void {
  }

  printTexto(){
    console.log("Pusheando boton");
    console.log(this.codigo);
  }
  abrirArchivo(event: any): void {
    let archivo = event.target.files[0];
    console.log(archivo);
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.codigo = reader.result as string;
      reader.readAsText(this.file);
    }
  }
  compilar():void{
    let analizar = new analizador.Analizador();
    
    if(this.codigo != ""){
      let exec = analizar.exec(this.codigo);
    }
  }
}