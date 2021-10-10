import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowReferencePageRoutingModule } from './show-reference-routing.module';

import { ShowReferencePage } from './show-reference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowReferencePageRoutingModule
  ],
  declarations: [ShowReferencePage]
})
export class ShowReferencePageModule {}
