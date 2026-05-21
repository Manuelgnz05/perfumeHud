import { Routes } from '@angular/router';
import { ListaMarcasComponent } from './components/lista-marcas/lista-marcas';
import { FormularioPerfumeComponent } from './components/formulario-perfume/formulario-perfume';

export const routes: Routes = [
  { path: '', component: ListaMarcasComponent },
  { path: 'nuevo-perfume', component: FormularioPerfumeComponent },
  { path: '**', redirectTo: '' }
];
