import {Component, inject, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import { TopbarComponent } from './shared/components/topbar/topbar.component'
import { Store } from '@ngrx/store'
import { authActions } from './auth/store/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <mc-topbar></mc-topbar>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, TopbarComponent],
})
export class AppComponent implements OnInit{
  private store = inject(Store);

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
