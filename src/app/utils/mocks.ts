import { User } from '../models';

export const testUser01: User = {
  name: 'Laura',
  id: '1',
  contacts: {
    2: { chatId: 'chat-1' }
  },
};

export const testUser02: User = {
  name: 'Rob',
  id: '2',
  contacts: {
    1: { chatId: 'chat-1' }
  },
};

export const testUser03: User = {
  name: 'Jack',
  id: '3',
  contacts: {
    1: { chatId: 'chat-2' }
  },
};
