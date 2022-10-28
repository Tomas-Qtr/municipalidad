import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';
import { AngularFireModule} from '@angular/fire/compat';
import { AdminPage } from './admin.page';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { SedesService } from 'src/app/servicios/sedes.service';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule
  ],
  declarations: [AdminPage, MenuComponent],
  providers: [SedesService]
})
export class AdminPageModule {}
