import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private posts: any[] = [];

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    if (this.posts.length) {
      return of(this.posts);
    }
    return this.http.get<any[]>(this.postsUrl).pipe(
      tap(data => this.posts = data),
      catchError(this.handleError<any[]>('getPosts', []))
    );
  }

  addPost(post: any): Observable<any> {
    return this.http.post<any>(this.postsUrl, post).pipe(
      tap(newPost => this.posts.unshift(newPost)),
      catchError(this.handleError<any>('addPost'))
    );
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.posts = this.posts.filter(post => post.id !== id);
      }),
      catchError(this.handleError<any>('deletePost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}