import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { RoleIndexComponent } from './pages/roles/role-index/role-index.component';
import { RoleCreateComponent } from './pages/roles/role-create/role-create.component';
import { RoleEditComponent } from './pages/roles/role-edit/role-edit.component';
import { RoleShowComponent } from './pages/roles/role-show/role-show.component';
import { UserIndexComponent } from './pages/users/user-index/user-index.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UserShowComponent } from './pages/users/user-show/user-show.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    SearchComponent,
    RoleIndexComponent,
    RoleCreateComponent,
    RoleEditComponent,
    RoleShowComponent,
    UserIndexComponent,
    UserCreateComponent,
    UserEditComponent,
    UserShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
