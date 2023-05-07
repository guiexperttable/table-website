import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";


@Component({
  selector: "demo-row-and-colspan-info",
  templateUrl: "./demo-row-and-colspan-info.component.html",
  styleUrls: ["./demo-row-and-colspan-info.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoRowAndColspanInfoComponent implements OnInit {

  ngOnInit(): void {
  }

}
