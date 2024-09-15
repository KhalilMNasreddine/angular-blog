import { Component } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  title: string = '';
  body: string = '';

  constructor(private postService: PostService) {}

  addPost(): void {
    const newPost = { title: this.title, body: this.body };
    this.postService.addPost(newPost).subscribe(
      response => {
        console.log('Post added', response);
        this.title = '';
        this.body = '';
      },
      error => console.error('Error adding post', error)
    );
  }
}