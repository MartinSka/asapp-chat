import { State } from '../models';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const chatId = generateId();

export const participants = [{
  id: generateId(),
  name: 'Laura',
}, {
  id: generateId(),
  name: 'Rob'
}];

// Add contacts to the existing users
const users = participants.reduce(
  (partialUsers, mockUser) => {
    const contactId = participants.find(({ id }) => mockUser.id !== id).id;

    return {
      ...partialUsers,
      [mockUser.id]: {
        ...mockUser,
        contacts: {
          [contactId]: { chatId }
        }
      }
    };
  }, {});

export const initialState: State = {
  users,
  chats: {
    [chatId]: {
      id: chatId,
      messages: [{
        timestamp: Date.now(),
        sentBy: participants[Math.floor(Math.random() * participants.length)].id,
        content: 'Hey, what\'s up?'
      }],
      typing: [],
    }
  },
};
