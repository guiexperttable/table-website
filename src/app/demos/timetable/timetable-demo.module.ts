import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimetableDemoComponent } from "./timetable-demo.component";
import { TableComponent } from "@guiexpert/angular-table";
import { RouterModule } from "@angular/router";
import { DemoTimetableInfoComponent } from "./info/demo-timetable-info.component";


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
    ])
  ],
  exports: [
    TimetableDemoComponent
  ]
})
export class TimetableDemoModule {
}
