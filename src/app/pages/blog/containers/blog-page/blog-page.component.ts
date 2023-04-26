import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {

  public routes: typeof routes = routes;

  private collection: Blog[] = [];
}
