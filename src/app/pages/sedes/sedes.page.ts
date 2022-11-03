import { Component, OnInit } from '@angular/core';


import { SedesService } from 'src/app/servicios/sedes.service';
import {Sede} from '../../modelos/sede';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.page.html',
  styleUrls: ['./sedes.page.scss'],
})
export class SedesPage implements OnInit {

  sedes:Sede[]

  titulo:string="Sede"

  icono:string="business-outline"

  
  constructor(private sedesSevicio:SedesService) { }

  ngOnInit() { //Traemos las sedes y las guardamos en una variable
    this.sedesSevicio.obtenerSedes().subscribe(sede =>{
      this.sedes = sede;
    })
  }
}