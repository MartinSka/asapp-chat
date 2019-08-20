import { User } from './user.model';

export interface Chat {
  /**
   * ID of the chat.
   */
  id: string;

  /**
   * Chat messages.
   */
  messages: Message[];

  /**
   * Users that are typing on the chat.
   */
  typing: User[];
}

export interface Message {
  /**
   * Timestamp of the chat message.
   */
  timestamp: number;

  /**
   * ID of the user that has sent the message.
   */
  sentBy: string;

  /**
   * Content of the message.
   */
  content: string;
}

export interface ChatSession {
  /**
   * Which users are part of the chat.
   */
  participants: { [key: string]: User };

  /**
   * Contains all the chat messages and whether a user is typing.
   */
  chat: Chat;
}
