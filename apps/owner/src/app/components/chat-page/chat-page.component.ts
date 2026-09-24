import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, Conversation, Message } from '@neighbour-grid/chat';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  ownerId = 'owner-456'; // Mock owner ID
  conversations: Conversation[] = [];
  activeConversation: Conversation | null = null;
  messages: Message[] = [];
  newMessage = '';
  isTyping = false;
  
  private subs: Subscription = new Subscription();
  private typingTimeout: any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadConversations();

    this.subs.add(
      this.chatService.newMessage$.subscribe((message: Message) => {
        if (this.activeConversation && message.conversation_id === this.activeConversation.id) {
          this.messages.push(message);
          this.chatService.markAsRead(this.activeConversation.id).subscribe();
        } else {
          // Increment unread count for other conversations
          const conv = this.conversations.find(c => c.id === message.conversation_id);
          if (conv) conv.unread_count++;
        }
      })
    );

    this.subs.add(
      this.chatService.typingStarted$.subscribe((event: any) => {
        if (this.activeConversation && event.conversationId === `rental_${this.activeConversation.reservation_id}` && event.userId !== this.ownerId) {
          this.isTyping = true;
        }
      })
    );

    this.subs.add(
      this.chatService.typingStopped$.subscribe((event: any) => {
        if (this.activeConversation && event.conversationId === `rental_${this.activeConversation.reservation_id}` && event.userId !== this.ownerId) {
          this.isTyping = false;
        }
      })
    );
  }

  loadConversations() {
    this.chatService.getConversations().subscribe({
      next: (convs: Conversation[]) => this.conversations = convs,
      error: (err: any) => console.error('Failed to load conversations', err)
    });
  }

  selectConversation(conv: Conversation) {
    this.activeConversation = conv;
    conv.unread_count = 0;
    this.chatService.joinConversation(conv.reservation_id);
    this.loadMessages();
  }

  loadMessages() {
    if (!this.activeConversation) return;
    this.chatService.getMessages(this.activeConversation.id, 1).subscribe({
      next: (msgs: Message[]) => {
        this.messages = msgs;
        this.chatService.markAsRead(this.activeConversation!.id).subscribe();
      },
      error: (err: any) => console.error('Failed to load messages', err)
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.activeConversation) return;
    
    this.chatService.sendMessage(this.activeConversation.reservation_id, this.activeConversation.id, this.newMessage);
    this.newMessage = '';
    this.stopTyping();
  }

  onTyping() {
    if (!this.activeConversation) return;
    this.chatService.typingStarted(this.activeConversation.reservation_id);
    
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.stopTyping();
    }, 2000);
  }

  stopTyping() {
    if (this.activeConversation) {
      this.chatService.typingStopped(this.activeConversation.reservation_id);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
