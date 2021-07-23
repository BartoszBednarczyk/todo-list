import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../components/board/board';
const baseUrl = 'http://localhost:5000/api/boards';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Board[]> {
    return this.http.get<Board[]>(baseUrl);
  }

  get(id: any): Observable<Board> {
    return this.http.get<Board>(`${baseUrl}/${id}`);
  }

  create(data: Board): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
