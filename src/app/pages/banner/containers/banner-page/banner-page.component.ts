import { Component } from '@angular/core';
import { Banner } from '../../models/banner';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-banner-page',
  templateUrl: './banner-page.component.html',
  styleUrls: ['./banner-page.component.scss']
})
export class BannerPageComponent {

  public routes: typeof routes = routes;

  private collection: Banner[] = [];
}
