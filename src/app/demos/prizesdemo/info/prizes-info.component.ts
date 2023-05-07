import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";


@Component({
  selector: "prizes-demo-info",
  templateUrl: "./prizes-info.component.html",
  styleUrls: ["./prizes-info.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrizesInfoComponent implements OnInit {

  ngOnInit(): void {
  }

}
