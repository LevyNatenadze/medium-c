import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorInterface} from '../../types/backendError.interface'

@Component({
  selector: 'mc-backend-messages',
  standalone: true,
  imports: [CommonModule],
  template: `<ul class="error-messages">
    <li *ngFor="let errorMessage of errorMessages">
      {{ errorMessage }}
    </li>
  </ul>`,
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors: BackendErrorInterface = {}
  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map(
      (errorName: string) => {
        const message = this.backendErrors[errorName].join(' ')
        return `${errorName}: ${message}`
      }
    )
  }
}
