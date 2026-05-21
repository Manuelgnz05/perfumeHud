import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-lista-marcas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-marcas.html',
  styleUrl: './lista-marcas.css'
})
export class ListaMarcasComponent implements OnInit {
  private apiService = inject(ApiService);

  marcas = signal<any[]>([]);
  marcaSeleccionada = signal<string | null>(null);
  perfumesSeleccionados = signal<any[]>([]);
  paginaActual = signal<number>(0);
  totalPaginas = signal<number>(0);
  itemsPorPagina = 6;

  mensajeNotificacion = signal<{ texto: string; tipo: 'exito' | 'error' } | null>(null);

  textoBusqueda = signal<string>('');
  ordenSeleccionado = signal<string>('AZ');

  marcasFiltradas = computed(() => {
    const buscar = this.textoBusqueda().toLowerCase().trim();
    let resultado = this.marcas();

    if (buscar) {
      resultado = resultado.filter(marca => marca.nombre.toLowerCase().includes(buscar));
    }

    resultado = [...resultado].sort((a, b) => {
      if (this.ordenSeleccionado() === 'AZ') {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });

    return resultado;
  });

  perfumeEditando = signal<string | null>(null);
  editNombre: string = '';
  editPrecio: number = 0;

  ngOnInit() {
    this.cargarMarcas();
  }

  mostrarNotificacion(texto: string, tipo: 'exito' | 'error') {
    this.mensajeNotificacion.set({ texto, tipo });
    setTimeout(() => {
      this.mensajeNotificacion.set(null);
    }, 3000);
  }

  actualizarBusqueda(event: Event) {
    const elemento = event.target as HTMLInputElement;
    this.textoBusqueda.set(elemento.value);
  }

  limpiarBusqueda() {
    this.textoBusqueda.set('');
  }

  cambiarOrden(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.ordenSeleccionado.set(select.value);
  }

  cargarMarcas() {
    this.apiService.getMarcas(this.paginaActual(), this.itemsPorPagina).subscribe({
      next: (data) => {
        if (data._embedded && data._embedded.marcas) {
          this.marcas.set(data._embedded.marcas);
          this.totalPaginas.set(data.page.totalPages);
        } else {
          this.marcas.set([]);
          this.totalPaginas.set(0);
        }
      },
      error: (err) => {
        console.error(err);
        this.mostrarNotificacion('Error al cargar el catálogo.', 'error');
      }
    });
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPaginas()) {
      this.paginaActual.set(nuevaPagina);
      this.cancelarEdicion();
      this.marcaSeleccionada.set(null);
      this.perfumesSeleccionados.set([]);
      this.cargarMarcas();
    }
  }

  verDetalle(marca: any) {
    if (this.marcaSeleccionada() === marca.nombre) {
      this.marcaSeleccionada.set(null);
      this.perfumesSeleccionados.set([]);
      this.cancelarEdicion();
      return;
    }
    this.marcaSeleccionada.set(marca.nombre);
    this.refrescarPerfumes(marca);
  }

  refrescarPerfumes(marca: any) {
    const urlRelacion = marca._links.perfumes.href;
    this.apiService.getPerfumesDeMarca(urlRelacion).subscribe({
      next: (data) => {
        this.perfumesSeleccionados.set(data._embedded?.perfumes || []);
      },
      error: (err) => console.error(err)
    });
  }

  eliminarPerfume(perfume: any) {
    if (confirm(`¿Seguro que quieres eliminar el perfume "${perfume.nombre}"?`)) {
      this.apiService.borrarPerfume(perfume._links.self.href).subscribe({
        next: () => {
          this.mostrarNotificacion('Fragancia eliminada correctamente.', 'exito');
          const marcaActual = this.marcas().find(m => m.nombre === this.marcaSeleccionada());
          if (marcaActual) this.refrescarPerfumes(marcaActual);
        },
        error: (err) => {
          console.error(err);
          this.mostrarNotificacion('Ocurrió un error al intentar eliminar la fragancia.', 'error');
        }
      });
    }
  }

  eliminarMarca(marca: any) {
    if (confirm(`¿Seguro que deseas eliminar la firma "${marca.nombre}" y todos sus perfumes?`)) {
      this.apiService.borrarMarca(marca._links.self.href).subscribe({
        next: () => {
          this.mostrarNotificacion('Firma eliminada del catálogo.', 'exito');
          this.marcaSeleccionada.set(null);
          this.perfumesSeleccionados.set([]);
          this.cargarMarcas();
        },
        error: (err) => {
          console.error(err);
          this.mostrarNotificacion('No se pudo eliminar la firma.', 'error');
        }
      });
    }
  }

  comenzarEdicion(perfume: any) {
    this.perfumeEditando.set(perfume._links.self.href);
    this.editNombre = perfume.nombre;
    this.editPrecio = perfume.precio;
  }

  cancelarEdicion() {
    this.perfumeEditando.set(null);
    this.editNombre = '';
    this.editPrecio = 0;
  }

  guardarCambiosPerfume(perfume: any, marca: any) {
    if (!this.editNombre || this.editPrecio <= 0) {
      this.mostrarNotificacion('Los datos introducidos no son válidos.', 'error');
      return;
    }
    const datosModificados = { nombre: this.editNombre, precio: this.editPrecio, marca: marca._links.self.href };
    this.apiService.editarPerfume(perfume._links.self.href, datosModificados).subscribe({
      next: () => {
        this.mostrarNotificacion('Cambios guardados con éxito.', 'exito');
        this.cancelarEdicion();
        this.refrescarPerfumes(marca);
      },
      error: (err) => {
        console.error(err);
        this.mostrarNotificacion('Error al intentar modificar los datos.', 'error');
      }
    });
  }
}
