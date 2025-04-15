import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DbComponent } from '../../projects/db/src/lib/db.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    DbComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Seed';
}
