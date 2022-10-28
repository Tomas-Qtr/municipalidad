import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SedesPageRoutingModule } from './sedes-routing.module';
import { AngularFireModule} from '@angular/fire/compat';
import { SedesPage } from './sedes.page';
import { environment } from 'src/environments/environment';
import { SedesService } from 'src/app/servicios/sedes.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SedesPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [SedesPage],
  providers:[SedesService]
})
export class SedesPageModule {}
