import { Component, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor() { }
  
  @Input() tituloMenu:string
  @Input() icono:string

  icon:string=""
  title:string;

  ngOnInit() {}

}
