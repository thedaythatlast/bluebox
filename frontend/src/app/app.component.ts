import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';




@Component({
  selector: 'app-root',
  imports: [RouterModule, NavBarComponent, BottomNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bluebox';

  message_popup = '...'
}
