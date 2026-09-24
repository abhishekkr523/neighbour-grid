import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChatService } from "../chat.service";
import { Conversation, Message } from "../chat.models";
import { Subscription } from "rxjs";

@Component({
  selector: "lib-chat",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./chat.html",
  styleUrl: "./chat.css",
})
export class Chat implements OnInit, OnDestroy {
  conversations: Conversation[] = [];
  activeConversation: Conversation | null = null;
  messages: Message[] = [];
  newMessage = "";
  currentUserId: string = "";
  isTyping = false;
  private typingTimeout: any;

  private subs: Subscription = new Subscription();

  constructor(
    private chatService: ChatService,
    private cdf: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Attempt to get user from localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      const userString = localStorage.getItem("ng_user");
      if (userString) {
        try {
          this.currentUserId = JSON.parse(userString).id;
        } catch (e) {
          console.error("Failed to parse ng_user from localStorage", e);
        }
      }
    }

    this.loadConversations();

    this.subs.add(
      this.chatService.newMessage$.subscribe((msg: Message) => {
        // if message belongs to active conv, add it
        if (
          this.activeConversation &&
          msg.conversation_id === this.activeConversation.id
        ) {
          this.messages.push(msg);
          // scroll to bottom could be implemented here
          this.chatService.markAsRead(this.activeConversation.id).subscribe();
        }

        // update last_message in conversation list
        const conv = this.conversations.find(
          (c) => c.id === msg.conversation_id,
        );
        if (conv) {
          conv.last_message = msg.message;
          conv.last_message_time = msg.created_at;
          if (
            !this.activeConversation ||
            conv.id !== this.activeConversation.id
          ) {
            conv.unread_count = (conv.unread_count || 0) + 1;
          }
          // Move this conversation to the top
          this.conversations = [
            conv,
            ...this.conversations.filter((c) => c.id !== conv.id),
          ];
          this.cdf.detectChanges();
          console.log("Updated conversatiosns:", this.conversations);
        } else {
          // fetch conversations again to get new conv
          this.loadConversations();
        }
      }),
    );

    this.subs.add(
      this.chatService.typingStarted$.subscribe((event: any) => {
        if (
          this.activeConversation &&
          event.conversationId ===
            `rental_${this.activeConversation.reservation_id}` &&
          event.userId !== this.currentUserId
        ) {
          this.isTyping = true;
          this.cdf.detectChanges();
        }
      }),
    );

    this.subs.add(
      this.chatService.typingStopped$.subscribe((event: any) => {
        if (
          this.activeConversation &&
          event.conversationId ===
            `rental_${this.activeConversation.reservation_id}` &&
          event.userId !== this.currentUserId
        ) {
          this.isTyping = false;
          this.cdf.detectChanges();
        }
      }),
    );
    console.log("final", this.conversations);
  }

  loadConversations() {
    console.log("Loading conversations...");
    this.chatService.getConversations().subscribe({
      next: (convs) => {
        console.log("Conversations loaded:", convs);
        this.conversations = convs;
        this.cdf.detectChanges();
      },
      error: (err) => console.error("Failed to load conversations", err),
    });
  }

  selectConversation(conv: Conversation) {
    this.activeConversation = conv;
    this.chatService.joinConversation(conv.reservation_id);
    this.messages = [];
    this.loadMessages();

    // reset unread count
    conv.unread_count = 0;
  }

  loadMessages() {
    if (!this.activeConversation) return;
    this.chatService.getMessages(this.activeConversation.id, 1).subscribe({
      next: (msgs) => {
        // usually messages come sorted by created_at desc, so we might need to reverse to show oldest at top, newest at bottom
        // Depends on backend implementation. Let's assume they are already sorted oldest first, or newest first.
        // Let's reverse them just in case they are newest first. Let's log it.
        this.messages = msgs;
        // if msgs[0] is newest, we should reverse.
        if (
          msgs.length > 1 &&
          new Date(msgs[0].created_at).getTime() >
            new Date(msgs[msgs.length - 1].created_at).getTime()
        ) {
          this.messages = msgs.reverse();
        }

        this.chatService.markAsRead(this.activeConversation!.id).subscribe();
        this.cdf.detectChanges();
      },
      error: (err) => console.error("Failed to load messages", err),
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.activeConversation) return;
    this.chatService.sendMessage(
      this.activeConversation.reservation_id,
      this.activeConversation.id,
      this.newMessage,
    );
    this.newMessage = "";
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
