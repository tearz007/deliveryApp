import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TapPagePage } from './tap-page.page';

const routes: Routes = [
  {
    path: '',
    component: TapPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TapPagePageRoutingModule {}
