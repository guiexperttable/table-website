import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimetableDemoComponent } from "./timetable-demo.component";
import { TableComponent } from "@guiexpert/angular-table";
import { RouterModule } from "@angular/router";
import { DemoTimetableInfoComponent } from "./info/demo-timetable-info.component";
import { SyncCssDataModule } from "../../common/syncdata/sync-css-data.module";


@NgModule({
  declarations: [
    TimetableDemoComponent, DemoTimetableInfoComponent
  ],
  imports: [
    CommonModule,
    TableComponent,
    RouterModule.forChild([
      {
        path: "run",
        component: TimetableDemoComponent
      },
      {
        path: "info",
        component: DemoTimetableInfoComponent
      }
    ]),
    SyncCssDataModule
  ],
  exports: [
    TimetableDemoComponent
  ]
})
export class TimetableDemoModule {
}
