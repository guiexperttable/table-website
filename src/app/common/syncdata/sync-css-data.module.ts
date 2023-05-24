import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SyncCssService } from "./sync-css.service";


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SyncCssService
  ]
})
export class SyncCssDataModule {
}
