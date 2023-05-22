import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-export-dialog",
  templateUrl: "./export-dialog.component.html",
  styleUrls: ["./export-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportDialogComponent implements OnInit, OnDestroy {

  public static DLG_OPTIONS = {
    height: "calc(100vh - 100px)",
    minHeight: "calc(100vh - 100px)",
    maxHeight: "calc(100vh - 100px)",
    width: "min(1000px, 100vw)",
    restoreFocus: false,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
