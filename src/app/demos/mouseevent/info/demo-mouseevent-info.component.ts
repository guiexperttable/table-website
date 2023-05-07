import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";


@Component({
  selector: "demo-mouseevent-info",
  templateUrl: "./demo-mouseevent-info.component.html",
  styleUrls: ["./demo-mouseevent-info.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoMouseeventInfoComponent implements OnInit {

  ngOnInit(): void {
  }

}
