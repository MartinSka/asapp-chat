import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Message } from '../../models';
import { fadeInOut } from '../../animations';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut]
})
export class ChatWindowComponent {
  /**
   * Array of messages that will be shown in the chat windows.
   */
  @Input() messages: Message[];

  /**
   * ID of the sender to identify that the user sent the message.
   */
  @Input() senderId: string;

  /**
   * Returns message timestamp to be used in trackBy.
   */
  getMessageTimestamp(index: number, message: Message): number {
    return message.timestamp;
  }

  /**
   * Determines if the message is an image or an anchor to render properly.
   */
  messageIs(msg: string) {
    if (this.isAnImage(msg)) {
      return 'image';
    }

    if (this.isALink(msg)) {
      return 'anchor';
    }
  }

  private isAnImage(msg: string) {
    return msg.endsWith('.jpg') ||
      msg.endsWith('.jpeg') ||
      msg.endsWith('.png') ||
      msg.endsWith('.gif') ||
      msg.startsWith('data:image');
  }

  private isALink(msg: string) {
    return msg.startsWith('http');
  }
}
