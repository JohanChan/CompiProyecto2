import { Component } from '@angular/core';
import * as analizador from "src/Clases/Analizar"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TypesTy';
  consola = "";
  codigo = "";
  file:any;
  constructor(){

  }
  abrirArchivo(event: any): void {
    //let archivo = event.target.files[0];
    //console.log(archivo);
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      console.log(this.file);
      const reader = new FileReader();
      reader.onload = e => this.codigo = reader.result as string;
      reader.readAsText(this.file);
    }
  }
  compilar():void{
    this.consola = "";
    let analizar = new analizador.Analizador();
    if(this.codigo != ""){
      let exec = analizar.exec(this.codigo);
      this.consola += exec.consola;
    }
  }
}
