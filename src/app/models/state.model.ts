import { User } from './user.model';
import { Chat } from './chat.model';

export interface State {
  /**
   * Users of the application ordered by ID.
   */
  users: { [key: string]: User };

  /**
   * Chats of the application ordered by ID.
   */
  chats: { [key: string]: Chat };
}
