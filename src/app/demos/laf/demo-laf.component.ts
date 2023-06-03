import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { TableApi, TableModelIf } from "@guiexpert/table";
import { generateSimpleModel } from "@guiexpert/demo-table-models";
import { SyncCssService } from "../../common/syncdata/sync-css.service";


@Component({
  selector: "demo-laf",
  templateUrl: "./demo-laf.component.html",

  styles: [`
    :host {
      display: grid;
      grid-template-rows: 1fr;
    }
    .header {
      padding: 12px;
      display: flex;
      gap: 12px;
      background-color: var(--ge-table-doc-demo-color);
    }
    guiexpert-table {
      margin: 0;
      width: 100%;
      height: calc(100vh - 220px);
    }
  `]
})
export class DemoLafComponent implements OnInit, OnDestroy {

  tableModel: TableModelIf = generateSimpleModel(100, 100);

  private tableApi?: TableApi;
  private alive = true;


  constructor(
    private readonly elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    const m = location.pathname.match(/\/demo\/(.*?)\/run/);
    if (m && m[1]) {
      new SyncCssService(m[1]).sync(this.elementRef.nativeElement, () => this.tableApi, () => this.alive);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onTableReady(api: TableApi) {
    this.tableApi = api;
  }

  openCustomThemePicker() {
    const m = location.pathname.match(/\/demo\/(.*?)\/run/);
    const p = m ? "#" + m[1] : "";
    window.open(
      "http://localhost:4200/themes/custom/picker" + p,
      "_blank",
      "left=100,top=100,width=720,height=755,location=0,scrollbars=0,status=0");
  }

}

