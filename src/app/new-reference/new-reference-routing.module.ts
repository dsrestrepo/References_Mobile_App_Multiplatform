import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReferencePage } from './new-reference.page';

const routes: Routes = [
  {
    path: '',
    component: NewReferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewReferencePageRoutingModule {}
