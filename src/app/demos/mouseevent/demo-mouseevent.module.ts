import { NgModule } from "@angular/core";

import { TableComponent } from "@guiexpert/angular-table";
import { DemoMouseeventComponent } from "./demo-mouseevent.component";
import { RouterModule } from "@angular/router";
import { DemoMouseeventInfoComponent } from "./info/demo-mouseevent-info.component";
import { NgIf } from "@angular/common";

@NgModule({
  declarations: [DemoMouseeventComponent, DemoMouseeventInfoComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "run",
        component: DemoMouseeventComponent
      },
      {
        path: "info",
        component: DemoMouseeventInfoComponent
      }
    ]),
    NgIf
  ]
})
export class DemoMouseeventModule {
}
