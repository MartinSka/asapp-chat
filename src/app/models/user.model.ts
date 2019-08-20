export interface User {
  /**
   * User ID.
   */
  id: string;

  /**
   * User name.
   */
  name: string;

  /**
   * List of users and their respective chats ID.
   */
  contacts: Contacts;
}

/**
 * List of users that the sender can talk to
 * and the chat ID that corresponds to that conversation.
 */
export interface Contacts {
  [key: string]: { chatId: string; };
}
