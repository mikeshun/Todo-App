import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from './layout/empty/empty.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: EmptyComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'todo',
    component: HomeComponent,
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
