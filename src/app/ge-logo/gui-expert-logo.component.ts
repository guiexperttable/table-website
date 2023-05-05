import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";

@Component({
  selector: "guiexpert-logo",
  templateUrl: "./gui-expert-logo.component.html",
  styleUrls: ["./gui-expert-logo.component.scss"]
})
export class GuiExpertLogoComponent implements AfterViewInit {

  @Input()
  mode: "colored" | "monocolor-black" | "monocolor-white" = "colored";

  @Input()
  size = 40;

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }
}
