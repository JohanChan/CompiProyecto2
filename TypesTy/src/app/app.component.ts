import { Component } from '@angular/core';
import * as analizador from "src/Clases/Analizar"
import { graphviz } from "d3-graphviz";
import { wasmFolder } from "@hpcc-js/wasm";
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
      document.getElementById("tablasimbols").innerHTML = exec.tabla;
    }
  }
  
  openPage(pageName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    document.getElementById(pageName).style.display = "block";
  
  }

  recorrer(){
    let analizar = new analizador.Analizador();
    if (this.codigo != "") {
      console.log("VAMOS A GRAFICAR");
      let nodo_ast = analizar.recorrer(this.codigo);
      console.log("nodo ast");
      console.log(nodo_ast);
      let grafo = nodo_ast.GraficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar
      console.log("Aca se muestra el codigo del grafo de graphviz");
      console.log(grafo);

      console.log("Vamos por el wasmFolder");
      wasmFolder('/assets/@hpcc-js/wasm/dist/');
      console.log("Vamos por la graficacion");
      graphviz('#graph').renderDot(grafo);
      console.log("Finalizada la graficacion");
    }
  }
}
