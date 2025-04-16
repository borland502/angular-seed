import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DbComponent } from '../../projects/db/src/lib/db.component';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faShieldCat } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    DbComponent,
    FontAwesomeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Seed';

  constructor(library: FaIconLibrary) {
    library.addIcons(faShieldCat);
  }
}
