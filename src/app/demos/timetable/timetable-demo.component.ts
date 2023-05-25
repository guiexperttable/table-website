import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from "@angular/core";
import { TableApi, TableModelIf, TableOptionsIf } from "@guiexpert/table";
import { COL_IDX_UPDATED_AT, createTimeTableModel, tableOptions } from "@guiexpert/demo-table-models";
import { SyncCssService } from "../../common/syncdata/sync-css.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "timetable-demo",
  templateUrl: "./timetable-demo.component.html",
  styleUrls: ["./timetable-demo.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableDemoComponent implements OnInit {


  tableModel?: TableModelIf = createTimeTableModel();
  tableOptions: TableOptionsIf = tableOptions;
  running = true;
  @Input() freezeUi = false;

  private tableApi?: TableApi;
  private alive = true;
  private guiTable?: HTMLDivElement;


  constructor(
    private readonly syncCssService: SyncCssService,
    private readonly elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.guiTable = this.elementRef.nativeElement.querySelector("guiexpert-table");
    this.syncCssService
      .received$
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(this.syncCss.bind(this));
  }

  syncCss(arr: Array<[string, string]>) {
    arr.forEach(k => {
      this.guiTable?.style.setProperty(k[0], k[1]);
    });
    this.tableApi?.repaint();
  }

  onTableReady(api: TableApi) {
    this.tableApi = api;
    this.sendUpdateTableModelEvents();
  }

  sendUpdateTableModelEvents() {
    if (!this.running || !this.tableApi) {
      return; // skip
    }

    // normally we would do this:
    //    this.tableApi?.updateCells([new TableCellUpdateEvent("body", row, col, val)]);
    // but because we have to  calculate the footer cells we
    // do an update of the model directly and trigger a table repaint() at the end:
    if (!this.freezeUi) {
      const bodyModel = this.tableModel?.getBodyModel();
      const footerModel = this.tableModel?.getAreaModel("footer");
      if (this.tableApi && bodyModel && footerModel) {
        const eventCount = Math.round(1 + 3 * Math.random());
        const rowMax = (bodyModel?.getRowCount() ?? 0) - 1;
        const now = new Date();

        for (let i = 0; i < eventCount; i++) {
          const val = Math.floor(999 * Math.random());
          const col = this.rndm(4, COL_IDX_UPDATED_AT - 1);
          const row = this.rndm(0, rowMax);
          // Update value cell and timestamp cell:
          bodyModel.setValue(row, col, val);
          bodyModel.setValue(row, COL_IDX_UPDATED_AT, now);
        }
        // Calculate the column sum:
        for (let c = 4; c < COL_IDX_UPDATED_AT; c++) {
          let sum = 0;
          for (let r = 0; r < rowMax; r++) {
            sum = sum + bodyModel.getValueAt(r, c);
          }
          // Update footer:
          footerModel.setValue(0, c, sum);
        }
        this.tableApi.repaint();
      }
    }
    setTimeout(() => {
      requestAnimationFrame(this.sendUpdateTableModelEvents.bind(this));
    }, 16);
  }

  rndm(from: number, to: number) {
    return Math.min(to, Math.round(from + (to - from) * Math.random()));
  }
}
