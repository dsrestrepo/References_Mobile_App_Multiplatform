import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowReferencePage } from './show-reference.page';

const routes: Routes = [
  {
    path: '',
    component: ShowReferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowReferencePageRoutingModule {}
