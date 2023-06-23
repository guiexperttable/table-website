import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GeneratorComponent } from "./generator.component";
import { GeLogoModule } from "../ge-logo/ge-logo.module";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { GenerateClassesService } from "./generate-classes.service";


const routes: Routes = [
  {
    path: "",
    component: GeneratorComponent
  }
];

@NgModule({
  declarations: [
    GeneratorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeLogoModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    GenerateClassesService
  ],
  exports: [
    RouterModule
  ]
})
export class GeneratorModule {
}
