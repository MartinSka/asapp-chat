import { State, User, Chat } from '../models';

export const getUserById = (state: State, id: string): User => state.users[id];
export const getChatById = (state: State, id: string): Chat => state.chats[id];

export const getChatBetween = (state: State, senderId: string, receiverId: string): Chat => {
  const userContacts = getUserById(state, senderId).contacts;
  const chatId = userContacts[receiverId].chatId;

  return state.chats[chatId];
};

export const addUserTyping = (chat: Chat, user: User): User[] => ([...chat.typing, user]);
export const removeUserTyping = (chat: Chat, userId: string): User[] => (chat.typing.filter(typingUser => typingUser.id !== userId));
