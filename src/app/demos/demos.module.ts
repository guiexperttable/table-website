import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DemosComponent } from "./demos.component";
import { GeLogoModule } from "../ge-logo/ge-logo.module";
import { BidiModule } from "@angular/cdk/bidi";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DemoSimpleComponent } from "./simple/demo-simple.component";
import { DemoSimpleInfoComponent } from "./simple/demo-simple-info.component";

const routes: Routes = [
  {
    path: "",
    component: DemosComponent
  },
  {
    path: "simple/run",
    component: DemoSimpleComponent
  },
  {
    path: "simple/info",
    component: DemoSimpleInfoComponent
  },
  {
    path: "", loadChildren: () =>
      import("../demos/rowandcolspan/demo-row-and-colspan.module").then(m => m.DemoRowAndColspanModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/rowandcolspan/demo-row-and-colspan.module").then(m => m.DemoRowAndColspanModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/timetable/timetable-demo.module").then(m => m.TimetableDemoModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/prizesdemo/prizes-demo.module").then(m => m.PrizesDemoModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/treetablepeople/treetable-people.module").then(m => m.TreetablePeopleModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/mouseevent/demo-mouseevent.module").then(m => m.DemoMouseeventModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/style/demo-style.module").then(m => m.DemoStyleModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/idfilter/demo-idfilter.module").then(m => m.DemoIdfilterModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/olympic/demo-olympic.module").then(m => m.DemoOlympicModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/headerdblclick/demo-headerdblclick.module").then(m => m.DemoHeaderdblclickModule)
  },
  {
    path: "", loadChildren: () =>
      import("../demos/cryptotop/crypto-top-100.module").then(m => m.CryptoTop100Module)
  }
];

@NgModule({
  declarations: [
    DemosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeLogoModule,
    BidiModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [RouterModule]
})
export class DemosModule {
}
