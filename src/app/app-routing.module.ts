import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TapPage } from './pages/tap/tap/tap.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'tap/start-page',
    pathMatch: 'full'
  },
  {
    path: 'tap',
    redirectTo: 'tap/start-page',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'start-page',
    loadChildren: () => import('./pages/startPage/start-page/start-page.module').then( m => m.StartPagePageModule)
  },
  {
    path: 'tap',component:TapPage,
    children:[
      {
        path: 'start-page',
        loadChildren: () => import('./pages/startPage/start-page/start-page.module').then( m => m.StartPagePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./pages/card/card/card.module').then( m => m.CardPageModule)
      },
      
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./pages/map/map/map.module').then( m => m.MapPageModule)
      },
    ]
  },
  {
    path: 'model',
    loadChildren: () => import('./pages/model/model/model.module').then( m => m.ModelPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map/map.module').then( m => m.MapPageModule)
  },  {
    path: 'location',
    loadChildren: () => import('./pages/location/location/location.module').then( m => m.LocationPageModule)
  },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
