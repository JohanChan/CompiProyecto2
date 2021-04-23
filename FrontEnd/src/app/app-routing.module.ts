import { Component, NgModule } from '@angular/core';
import {InterfazComponent} from "./components/interfaz/interfaz.component";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "interfaz",
    component: InterfazComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
