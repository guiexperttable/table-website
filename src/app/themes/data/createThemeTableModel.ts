import {
  AreaIdent,
  AreaModelIf,
  CellRendererIf,
  CheckboxBooleanPropertyCellRenderer,
  ColumnDef,
  ColumnDefIf,
  DomServiceIf,
  px50,
  px60,
  RendererCleanupFnType,
  Size,
  TableModelFactory,
  TableModelIf,
  TableOptions
} from "@guiexpert/table";
import { OkLch } from "./ok-lch";
import { ThemeRowIf } from "./theme-row.If";
import { ThemeRow } from "./theme-row";

const COLOR_VARS = `
:root [data-theme= "light"] {

  --ge-table-header-west-bg: var(--ge-table-header-center-bg);
  --ge-table-header-center-bg: rgba(233, 233, 233, 0.5);
  --ge-table-header-east-bg: var(--ge-table-header-center-bg);
  --ge-table-header-west-text: var(--ge-table-header-center-text);
  --ge-table-header-center-text: #000;
  --ge-table-header-east-text: var(--ge-table-header-center-text);

  --ge-table-header-west-horizontal-border: var(--ge-table-header-center-horizontal-border);
  --ge-table-header-west-vertical-border: var(--ge-table-header-center-vertical-border);
  --ge-table-header-center-horizontal-border: #ddd;
  --ge-table-header-center-vertical-border: #ccc;
  --ge-table-header-east-horizontal-border: var(--ge-table-header-center-horizontal-border);
  --ge-table-header-east-vertical-border: var(--ge-table-header-center-vertical-border);

  --ge-table-header-west-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-header-center-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-header-east-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-header-west-selected-range-text: #fff;
  --ge-table-header-center-selected-range-text: #fff;
  --ge-table-header-east-selected-range-text: #fff;


  --ge-table-body-west-bg: var(--ge-table-header-center-bg);
  --ge-table-body-center-bg: rgba(255,255,255, 0.5);
  --ge-table-body-east-bg: var(--ge-table-header-center-bg);

  --ge-table-body-west-text: var(--ge-table-header-center-text);
  --ge-table-body-center-text: var(--ge-table-header-center-text);
  --ge-table-body-east-text: var(--ge-table-header-center-text);

  --ge-table-body-west-horizontal-border: var(--ge-table-header-west-horizontal-border);
  --ge-table-body-west-vertical-border: var(--ge-table-header-west-vertical-border);
  --ge-table-body-center-horizontal-border: #bbb;
  --ge-table-body-center-vertical-border: #ddd;
  --ge-table-body-east-horizontal-border: var(--ge-table-header-east-horizontal-border);
  --ge-table-body-east-vertical-border: var(--ge-table-header-east-vertical-border);;

  --ge-table-body-west-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-body-center-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-body-east-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-body-west-selected-range-text: #fff;
  --ge-table-body-center-selected-range-text: #fff;
  --ge-table-body-east-selected-range-text: #fff;




  --ge-table-footer-west-bg: var(--ge-table-header-center-bg);
  --ge-table-footer-center-bg: var(--ge-table-header-center-bg);
  --ge-table-footer-east-bg: var(--ge-table-header-center-bg);

  --ge-table-footer-west-text: var(--ge-table-header-center-text);
  --ge-table-footer-center-text: var(--ge-table-header-center-text);
  --ge-table-footer-east-text: var(--ge-table-header-center-text);

  --ge-table-footer-west-horizontal-border: var(--ge-table-header-west-horizontal-border);
  --ge-table-footer-west-vertical-border: var(--ge-table-header-west-vertical-border);
  --ge-table-footer-center-horizontal-border: var(--ge-table-header-center-horizontal-border);
  --ge-table-footer-center-vertical-border: var(--ge-table-header-center-vertical-border);
  --ge-table-footer-east-horizontal-border: var(--ge-table-header-east-horizontal-border);
  --ge-table-footer-east-vertical-border: var(--ge-table-header-east-vertical-border);

  --ge-table-footer-west-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-footer-center-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-footer-east-selected-range-bg: rgba(0, 152, 219, 0.4);
  --ge-table-footer-west-selected-range-text: #fff;
  --ge-table-footer-center-selected-range-text: #fff;
  --ge-table-footer-east-selected-range-text: #fff;


  --ge-table-border : #ccc;
  --ge-table-selected-range-bg: rgba(0, 140, 255, 0.2);

  --ge-table-row-odd-bg: transparent;
  --ge-table-row-even-bg: transparent;
  --ge-table-column-odd-bg: transparent;
  --ge-table-column-even-bg: transparent;

  --ge-table-hover-column-bg: rgba(0, 224, 255, 0.27);
  --ge-table-hover-row-bg: rgba(0, 224, 255, 0.27);
  --ge-table-focus-border: rgb(0, 255, 255);

  --ge-table-color-error-text: #e00034;
  --ge-table-tree-arrow-collapsed-color: #e00034;
  --ge-table-column-resize-handle-border: rgb(0, 255, 255);

  --ge-table-dragged-col-div-bg: lightcyan;
  --ge-table-drop-zone-bg: rgba(244, 255, 242, 0.6);
}
`;


export class OkLchCellRenderer implements CellRendererIf {

  render(
    cellDiv: HTMLDivElement,
    _rowIndex: number,
    _columnIndex: number,
    _areaIdent: AreaIdent,
    _areaModel: AreaModelIf,
    cellValue: any,
    _domService: DomServiceIf): RendererCleanupFnType | undefined {
    if (cellValue) {
      cellDiv.innerText = (cellValue as OkLch).toCssString();
    }
    return undefined;
  }

}


export function createColumnDefs(): ColumnDefIf[] {
  const defs = [
    ColumnDef.create({
      property: "selected",
      headerLabel: " ",
      width: px50,
      bodyRenderer: new CheckboxBooleanPropertyCellRenderer<ThemeRowIf>("selected")
    }),
    ColumnDef.create({
      property: "id",
      headerLabel: "CSS var",
      width: new Size(340, "px"),
      bodyClasses: ["ge-table-text-align-left"],
      headerClasses: ["ge-table-text-align-left"]
    }),
    new ColumnDef("area", "Area", px60),
    new ColumnDef("side", "Side", px60),
    new ColumnDef("type", "Type", px60),
    ColumnDef.create({
      property: "value",
      headerLabel: "CSS Value",
      width: new Size(340, "px"),
      bodyClasses: ["ge-table-text-align-left"],
      headerClasses: ["ge-table-text-align-left"]
    })
  ];
  for (const def of defs) {
    def.sortable = () => true;
  }
  return defs;
}

function createTableRows(): ThemeRowIf[] {
  return COLOR_VARS
    .split("\n")
    .map(r => r.trim())
    .filter(r => r.includes("--ge-table"))
    .map(r => {
      const [l, v] = r.split(": ");

      return new ThemeRow(
        false,
        l.trim(),
        l.includes("header") ? "header" : l.includes("footer") ? "footer" : l.includes("body") ? "body" : "",
        l.includes("west") ? "west" : l.includes("east") ? "east" : l.includes("center") ? "center" : "",
        l.includes("bg") ? "bg" : l.includes("text") ? "text" : l.includes("border") ? "border" : "",
        undefined,
        v
      );
    });
}


export function createThemeTableModel(
  tableOptions: TableOptions = new TableOptions()
): TableModelIf {
  const rows: ThemeRowIf[] = createTableRows();
  const columnDefs: ColumnDefIf[] = createColumnDefs();

  return TableModelFactory.buildByTypedRowsParam({
    rows,
    columnDefs,
    tableOptions,
    fixedLeftColumnCount: 1
  });
}


