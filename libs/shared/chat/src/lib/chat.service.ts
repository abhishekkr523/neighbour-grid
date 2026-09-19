import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '@neighbour-grid/websocket';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Conversation, Message, TypingEvent } from './chat.models';

export const CHAT_API_URL = new InjectionToken<string>('CHAT_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api/v1'
});

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl: string;
  
  // Real-time subjects
  private newMessageSubject = new Subject<Message>();
  public newMessage$ = this.newMessageSubject.asObservable();

  private typingStartedSubject = new Subject<TypingEvent>();
  public typingStarted$ = this.typingStartedSubject.asObservable();

  private typingStoppedSubject = new Subject<TypingEvent>();
  public typingStopped$ = this.typingStoppedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService,
    @Inject(CHAT_API_URL) apiUrl: string
  ) {
    this.apiUrl = apiUrl + '/chat';
    this.setupListeners();
  }

  private setupListeners() {
    this.wsService.events$.pipe(
      filter(e => e.event === 'new_message')
    ).subscribe(e => this.newMessageSubject.next(e.data));

    this.wsService.events$.pipe(
      filter(e => e.event === 'user_typing_started')
    ).subscribe(e => this.typingStartedSubject.next(e.data));

    this.wsService.events$.pipe(
      filter(e => e.event === 'user_typing_stopped')
    ).subscribe(e => this.typingStoppedSubject.next(e.data));
  }

  // REST API Calls
  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations`);
  }

  getConversation(borrowerId: string, ownerId: string): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/conversations`, { borrowerId, ownerId });
  }

  getMessages(conversationId: string, page: number = 1): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/conversations/${conversationId}/messages?page=${page}`);
  }

  markAsRead(conversationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/messages/${conversationId}/read`, {});
  }

  // WebSocket Emit Actions
  joinConversation(conversationId: string) {
    this.wsService.send('join_conversation', conversationId);
  }

  sendMessage(conversationId: string, message: string) {
    this.wsService.send('send_message', { conversationId, message });
  }

  typingStarted(conversationId: string) {
    this.wsService.send('typing_started', conversationId);
  }

  typingStopped(conversationId: string) {
    this.wsService.send('typing_stopped', conversationId);
  }
}
