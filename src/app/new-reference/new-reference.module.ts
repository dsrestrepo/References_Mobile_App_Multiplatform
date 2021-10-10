import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReferencePageRoutingModule } from './new-reference-routing.module';

import { NewReferencePage } from './new-reference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewReferencePageRoutingModule
  ],
  declarations: [NewReferencePage]
})
export class NewReferencePageModule {}
