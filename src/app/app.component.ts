import { Component, ChangeDetectionStrategy } from '@angular/core';
import { participants } from './utils/initial-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  participants = participants;
}
