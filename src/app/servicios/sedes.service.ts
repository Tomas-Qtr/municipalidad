import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Sede } from '../modelos/sede';
import { map } from 'rxjs/operators';
import { async } from '@firebase/util';
@Injectable({
  providedIn: 'root'
})
export class SedesService {
//Declaramos la variable que almacenara las sedes
private coleccionSedes!:AngularFirestoreCollection<Sede>

  constructor(private db:AngularFirestore) {
    //Hacemos referencia a la coleccion a la que accedemos
    this.coleccionSedes = db.collection('sedes')
  }

  //Metodo para obtener sedes
  obtenerSedes(){
    return this.coleccionSedes.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }
  CrearSede(nuevaSede: Sede){
    return new Promise(async (resolve, reject)=>{
      try {
        const id= this.db.createId();
        nuevaSede.idSede = id;
        const respuesta = await this.coleccionSedes.doc(id).set(nuevaSede)
        resolve(respuesta)
      }
      catch(error){
        reject(error)
      }
    })
  }
  //Metodo para editar las sedes. 
  //Recibe id como parametro para identificar la sede a editar
  //Recibe los nuevosDatos para reemplazar los antiguos
  editarSede(idSede:string, nuevosDatos:Sede){
    return this.coleccionSedes.doc(idSede).update(nuevosDatos)
  }
  //Metodo para eliminar sedes
  eliminarSede(idSede:string){
    return new Promise(async(resolve, reject) => {
      try {
        const respuesta = await this.coleccionSedes.doc(idSede).delete()
        resolve(respuesta)
      }
      catch (error) {
        reject(error)
      }
    }
    )

  }
  
}