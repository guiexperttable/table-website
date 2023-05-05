import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { GetstartedSvelteComponent } from "./getstarted-svelte.component";
import { GeLogoModule } from "../../ge-logo/ge-logo.module";
import { TableComponent } from "@guiexpert/angular-table";
import { MatIconModule } from "@angular/material/icon";
import { SvelteLogoComponent } from "../../3p-logos/svelte-logo.component";


const routes: Routes = [
  {
    path: "svelte",
    component: GetstartedSvelteComponent
  }
];

@NgModule({
  declarations: [
    GetstartedSvelteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeLogoModule,
    SvelteLogoComponent,
    MatIconModule,
    MatButtonModule,
    TableComponent
  ],
  exports: [RouterModule]
})
export class GetstartedSvelteModule {
}
