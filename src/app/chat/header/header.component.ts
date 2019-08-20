import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeaderComponent {
  /**
   * User that will be shown in the header.
   */
  @Input() user: User;

  /**
   * Contains all the users that are typing.
   */
  @Input() typing: User[];

  /**
   * Gets the user who is typing.
   */
  getUserTyping(usersTyping: User[]) {
    return usersTyping.find(user => user.id === this.user.id);
  }
}
