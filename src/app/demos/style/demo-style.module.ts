import { NgModule } from "@angular/core";

import { TableComponent } from "@guiexpert/angular-table";
import { DemoStyleComponent } from "./demo-style.component";
import { RouterModule } from "@angular/router";
import { DemoUltraComponent } from "./ultra/demo-ultra.component";
import { DemoUltraInfoComponent } from "./ultra/info/demo-ultra-info.component";
import { DemoStyleInfoComponent } from "./info/demo-style-info.component";

@NgModule({
  declarations: [DemoStyleComponent, DemoUltraComponent, DemoStyleInfoComponent, DemoUltraInfoComponent],
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
