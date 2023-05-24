import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SyncCssService } from "../../../common/syncdata/sync-css.service";
import { CustomThemeComponent } from "../custom-theme.component";
import { TableOptions } from "@guiexpert/table";

@Component({
  selector: "app-small-custom-theme",
  templateUrl: "../custom-theme.component.html",
  styleUrls: ["./small-custom-theme.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallCustomThemeComponent extends CustomThemeComponent {


  constructor(
    public override readonly dialog: MatDialog,
    protected override readonly elementRef: ElementRef,
    protected override readonly cdr: ChangeDetectorRef,
    protected override readonly syncCssService: SyncCssService
  ) {
    super(dialog, elementRef, cdr, syncCssService);
    this.bigScreen = false;
    this.tableOptions = {
      ...new TableOptions(),
      hoverColumnVisible: false,
      columnsDraggable: false,
      externalFilterFunction: this.filterFn.bind(this)
    };
    this.theme = "dark";
    this.light = false;
  }

}
