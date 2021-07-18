import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TapPagePageRoutingModule } from './tap-page-routing.module';

import { TapPagePage } from './tap-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TapPagePageRoutingModule
  ],
  declarations: [TapPagePage],
  exports:[
    TapPagePage
  ]

})
export class TapPagePageModule {}
