import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { GetstartedSolidComponent } from "./getstarted-solid.component";
import { GeLogoModule } from "../../ge-logo/ge-logo.module";
import { TableComponent } from "@guiexpert/angular-table";
import { MatIconModule } from "@angular/material/icon";
import { SolidLogoComponent } from "../../3p-logos/solid-logo.component";
import { SourceCodeModule } from "../../common/code/source-code.module";


const routes: Routes = [
  {
    path: "solid",
    component: GetstartedSolidComponent
  }
];

@NgModule({
  declarations: [
    GetstartedSolidComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeLogoModule,
    SolidLogoComponent,
    MatIconModule,
    MatButtonModule,
    TableComponent,
    SourceCodeModule
  ],
  exports: [RouterModule]
})
export class GetstartedSolidModule {
}
