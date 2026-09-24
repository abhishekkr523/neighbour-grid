import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChatService, Conversation, Message } from "@neighbour-grid/chat";
import { Subscription } from "rxjs";

@Component({
  selector: "app-chat-ui",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./chat-ui.component.html",
  styleUrls: ["./chat-ui.component.scss"],
})
export class ChatUIComponent implements OnInit, OnDestroy {
  @Input() ownerId!: string;
  @Input() borrowerId!: string;
  @Input() reservationId!: string;
  @Input() toolId!: string;

  conversation: Conversation | null = null;
  messages: Message[] = [];
  newMessage = "";
  isTyping = false;

  private subs: Subscription = new Subscription();
  private typingTimeout: any;

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadConversation();

    this.subs.add(
      this.chatService.newMessage$.subscribe((message: Message) => {
        console.log("🔥 MESSAGE RECEIVED:", message);
        if (
          this.conversation &&
          message.conversation_id === this.conversation.id
        ) {
          this.messages.push(message);
          this.cdr.detectChanges();
          console.log("🔥 MESSAGES ARRAY:", this.messages);

          this.chatService.markAsRead(this.conversation.id).subscribe();
        }
      }),
    );

    this.subs.add(
      this.chatService.typingStarted$.subscribe((event: any) => {
        if (
          this.conversation &&
          event.conversationId ===
            `rental_${this.conversation.reservation_id}` &&
          event.userId !== this.borrowerId
        ) {
          this.isTyping = true;
        }
      }),
    );

    this.subs.add(
      this.chatService.typingStopped$.subscribe((event: any) => {
        if (
          this.conversation &&
          event.conversationId ===
            `rental_${this.conversation.reservation_id}` &&
          event.userId !== this.borrowerId
        ) {
          this.isTyping = false;
        }
      }),
    );
  }

  loadConversation() {
    if (!this.reservationId || !this.toolId) return;
    this.chatService
      .getConversation(
        this.reservationId,
        this.toolId,
        this.borrowerId,
        this.ownerId,
      )
      .subscribe({
        next: (conv: Conversation) => {
          this.conversation = conv;
          this.chatService.joinConversation(conv.reservation_id);
          this.loadMessages();
        },
        error: (err: any) => console.error("Failed to load conversation", err),
      });
  }

  loadMessages() {
    if (!this.conversation) return;
    this.chatService.getMessages(this.conversation.id, 1).subscribe({
      next: (msgs: Message[]) => {
        this.messages = msgs;
        this.chatService.markAsRead(this.conversation!.id).subscribe();
      },
      error: (err: any) => console.error("Failed to load messages", err),
    });
  }

  sendMessage() {
    console.log("Sending message:", this.newMessage);
    if (!this.newMessage.trim() || !this.conversation) return;

    this.chatService.sendMessage(
      this.conversation.reservation_id,
      this.conversation.id,
      this.newMessage,
    );
    this.newMessage = "";
    this.stopTyping();
  }

  onTyping() {
    if (!this.conversation) return;
    this.chatService.typingStarted(this.conversation.reservation_id);

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.stopTyping();
    }, 2000);
  }

  stopTyping() {
    if (this.conversation) {
      this.chatService.typingStopped(this.conversation.reservation_id);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
