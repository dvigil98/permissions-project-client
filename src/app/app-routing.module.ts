import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { PermissionGuard } from './core/guards/permission.guard';

import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleIndexComponent } from './pages/roles/role-index/role-index.component';
import { RoleCreateComponent } from './pages/roles/role-create/role-create.component';
import { RoleEditComponent } from './pages/roles/role-edit/role-edit.component';
import { RoleShowComponent } from './pages/roles/role-show/role-show.component';
import { UserIndexComponent } from './pages/users/user-index/user-index.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UserShowComponent } from './pages/users/user-show/user-show.component';

const routes: Routes = [
  // redirigir al login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // login
  {
    path: 'login',
    component: LoginComponent
  },
  // rutas de la administración
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      // redirigir al dashboard
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      // dashboard
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      // roles
      {
        path: 'roles',
        component: RoleIndexComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'ver_roles' }
      },
      {
        path: 'roles/create',
        component: RoleCreateComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'agregar_roles' }
      },
      {
        path: 'roles/:id/edit',
        component: RoleEditComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'editar_roles' }
      },
      {
        path: 'roles/:id',
        component: RoleShowComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'ver_roles' }
      },
      // usuarios
      {
        path: 'users',
        component: UserIndexComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'ver_usuarios' }
      },
      {
        path: 'users/create',
        component: UserCreateComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'agregar_usuarios' }
      },
      {
        path: 'users/:id/edit',
        component: UserEditComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'editar_usuarios' }
      },
      {
        path: 'users/:id',
        component: UserShowComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'ver_usuarios' }
      },
      // si no existe la ruta dentro de la administración, redirigir al dashboard
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
  // si no existe la ruta, redirigir al login
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
