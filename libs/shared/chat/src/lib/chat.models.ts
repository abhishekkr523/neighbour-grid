export interface Conversation {
  id: string;
  reservation_id: string;
  tool_id: string;
  tool_title?: string;
  tool_is_active?: boolean;
  tool_deleted_at?: string;
  rental_status?: string;
  borrower_id: string;
  owner_id: string;
  status: string;
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
