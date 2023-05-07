import { NgModule } from "@angular/core";

import { TableComponent } from "@guiexpert/angular-table";
import { CryptoTop100Component } from "./crypto-top-100.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [CryptoTop100Component],
  imports: [
    HttpClientModule,
    CommonModule,
    TableComponent,
    RouterModule.forChild([
      {
        path: "",
        component: CryptoTop100Component
      }
    ]),
    MatInputModule,
    MatFormFieldModule,
    FormsModule

  ],
  exports: [
    CryptoTop100Component
  ],
  providers: [],
  bootstrap: [CryptoTop100Component]
})
export class CryptoTop100Module {
}
