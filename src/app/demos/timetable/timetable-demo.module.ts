import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimetableDemoComponent } from "./timetable-demo.component";
import { TableComponent } from "@guiexpert/angular-table";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    TimetableDemoComponent
  ],
  imports: [
    CommonModule,
    TableComponent,
    RouterModule.forChild([
      {
        path: "",
        component: TimetableDemoComponent
      }
    ])
  ],
  providers: [],
  exports: [
    TimetableDemoComponent
  ]
})
export class TimetableDemoModule {
}
