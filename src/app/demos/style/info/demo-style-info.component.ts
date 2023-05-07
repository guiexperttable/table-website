import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";


@Component({
  selector: "demo-style-info",
  templateUrl: "./demo-style-info.component.html",
  styleUrls: ["./demo-style-info.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoStyleInfoComponent implements OnInit {

  ngOnInit(): void {
  }

}
