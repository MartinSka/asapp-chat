import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { AppStoreService } from '../app-store.service';
import { ChatSession } from '../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  /**
   * ID of the sender.
   * Used to get Chat Session Data.
   */
  @Input() senderId: string;

  /**
   * ID of the receiver.
   * Used to get Chat Session Data and define the Header component user.
   */
  @Input() receiverId: string;

  /**
   * Contains participants and chat messages.
   * Used to get a particular User or the actual chat ID.
   */
  private chatSessionData: ChatSession;

  ngOnInit() {
    this.chatSessionData = this.store.getChatSession(this.senderId, this.receiverId);
  }

  get receiverUser() {
    return this.chatSessionData.participants[this.receiverId];
  }

  get chatId() {
    return this.chatSessionData.chat.id;
  }

  constructor(public store: AppStoreService) { }
}
