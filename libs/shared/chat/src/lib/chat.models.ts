export interface Conversation {
  id: string;
  borrower_id: string;
  owner_id: string;
  other_user_name: string;
  other_user_role: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  status: 'SENT' | 'DELIVERED' | 'READ';
  created_at: string;
}

export interface TypingEvent {
  userId: string;
  conversationId: string;
}
