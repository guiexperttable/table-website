import { NgModule } from "@angular/core";
import { TableComponent } from "@guiexpert/angular-table";
import { DemoRowAndColspanComponent } from "./demo-row-and-colspan.component";
import { RouterModule } from "@angular/router";
import { DemoRowAndColspanInfoComponent } from "./info/demo-row-and-colspan-info.component";

@NgModule({
  declarations: [DemoRowAndColspanComponent, DemoRowAndColspanInfoComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "run",
        component: DemoRowAndColspanComponent
      },
      {
        path: "info",
        component: DemoRowAndColspanInfoComponent
      }
    ])
  ]
})
export class DemoRowAndColspanModule {
}
