import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '../../types';

interface MessagesState {
  conversations: Conversation[];
}

function loadState(): MessagesState {
  try {
    const raw = localStorage.getItem('admin_messages');
    if (raw) return JSON.parse(raw);
  } catch {}
  return { conversations: [] };
}

function saveState(state: MessagesState) {
  try {
    localStorage.setItem('admin_messages', JSON.stringify(state));
  } catch {}
}


export function loadUserInbox(email: string): Conversation[] {
  try {
    const raw = localStorage.getItem(`user_inbox_${email}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveUserInbox(email: string, convos: Conversation[]) {
  try {
    localStorage.setItem(`user_inbox_${email}`, JSON.stringify(convos));
  } catch {}
}

const initialState: MessagesState = loadState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    reloadFromStorage: () => loadState(),

    addContactMessage: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        phone: string;
        destination: string;
        message: string;
      }>
    ) => {
      const { name, email, destination, message } = action.payload;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });

      const existing = state.conversations.find(c => c.name === name);
      if (existing) {
        const lastId = existing.messages[existing.messages.length - 1]?.id ?? 0;
        existing.messages.push({ id: lastId + 1, from: 'user', text: message, time: timeStr, date: dateStr });
        existing.lastMsg = message;
        existing.lastTime = 'just now';
        existing.unread = true;
      
        (existing as Conversation & { email?: string }).email = email;
      } else {
        const newConvo: Conversation & { email?: string } = {
          id: Date.now(),
          name,
          email,
          status: 'offline',
          tour: destination || 'General Inquiry',
          lastMsg: message,
          lastTime: 'just now',
          unread: true,
          messages: [{ id: 1, from: 'user', text: message, time: timeStr, date: dateStr }],
        };
        state.conversations.unshift(newConvo);
      }
      saveState({ conversations: state.conversations });
    },

    sendAdminReply: (
      state,
      action: PayloadAction<{ conversationId: number; text: string }>
    ) => {
      const { conversationId, text } = action.payload;
      const convo = state.conversations.find(c => c.id === conversationId) as (Conversation & { email?: string }) | undefined;
      if (!convo) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });

      const newMsg: Message = {
        id: (convo.messages[convo.messages.length - 1]?.id ?? 0) + 1,
        from: 'admin',
        text,
        time: timeStr,
        date: dateStr,
      };

      convo.messages.push(newMsg);
      convo.lastMsg = text;
      convo.lastTime = 'just now';
      saveState({ conversations: state.conversations });

    
      if (convo.email) {
        const inbox = loadUserInbox(convo.email);
        const existing = inbox.find(c => c.id === conversationId);
        if (existing) {
          existing.messages.push(newMsg);
          existing.lastMsg = text;
          existing.lastTime = 'just now';
          existing.unread = true;
        } else {
          inbox.unshift({ ...convo, messages: [...convo.messages], unread: true });
        }
        saveUserInbox(convo.email, inbox);
        
        window.dispatchEvent(new Event('userInboxUpdated'));
      }
    },

    markAsRead: (state, action: PayloadAction<number>) => {
      const convo = state.conversations.find(c => c.id === action.payload);
      if (convo) {
        convo.unread = false;
        saveState({ conversations: state.conversations });
      }
    },

    deleteConversation: (state, action: PayloadAction<number>) => {
      state.conversations = state.conversations.filter(c => c.id !== action.payload);
      saveState({ conversations: state.conversations });
    },
  },
});

export const { reloadFromStorage, addContactMessage, sendAdminReply, markAsRead, deleteConversation } = messagesSlice.actions;
export default messagesSlice.reducer;
