import { NgModule } from "@angular/core";
import { SourceCodeComponent } from "./source-code.component";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { PrismModule } from "../prism.module";

@NgModule({
  declarations: [SourceCodeComponent],
  imports: [
    CommonModule,
    ClipboardModule,
    MatButtonModule,
    MatIconModule,
    PrismModule
  ],
  exports: [SourceCodeComponent]
})
export class SourceCodeModule {
}
