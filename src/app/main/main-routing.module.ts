import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ParametrosPageComponent } from './pages/parametros-page/parametros-page.component'
import { CosechaPageComponent } from './pages/cosecha-page/cosecha-page.component'

// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'parametros', component: ParametrosPageComponent },
      { path: 'cosecha', component: CosechaPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
