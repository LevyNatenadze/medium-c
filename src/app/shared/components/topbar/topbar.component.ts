import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/reducer';

@Component({
  selector: 'mc-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class TopbarComponent {
  private store = inject(Store);

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser)
  })

}
