import { ThemeRowIf } from "../data/theme-row.If";
import {
  AreaIdent,
  AreaModelObjectyArray,
  CellRendererIf,
  DomServiceIf,
  RendererCleanupFnType
} from "@guiexpert/table";


export class CssColorCellRenderer implements CellRendererIf {


  render(
    cellDiv: HTMLDivElement,
    _rowIndex: number,
    _columnIndex: number,
    _areaIdent: AreaIdent,
    _areaModel: AreaModelObjectyArray<ThemeRowIf>,
    cellValue: any,
    _domService: DomServiceIf): RendererCleanupFnType | undefined {

    cellDiv.innerHTML = `
        <div
          style="width:100%;height:100%;margin:0;background:${cellValue} !important; "
          class=""></div>`;
    return undefined;
  }

}
