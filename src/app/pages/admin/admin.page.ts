import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButtons, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sede } from 'src/app/modelos/sede';
import { SedesService } from 'src/app/servicios/sedes.service';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ActionSheetController } from '@ionic/angular';
import { Button } from 'protractor';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  
  icono:string="person-outline"
  titulo:string="Admin"

  
  sedeSeleccionado:Sede

  textBoton:string

  //Es el controlador del formulario
  nuevasSedes= new FormGroup({
    nombre: new FormControl('', Validators.required)!,
    descripcion: new FormControl('', Validators.required)!,
    ubicacion: new FormControl('', Validators.required)!,
    telefono: new FormControl('', Validators.required)!,
    imagen: new FormControl('', Validators.required)!
  })

  constructor(private servicioSede:SedesService, private actionSheetCtrl: ActionSheetController) { }//inyectamos el servicio
  

  sedes:Sede[]//declaramos el modelo que va a utilizar


  //es parte del modal de la applicacion
  isModalOpen = false;
  //metodo para cerrar el modal
  closeModal(){
    this.isModalOpen=false
  }
  //metodo para abrir el modal
  setOpen(isOpen: boolean) {
    this.isModalOpen = true
    this.textBoton= 'Agregar sede'
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

  actualizarSede(){
    let nuevaSede:Sede={
      nombre: this.nuevasSedes.value.nombre!,
      descripcion: this.nuevasSedes.value.descripcion!,
      ubicacion: this.nuevasSedes.value.ubicacion!,
      imagen: this.nuevasSedes.value.imagen!,
      telefono: this.nuevasSedes.value.telefono!,
      idSede: this.sedeSeleccionado.idSede
    }
    //recuperamos los datos que vamos a editar, llamando al metodo del servicio "editarSede" y cumpliendo sus parametros
    //Hacemo una promesa de que cuando los datos, para recibir una respuesta al ser actualizados
    this.servicioSede.editarSede(this.sedeSeleccionado.idSede, nuevaSede).then((resp)=>{
      this.nuevasSedes = new FormGroup({
        nombre: new FormControl('', Validators.required)!,
        descripcion: new FormControl('', Validators.required)!,
        ubicacion: new FormControl('', Validators.required)!,
        telefono: new FormControl('', Validators.required)!,
        imagen: new FormControl('', Validators.required)!
      })
      alert('Sede actualizada')
    })
    .catch((error)=>{
      alert('No se puede actualizar')
    })
  }


  //creamos el metodo "mostrarEditar" para que cuando se haga click se muestre los datos en el formulario
  mostrarEditar(sedeSeleccionado:Sede){
    
    this.textBoton = 'Actualizar sede'
    this.sedeSeleccionado = sedeSeleccionado

    this.nuevasSedes.setValue({
      nombre: sedeSeleccionado.nombre,
      descripcion: sedeSeleccionado.descripcion,
      ubicacion: sedeSeleccionado.ubicacion,
      telefono: sedeSeleccionado.telefono,
      imagen: sedeSeleccionado.imagen
    })
    this.isModalOpen = true
    
  }
  
  eliminarSede(){
    this.servicioSede.eliminarSede(this.sedeSeleccionado.idSede).then((resp)=>{
      alert('la sede fue eliminada con exito')
      this.nuevasSedes= new FormGroup({
        nombre: new FormControl('', Validators.required)!,
        descripcion: new FormControl('', Validators.required)!,
        ubicacion: new FormControl('', Validators.required)!,
        telefono: new FormControl('', Validators.required)!,
        imagen: new FormControl('', Validators.required)!
      })
    })

    .catch((error)=>{
      alert('no se pudo eliminar')
    })
  }

  cargarModal(){
    if(this.textBoton== 'Agregar sede'){
      this.agregarSede()
    }else if(this.textBoton== 'Actualizar sede'){
      this.actualizarSede()
    }
  }


  //creamos el metodo para que se nos muestre la opcion de eliminar

  mostraeEliminar(sede:Sede){
    this.presentActionSheet()
    this.sedeSeleccionado= sede
  }
  
  result: string;

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
            
          },
          handler: () => {this.eliminarSede()}
        },
       
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }
}


