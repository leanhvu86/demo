import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AgmCoreModule } from '@agm/core';

import {
  DashedLineChartComponent,
  HeatmapChartComponent,
  IconsPageComponent,
  LineChartComponent,
  PieChartComponent,
  ImageComponent
} from './components';
import {
  ChartsPageComponent,
  MapPageComponent
} from './containers';
import { UiElementsRoutingModule } from './ui-elements-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ChartsService } from './services';
import { DashboardModule } from '../dashboard/dashboard.module';
import { googleMapKey } from './consts';
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  declarations: [
    IconsPageComponent,
    ChartsPageComponent,
    MapPageComponent,
    LineChartComponent,
    DashedLineChartComponent,
    PieChartComponent,
    HeatmapChartComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    UiElementsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    NgApexchartsModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: googleMapKey
    }),
    MatToolbarModule,
    SharedModule,
    DashboardModule,
    FileUploadModule,
  ],
  exports: [
    ImageComponent
  ],
  providers: [
    ChartsService
  ]
})
export class UiElementsModule { }
