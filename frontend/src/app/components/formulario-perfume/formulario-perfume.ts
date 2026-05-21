import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api'; // Ajusta la ruta a tu archivo api.ts si es necesario
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-perfume',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-perfume.html',
  styleUrl: './formulario-perfume.css'
})
export class FormularioPerfumeComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  perfumeForm: FormGroup = this.fb.group({
    marcaNombre: ['', Validators.required],
    perfumeNombre: ['', Validators.required],
    precio: ['', [Validators.required, Validators.min(0.01)]]
  });

  onSubmit() {
    if (this.perfumeForm.invalid) return;

    const { marcaNombre, perfumeNombre, precio } = this.perfumeForm.value;

    this.apiService.getMarcas(0, 100).subscribe({
      next: (res) => {
        const marcasExistentes = res._embedded?.marcas || [];

        const marcaEncontrada = marcasExistentes.find(
          (m: any) => m.nombre.toLowerCase() === marcaNombre.trim().toLowerCase()
        );

        if (marcaEncontrada) {
          const marcaUrl = marcaEncontrada._links.self.href;
          this.guardarPerfume(perfumeNombre, precio, marcaUrl);
        } else {
          this.apiService.crearMarca({ nombre: marcaNombre.trim() }).subscribe({
            next: (nuevaMarca) => {
              const nuevaMarcaUrl = nuevaMarca._links.self.href;
              this.guardarPerfume(perfumeNombre, precio, nuevaMarcaUrl);
            },
            error: (err) => console.error('Error al registrar la firma nueva', err)
          });
        }
      },
      error: (err) => console.error('Error al verificar el catálogo de marcas', err)
    });
  }

  private guardarPerfume(nombrePerfume: string, precioPerfume: number, urlMarca: string) {
    const nuevoPerfume = {
      nombre: nombrePerfume,
      precio: precioPerfume,
      marca: urlMarca
    };

    this.apiService.crearPerfume(nuevoPerfume).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error al insertar la nueva fragancia', err)
    });
  }
}
