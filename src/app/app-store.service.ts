import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { cloneDeep } from 'lodash';

import { State, Message, ChatSession, } from './models';
import { initialState } from './utils/initial-state';
import { getUserById, getChatBetween, getChatById, addUserTyping, removeUserTyping } from './utils/store';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private readonly state = new BehaviorSubject<State>(initialState);

  /**
   * Exposes the App state to be consumed.
   */
  readonly state$: Observable<State> = this.state.asObservable();

  /**
   * Gets chat messages with their respective participants.
   */
  getChatSession(senderId: string, receiverId: string): ChatSession {
    const state = this.state.getValue();

    const sender = getUserById(state, senderId);
    const receiver = getUserById(state, receiverId);
    const chat = getChatBetween(state, senderId, receiverId);

    return {
      participants: {
        [senderId]: sender,
        [receiverId]: receiver,
      },
      chat,
    };
  }

  /**
   * Adds a new message to the store.
   */
  addMessage(chatId: string, message: Message) {
    const state = cloneDeep(this.state.getValue());
    const chat = getChatById(state, chatId);

    const newState: State = {
      ...state,
      chats: {
        [chatId]: {
          ...chat,
          id: chatId,
          messages: [...chat.messages, message],
        }
      }
    };
    
    this.state.next(newState);
  }

  /**
   * Sets if a user is typing or has stopped.
   */
  userTyping(isUserTyping: boolean, userId: string, chatId: string) {
    const state = cloneDeep(this.state.getValue());
    const user = getUserById(state, userId);
    const chat = getChatById(state, chatId);
    const typing = isUserTyping ? addUserTyping(chat, user) : removeUserTyping(chat, user.id);

    const newState: State = {
      ...state,
      chats: {
        [chatId]: {
          ...chat,
          typing,
        }
      }
    };

    this.state.next(newState);
  }
}
