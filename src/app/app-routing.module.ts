import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'announcement',
    loadChildren: () => import('./pages/announcement/announcement.module').then( m => m.AnnouncementPageModule)
  },
  {
    path: 'announcement-details',
    loadChildren: () => import('./pages/announcement-details/announcement-details.module').then( m => m.AnnouncementDetailsPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'support-details',
    loadChildren: () => import('./pages/support-details/support-details.module').then( m => m.SupportDetailsPageModule)
  },
  {
    path: 'write-support',
    loadChildren: () => import('./pages/write-support/write-support.module').then( m => m.WriteSupportPageModule)
  },
  {
    path: 'status',
    loadChildren: () => import('./pages/status/status.module').then( m => m.StatusPageModule)
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
