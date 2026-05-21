import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-lista-marcas',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './lista-marcas.html',
  styleUrl: './lista-marcas.css'
})
export class ListaMarcasComponent implements OnInit {
  private apiService = inject(ApiService);

  marcas = signal<any[]>([]);


  marcaSeleccionada = signal<string | null>(null);

  perfumesSeleccionados = signal<any[]>([]);

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.apiService.getMarcas().subscribe({
      next: (data) => {
        if (data._embedded && data._embedded.marcas) {
          this.marcas.set(data._embedded.marcas);
        }
      },
      error: (err) => console.error('Error al cargar las marcas desde el backend', err)
    });
  }

  verDetalle(marca: any) {
    if (this.marcaSeleccionada() === marca.nombre) {
      this.marcaSeleccionada.set(null);
      this.perfumesSeleccionados.set([]);
      return;
    }

    this.marcaSeleccionada.set(marca.nombre);

    const urlRelacion = marca._links.perfumes.href;

    this.apiService.getPerfumesDeMarca(urlRelacion).subscribe({
      next: (data) => {
        if (data._embedded && data._embedded.perfumes) {
          this.perfumesSeleccionados.set(data._embedded.perfumes);
        } else {
          this.perfumesSeleccionados.set([]); // Si no tiene perfumes, array vacío
        }
      },
      error: (err) => {
        console.error('Error al cargar los perfumes de la marca', err);
        this.perfumesSeleccionados.set([]);
      }
    });
  }
}
