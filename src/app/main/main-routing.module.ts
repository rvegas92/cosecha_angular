import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ParametrosPageComponent } from './pages/parametros-page/parametros-page.component'
import { CosechaPageComponent } from './pages/cosecha-page/cosecha-page.component'
import { EnvioPageComponent } from './pages/envio-page/envio-page.component';
import { LecturaPageComponent } from './pages/lectura-page/lectura-page.component';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';
import { RequerimientoPageComponent } from './pages/requerimiento-page/requerimiento-page.component';

// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'parametros', component: ParametrosPageComponent },
      { path: 'cosecha', component: CosechaPageComponent },
      { path: 'envio', component: EnvioPageComponent },
      { path: 'lectura', component: LecturaPageComponent },
      { path: 'reportes', component: ReportesPageComponent },
      { path: 'requerimiento', component: RequerimientoPageComponent},
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
