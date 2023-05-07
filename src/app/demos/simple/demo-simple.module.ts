import { NgModule } from "@angular/core";
import { TableComponent } from "@guiexpert/angular-table";
import { RouterModule } from "@angular/router";
import { DemoSimpleComponent } from "./demo-simple.component";
import { DemoSimpleInfoComponent } from "./demo-simple-info.component";

@NgModule({
  declarations: [
    DemoSimpleComponent,
    DemoSimpleInfoComponent
  ],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "run",
        component: DemoSimpleComponent
      },
      {
        path: "info",
        component: DemoSimpleInfoComponent
      }
    ])
  ]
})
export class DemoSimpleModule {
}
