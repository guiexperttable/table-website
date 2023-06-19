import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { Welcome2Component } from "./welcome2.component";
import { GeLogoModule } from "../../ge-logo/ge-logo.module";
import { AngularLogoComponent } from "../../3p-logos/angular-logo.component";
import { VueLogoComponent } from "../../3p-logos/vue-logo.component";
import { PreactLogoComponent } from "../../3p-logos/preact-logo.component";
import { SvelteLogoComponent } from "../../3p-logos/svelte-logo.component";
import { SolidLogoComponent } from "../../3p-logos/solid-logo.component";
import { WebComponentLogoComponent } from "../../3p-logos/web-component-logo.component";
import { JsLogoComponent } from "../../3p-logos/js-logo.component";
import { ReactLogoComponent } from "../../3p-logos/react-logo.component";
import { MatDividerModule } from "@angular/material/divider";
import { TimetableDemoModule } from "../../demos/timetable/timetable-demo.module";
import { MatButtonModule } from "@angular/material/button";
import { CryptoTop100Module } from "../../demos/cryptotop/crypto-top-100.module";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import {GeTypewriterModule} from "../../common/ge-typewriter/ge-typewriter.module";
import { GetstartedModule } from "../../getstarted/getstarted.module";
import { WelcomeDemoModule } from "../welcome-demo/welcome-demo.module";
import { WelcomeSectionCellStyleComponent } from "../section-cell-style/welcome-section-cell-style.component";
import { WelcomeSectionFeaturesComponent } from "../section-features/welcome-section-features.component";
import { WelcomeSectionInteractionComponent } from "../section-interaction/welcome-section-interaction.component";
import { WelcomeSectionLicenseComponent } from "../section-license/welcome-section-license.component";
import { WelcomeSectionUsabilityComponent } from "../section-usability/welcome-section-usability.component";


const routes: Routes = [
  {
    path: "",
    component: Welcome2Component
  }
];

@NgModule({
  declarations: [
    Welcome2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeLogoModule,
    AngularLogoComponent,
    VueLogoComponent,
    PreactLogoComponent,
    SvelteLogoComponent,
    SolidLogoComponent,
    WebComponentLogoComponent,
    JsLogoComponent,
    ReactLogoComponent,
    TimetableDemoModule,
    MatDividerModule,
    MatButtonModule,
    CryptoTop100Module,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    GeTypewriterModule,
    GetstartedModule,
    WelcomeDemoModule,
    WelcomeSectionCellStyleComponent,
    WelcomeSectionFeaturesComponent,
    WelcomeSectionInteractionComponent,
    WelcomeSectionLicenseComponent,
    WelcomeSectionUsabilityComponent
  ],
  exports: [RouterModule]
})
export class Welcome2Module {
}
