import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TapPage } from './pages/tap/tap/tap.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'tap',
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
    path: 'tap',component:TapPage,
    children:[
      {
        path: 'start-page',
        loadChildren: () => import('./pages/startPage/start-page/start-page.module').then( m => m.StartPagePageModule)
      },
      {
        path: 'card',
        loadChildren: () => import('./pages/card/card/card.module').then( m => m.CardPageModule)
      },
      
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
