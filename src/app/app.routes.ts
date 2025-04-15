import { Routes } from '@angular/router';
import { CataasComponent } from './cataas/cataas.component';

export const routes: Routes = [
  {
    path: 'cats',
    component: CataasComponent,
    title: 'Cat as a Service Demo'
  }
];
