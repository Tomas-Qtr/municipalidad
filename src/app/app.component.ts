import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'home', url:'home', icon: 'home'},
    {title: 'sedes', url:'sedes', icon: 'business'},
    {title: 'admin', url:'admin', icon: 'person'}
    
  ];
  
  constructor() {}
}
