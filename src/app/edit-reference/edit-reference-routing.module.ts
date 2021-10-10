import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditReferencePage } from './edit-reference.page';

const routes: Routes = [
  {
    path: '',
    component: EditReferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditReferencePageRoutingModule {}
