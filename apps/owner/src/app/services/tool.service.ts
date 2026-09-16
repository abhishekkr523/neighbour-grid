import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  price_per_day: number;
  security_deposit: number;
  is_active: boolean;
  address: string;
  latitude?: number;
  longitude?: number;
}

@Injectable({ providedIn: 'root' })
export class ToolService {
  private apiUrl = 'http://localhost:3000/api/v1/tools';

  constructor(private http: HttpClient) {}

  getMyListings(): Observable<{ tools: Tool[] }> {
    return this.http.get<{ tools: Tool[] }>(`${this.apiUrl}/my-listings`);
  }

  getTool(id: string): Observable<{ tool: Tool }> {
    return this.http.get<{ tool: Tool }>(`${this.apiUrl}/${id}`);
  }

  createTool(tool: Partial<Tool>): Observable<any> {
    return this.http.post(this.apiUrl, tool);
  }

  updateTool(id: string, tool: Partial<Tool>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, tool);
  }

  toggleActive(id: string, is_active: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/toggle`, { is_active });
  }

  deleteTool(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
