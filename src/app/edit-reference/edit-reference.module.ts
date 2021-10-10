import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReferencePageRoutingModule } from './edit-reference-routing.module';

import { EditReferencePage } from './edit-reference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditReferencePageRoutingModule
  ],
  declarations: [EditReferencePage]
})
export class EditReferencePageModule {}
