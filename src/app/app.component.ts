import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedPost: any;

  onPostSelected(post: any): void {
    this.selectedPost = post;
  }
}