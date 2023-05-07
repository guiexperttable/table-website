import { NgModule } from "@angular/core";

import { TableComponent } from "@guiexpert/angular-table";
import { TreetablePeopleComponent } from "./treetable-people.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [TreetablePeopleComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    TableComponent,
    RouterModule.forChild([
      {
        path: "",
        component: TreetablePeopleComponent
      }
    ]),
    MatInputModule,
    MatFormFieldModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [TreetablePeopleComponent]
})
export class TreetablePeopleModule {
}
