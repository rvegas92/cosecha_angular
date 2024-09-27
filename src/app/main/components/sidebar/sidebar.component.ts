import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar-componente',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/auth']);
  }

  // toggleSidebar() {
  //   const mainWrapper = document.getElementById('main-wrapper');
  //   if (mainWrapper) {
  //     // Alternar la clase 'mini-sidebar' o 'collapsed'
  //     // mainWrapper.classList.toggle('show-sidebar');
  //     console.log(mainWrapper.classList.contains('show-sidebar'))
  //     // Cambiar el atributo de tipo de sidebar
  //     if (mainWrapper.classList.contains('show-sidebar')) {
  //       mainWrapper.setAttribute('data-sidebartype', 'mini-sidebar');
  //       mainWrapper.classList.toggle('mini-sidebar');
  //     } else {
  //       mainWrapper.setAttribute('data-sidebartype', 'full');
  //       mainWrapper.classList.toggle('show-sidebar');
  //     }
  //   }
  // }
}
