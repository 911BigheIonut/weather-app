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
import {HistoricalDataComponent} from "./components/historical-data/historical-data.component";
import {CitySearchbarComponent} from "./components/city-searchbar/city-searchbar.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {
  TemperatureUnitSelectorComponent
} from "./components/temperature-unit-selector/temperature-unit-selector.component";
import {RadioButtonModule} from "primeng/radiobutton";


@NgModule({
  declarations: [
    HomeComponent,
    TemperatureCardComponent,
    PrecipitationComponent,
    PrecipitationProbabilityComponent,
    UvIndexComponent,
    ApparentTemperatureComponent,
    VisibilityComponent,
    HistoricalDataComponent,
    CitySearchbarComponent,
    TemperatureUnitSelectorComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    AutoCompleteModule,
    FormsModule,
    RadioButtonModule,
  ],
  exports: [
    HomeComponent,
    TemperatureCardComponent,
    PrecipitationComponent,
    PrecipitationProbabilityComponent,
    UvIndexComponent,
    ApparentTemperatureComponent,
    VisibilityComponent,
    HistoricalDataComponent,
    CitySearchbarComponent,
    TemperatureUnitSelectorComponent
  ]
})
export class HomeModule { }
