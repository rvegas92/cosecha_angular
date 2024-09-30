import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { MainRoutingModule } from './main-routing.module'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ParametrosPageComponent } from './pages/parametros-page/parametros-page.component';
import { CosechaPageComponent } from './pages/cosecha-page/cosecha-page.component';
import { FormsModule } from '@angular/forms';
import { EnvioPageComponent } from './pages/envio-page/envio-page.component';
import { LecturaPageComponent } from './pages/lectura-page/lectura-page.component';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    ParametrosPageComponent,
    CosechaPageComponent,
    EnvioPageComponent,
    LecturaPageComponent,
    ReportesPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
