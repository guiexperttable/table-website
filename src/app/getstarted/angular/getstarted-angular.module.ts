import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AngularLogoComponent } from "../../3p-logos/angular-logo.component";
import { MatButtonModule } from "@angular/material/button";
import { GetstartedAngularComponent } from "./getstarted-angular.component";
import { GeLogoModule } from "../../ge-logo/ge-logo.module";
import { TableComponent } from "@guiexpert/angular-table";
import { MatIconModule } from "@angular/material/icon";
import { PrismModule } from "../../common/prism.module";
import { CircleLetterModule } from "../../common/circle-letter.module";


const routes: Routes = [
  {
    path: "angular",
    component: GetstartedAngularComponent
  }
];

@NgModule({
  declarations: [
    GetstartedAngularComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeLogoModule,
    AngularLogoComponent,
    MatIconModule,
    MatButtonModule,
    TableComponent,
    PrismModule,
    CircleLetterModule
  ],
  exports: [RouterModule]
})
export class GetstartedAngularModule {
}
