import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-export-dialog",
  templateUrl: "./export-dialog.component.html",
  styleUrls: ["./export-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportDialogComponent implements OnInit, OnDestroy {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
