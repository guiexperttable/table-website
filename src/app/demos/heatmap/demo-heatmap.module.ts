import { NgModule } from "@angular/core";
import { TableComponent } from "@guiexpert/angular-table";
import { RouterModule } from "@angular/router";
import { DemoHeatmapComponent } from "./demo-heatmap.component";
import { DemoHeatmapInfoComponent } from "./demo-heatmap-info.component";

@NgModule({
  declarations: [
    DemoHeatmapComponent,
    DemoHeatmapInfoComponent
  ],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "run",
        component: DemoHeatmapComponent
      },
      {
        path: "info",
        component: DemoHeatmapInfoComponent
      }
    ])
  ]
})
export class DemoHeatmapModule {
}
