import { Component } from '@angular/core';
import { Package } from '../../models/package';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.scss']
})
export class PackagePageComponent {

  public routes: typeof routes = routes;

  private collection: Package[] = [];
}
