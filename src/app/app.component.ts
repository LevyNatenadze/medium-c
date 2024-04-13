import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  template: 'hello <router-outlet></router-outlet>',
  imports: [RouterOutlet],
})
export class AppComponent {}
