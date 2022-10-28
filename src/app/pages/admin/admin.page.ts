import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sede } from 'src/app/modelos/sede';
import { SedesService } from 'src/app/servicios/sedes.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  


  sedeSeleccionado:Sede



  //Es el controlador del formulario
  nuevasSedes= new FormGroup({
    nombre: new FormControl('', Validators.required)!,
    descripcion: new FormControl('', Validators.required)!,
    ubicacion: new FormControl('', Validators.required)!,
    telefono: new FormControl('', Validators.required)!,
    imagen: new FormControl('', Validators.required)!
  })

  constructor(private servicioSede:SedesService) { }//inyectamos el servicio

  sedes:Sede[]//declaramos el modelo que va a utilizar


//es parte del model de la applicacion
  name: string;

cancel() {
  this.modal.dismiss(null, 'cancel');
}

confirm() {
  this.modal.dismiss(this.name, 'confirm');
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    
  }
}
  
  ngOnInit() {
    this.servicioSede.obtenerSedes().subscribe(sede =>{
      this.sedes = sede;
    })
  }

  agregarSede(){


    if(this.nuevasSedes.valid){

      let nuevaSede:Sede={

        nombre: this.nuevasSedes.value.nombre!,
        descripcion: this.nuevasSedes.value.descripcion!,
        ubicacion: this.nuevasSedes.value.ubicacion!,
        telefono: this.nuevasSedes.value.telefono!,
        imagen: this.nuevasSedes.value.imagen!,
        idSede: ''

      }
      this.servicioSede.CrearSede(nuevaSede).then(sede=>{
        alert("Se agrego la sede con exito")
      })
      .catch(error=>{
        alert("Ocurrio un error \nError: "+ error)
      })
    }
    else{
      alert("hay campos vacios")
    }
  }
  
}


