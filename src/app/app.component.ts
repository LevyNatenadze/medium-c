import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import { TopbarComponent } from './shared/components/topbar/topbar.component'

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <mc-topbar></mc-topbar>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, TopbarComponent],
})
export class AppComponent {}
