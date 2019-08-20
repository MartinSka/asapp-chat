import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subject, merge } from 'rxjs';
import { filter, map, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { AppStoreService } from '../../app-store.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent implements OnInit, OnDestroy {
  /**
   * User ID to identify if typing is in process and who the sender is.
   */
  @Input() private senderId: string;

  /**
   * Identify to whom chat the message belongs.
   */
  @Input() private chatId: string;

  /**
   * FormControl with chat input value.
   * Allows to disable the send button.
   */
  message = new FormControl('', [Validators.required]);

  private userStartTyping$: Subject<{ event: KeyboardEvent, isUserTyping: boolean }> = new Subject();
  private userEndTyping$: Subject<boolean> = new Subject();
  private ngUnsubscribe = new Subject();

  /**
   * Sends the new message to the Store and cleans the input.
   */
  onSubmit() {
    this.store.addMessage(
      this.chatId,
      {
        timestamp: Date.now(),
        sentBy: this.senderId,
        content: this.message.value
      }
    );

    this.message.reset();
  }

  /**
   * Dispatchs an event when the user types.
   * Only UserStartTyping (keypress) sends an Event parameter to filter the 'Enter' key.
   */
  onUserType(isUserTyping: boolean, event?: KeyboardEvent) {
    if (isUserTyping) {
      this.userStartTyping$.next({ event, isUserTyping });
    } else {
      this.userEndTyping$.next(isUserTyping);
    }
  }

  ngOnInit() {
    this.setTypingEvent();
  }

  constructor(public store: AppStoreService) { }

  /**
   * Listens to keyboard event to trigger an event when the user is typing.
   */
  private setTypingEvent() {
    merge(
      this.userStartTyping$.pipe(
        filter(({ event }) => event.key !== 'Enter'),
        map(({ isUserTyping }) => isUserTyping),
      ),
      this.userEndTyping$.pipe(debounceTime(200))
    ).pipe(
      distinctUntilChanged(),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(
      (isUserTyping) => this.store.userTyping(isUserTyping, this.senderId, this.chatId)
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
