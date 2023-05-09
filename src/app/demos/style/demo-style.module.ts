import { NgModule } from "@angular/core";

import { TableComponent } from "@guiexpert/angular-table";
import { DemoStyleComponent } from "./demo-style.component";
import { RouterModule } from "@angular/router";
import { DemoUltraComponent } from "./ultra/demo-ultra.component";
import { DemoUltraInfoComponent } from "./ultra/info/demo-ultra-info.component";
import { DemoStyleInfoComponent } from "./info/demo-style-info.component";
import { DemoHeatmapComponent } from "./heatmap/demo-heatmap.component";
import { DemoHeatmapInfoComponent } from "./heatmap/demo-heatmap-info.component";

@NgModule({
  declarations: [
    DemoStyleComponent,
    DemoUltraComponent,
    DemoHeatmapComponent,
    DemoHeatmapInfoComponent,
    DemoStyleInfoComponent,
    DemoUltraInfoComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "simple/run",
        component: DemoStyleComponent
      },
      {
        path: "simple/info",
        component: DemoStyleInfoComponent
      },
      {
        path: "heatmap/run",
        component: DemoHeatmapComponent
      },
      {
        path: "heatmap/info",
        component: DemoHeatmapInfoComponent
      },
      {
        path: "ultra/run",
        component: DemoUltraComponent
      },
      {
        path: "ultra/info",
        component: DemoUltraInfoComponent
      }
    ])
  ]
})
export class DemoStyleModule {
}
