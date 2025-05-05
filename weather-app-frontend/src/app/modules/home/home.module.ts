import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./components/home/home.component";
import {TemperatureCardComponent} from "./components/temperature-card/temperature-card.component";
import {PrecipitationComponent} from "./components/precipitation/precipitation.component";
import {
  PrecipitationProbabilityComponent
} from "./components/precipitation-probability/precipitation-probability.component";
import {UvIndexComponent} from "./components/uv-index/uv-index.component";
import {ApparentTemperatureComponent} from "./components/apparent-temperature/apparent-temperature.component";
import {VisibilityComponent} from "./components/visibility/visibility.component";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    HomeComponent,
    TemperatureCardComponent,
    PrecipitationComponent,
    PrecipitationProbabilityComponent,
    UvIndexComponent,
    ApparentTemperatureComponent,
    VisibilityComponent
  ],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [
    HomeComponent,
    TemperatureCardComponent,
    PrecipitationComponent,
    PrecipitationProbabilityComponent,
    UvIndexComponent,
    ApparentTemperatureComponent,
    VisibilityComponent
  ]
})
export class HomeModule { }
