import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  titulo:string="Home"
  icono:string="home-outline"

  public appPages = [
    
    {title: 'Sedes', url:'sedes', icon: 'business'},
    {title: 'Admin', url:'admin', icon: 'person'},
    {title: 'servicios',  icon: 'medkit'},
    
  ];
  constructor() { }


  ngOnInit() {
  }

}
