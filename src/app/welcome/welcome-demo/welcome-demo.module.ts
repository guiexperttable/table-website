import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { WelcomeDemoComponent } from "./welcome-demo.component";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TimetableDemoModule } from "../../demos/timetable/timetable-demo.module";
import { MatButtonModule } from "@angular/material/button";
import { CryptoTop100Module } from "../../demos/cryptotop/crypto-top-100.module";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    WelcomeDemoComponent
  ],
  imports: [
    CommonModule,
    TimetableDemoModule,
    MatButtonModule,
    CryptoTop100Module,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    RouterModule
  ],
  exports: [WelcomeDemoComponent]
})
export class WelcomeDemoModule {
}
