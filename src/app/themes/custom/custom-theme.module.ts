import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CustomThemeComponent } from "./custom-theme.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { GeLogoModule } from "../../ge-logo/ge-logo.module";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";


const routes: Routes = [
  {
    path: "",
    component: CustomThemeComponent
  }
];

@NgModule({
  declarations: [
    CustomThemeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    MatButtonModule,
    MatSliderModule,
    ReactiveFormsModule,
    GeLogoModule,
    MatIconModule
  ],
  exports: [RouterModule]
})
export class CustomThemeModule {
}
