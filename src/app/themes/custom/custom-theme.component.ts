import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit
} from "@angular/core";
import { OkLch } from "../data/ok-lch";
import {
  AreaModelObjectyArray,
  GeFilterService,
  SelectionModel,
  TableApi,
  TableModelIf,
  TableOptions,
  TableOptionsIf
} from "@guiexpert/table";
import { createThemeTableModel } from "../data/createThemeTableModel";
import { ThemeRowIf } from "../data/theme-row.If";
import { debounceTime, takeWhile } from "rxjs";
import { ExportDialogComponent } from "./exportdialog/export-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-custom-theme",
  templateUrl: "./custom-theme.component.html",
  styleUrls: ["./custom-theme.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomThemeComponent implements OnInit, OnDestroy {

  public theme = "light";
  public light = true;
  public arr = [
    [100, 0.2],
    [95, 0.2],
    [90, 0.2],
    [85, 0.2],
    [80, 0.2],
    [75, 0.2],
    [70, 0.25],
    [65, 0.31],
    [60, 0.27],
    [55, 0.27],
    [50, 0.27],
    [45, 0.25],
    [40, 0.25],
    [35, 0.25],
    [30, 0.2],
    [25, 0.2],
    [20, 0.2],
    [15, 0.2],
    [10, 0.2],
    [5, 0.2]
  ];
  public hueValues: number[] = [];
  public percentages: number[] = [];
  public chromas: number[] = [];

  public okLch = new OkLch(50, .27, 266, 100);
  public url = "";
  public cssString = "";
  selectedCount = 0;

  filterText = "+body + bg"; // try: 'xxx lamu'

  readonly selectionModel = new SelectionModel("row", "multi");
  tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    columnsDraggable: false,
    getSelectionModel: () => this.selectionModel,
    externalFilterFunction: this.filterFn.bind(this)
  };
  tableModel: TableModelIf = createThemeTableModel(this.tableOptions);

  public selectedHtml5PickerColor: string = "#000000";
  private filterService = new GeFilterService();
  private tableApi?: TableApi;
  private filter$ = new EventEmitter<number>();
  private alive = true;
  private guiTable?: HTMLDivElement;


  constructor(
    // @Inject(DOCUMENT) private readonly document: Document,
    public readonly dialog: MatDialog,
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) {
    for (let i = 0; i < 100; i++) {
      this.hueValues.push(i * 3.6);
    }
    for (let i = 0; i < 100; i++) {
      this.percentages.push(i);
    }
    for (let i = 0; i < 100; i++) {
      this.chromas.push(0.333 / 100 * i);
    }
  }

  ngOnInit(): void {
    this.calc();
    this.filter$
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(400)
      )
      .subscribe(() => {
        this.tableApi?.externalFilterChanged();
      });
    this.guiTable = this.elementRef.nativeElement.querySelector("guiexpert-table");
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onKeyup() {
    this.unSelectAll();
    this.filter$.next(Date.now());
  }

  setFilter(text: string) {
    this.unSelectAll();
    this.filterText = text;
    this.filter$.next(Date.now());
  }

  onTableReady($event: TableApi) {
    this.tableApi = $event;
    if (this.filterText) {
      this.tableApi?.externalFilterChanged();
    }
  }

  setTheme(m: "light" | "dark") {
    this.theme = m;
    this.light = m === "light";
    this.cdr.detectChanges();
  }

  setOkLch(l: number, c: number, h: number, a: number = 100) {
    this.okLch = new OkLch(l, c, h, a);
    this.calc();
  }

  formatLabelHue(value: number): string {
    return `Hue:${value}deg`;
  }

  formatLabelAlpha(value: number): string {
    return `a:${value}`;
  }

  formatLabelChroma(value: number): string {
    return `c:${value}`;
  }

  formatLabelLightness(value: number): string {
    return `l:${value}`;
  }


  onSliderChangedHue(h: number) {
    this.okLch.h = h;
    this.calc();
  }

  onSliderChangedAlpha(a: number) {
    this.okLch.a = a;
    this.calc();
  }

  onSliderChangedChroma(c: number) {
    this.okLch.c = c;
    this.calc();
  }

  onSliderChangedLightness(l: number) {
    this.okLch.l = l;
    this.calc();
  }

  calc() {
    this.setCssString(this.okLch.toCssString());
  }

  colorPickerChanged($event: Event) {
    if (($event.target as HTMLInputElement).value) {
      this.selectedHtml5PickerColor = ($event.target as HTMLInputElement).value;
      this.setCssString(this.selectedHtml5PickerColor);
      this.cdr.detectChanges();
    }
  }

  selectVisible() {
    const m = this.tableModel.getBodyModel() as AreaModelObjectyArray<ThemeRowIf>;
    const rows = m.getFilteredRows();
    for (const row of rows) {
      row.selected = true;
    }
    this.cdr.detectChanges();
    if (this.tableApi) {
      this.tableApi.repaint();
    }
    this.selectedCount = m.getAllRows().filter(r => r.selected).length;
    this.cdr.detectChanges();
  }

  unSelectAll() {
    const m = this.tableModel.getBodyModel() as AreaModelObjectyArray<ThemeRowIf>;
    const rows = m.getAllRows();
    for (const row of rows) {
      row.selected = false;
    }
    if (this.tableApi) {
      this.tableApi.repaint();
    }
    this.selectedCount = 0;
    this.cdr.detectChanges();
  }

  exportCss() {
    const m = this.tableModel.getBodyModel() as AreaModelObjectyArray<ThemeRowIf>;
    const rows = m.getAllRows();
    const buf: string[] = [":root [data-theme= \"light\"] {"];
    for (const row of rows) {
      const key = row.id;
      const val = row.value;
      buf.push(`  ${key}: ${val}`);
    }
    buf.push("}");

    this.dialog.open(ExportDialogComponent, {
      height: "calc(100vh - 100px)",
      minHeight: "calc(100vh - 100px)",
      maxHeight: "calc(100vh - 100px)",
      width: "min(1000px, 100vw)",
      data: { text: buf.join("\n") },
      restoreFocus: false
    });
  }

  private setCssString(css: string) {
    this.cssString = css;
    if (this.cssString.includes("oklch")) {
      this.url = "https://oklch.com/#" + this.okLch.l + "," + this.okLch.c + "," + this.okLch.h + "," + this.okLch.a;
    } else {
      this.url = "";
    }
    this.cdr.detectChanges();
    this.syncCssVars();
  }

  private filterFn(t: ThemeRowIf, _index: number, _array: ThemeRowIf[]) {
    return this.filterService.filterPredict<ThemeRowIf>(t, this.filterText, t => t.id);
  }

  private syncCssVars() {
    const m = this.tableModel.getBodyModel() as AreaModelObjectyArray<ThemeRowIf>;
    const selectedRows = m.getAllRows().filter(r => r.selected);

    selectedRows.forEach(r => {
      r.value = this.cssString;
      this.guiTable?.style.setProperty(r.id, this.cssString);
    });
    this.tableApi?.repaint();
  }
}
