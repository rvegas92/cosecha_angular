import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DexieService } from '../../../shared/dixiedb/dexie-db.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  private dexieService = inject( DexieService );
  usuario: any;

  constructor(private router: Router) {}

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Confirma que desea cerrar sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, deseo salir',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: false // para aplicar tus propias clases
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/auth']);
        this.dexieService.clearUsuario();
      }
    });
  }

  toggleSidebar() {
    const mainWrapper = document.getElementById('main-wrapper');
    if (window.matchMedia('(max-width: 768px)').matches) {
      if (mainWrapper) {
        if (mainWrapper.classList.contains('show-sidebar')) {
          mainWrapper.setAttribute('data-sidebartype', 'mini-sidebar');
          mainWrapper.classList.remove('show-sidebar');
        } else {
          mainWrapper.setAttribute('data-sidebartype', 'full');
          mainWrapper.classList.toggle('show-sidebar');
        }
      }
    } else {
      if (mainWrapper) {
        mainWrapper.setAttribute('data-sidebartype', 'full');
        mainWrapper.classList.remove('show-sidebar');
      }
    }
  }

  async ngOnInit() {
    this.usuario = await this.dexieService.showUsuario()
  }

}
