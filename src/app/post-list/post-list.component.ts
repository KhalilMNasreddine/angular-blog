import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  error: string = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      data => this.posts = data,
      error => this.error = 'Failed to load posts'
    );
  }

  selectPost(post: any): void {
    this.router.navigate(['/post', post.id]);
  }

  deletePost(postId: number): void {
    this.posts = this.posts.filter(post => post.id !== postId);
    this.postService.deletePost(postId).subscribe(
      () => console.log(`Post ${postId} deleted`),
      error => console.error('Error deleting post', error)
    );
  }
}