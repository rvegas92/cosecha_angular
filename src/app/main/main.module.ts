import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { MainRoutingModule } from './main-routing.module'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ParametrosPageComponent } from './pages/parametros-page/parametros-page.component';
import { CosechaPageComponent } from './pages/cosecha-page/cosecha-page.component'


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    ParametrosPageComponent,
    CosechaPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
