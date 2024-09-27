import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';


// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    children: [
      // { path: 'new-hero', component: NewPageComponent },
      // { path: 'search', component: SearchPageComponent },
      // { path: 'edit/:id', component: NewPageComponent },
      // { path: 'list', component: ListPageComponent },
      // { path: ':id', component: HeroPageComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
