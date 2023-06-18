import { ChangeDetectionStrategy, Component } from "@angular/core";


@Component({
  selector: "[appWelcomeDemo]",
  templateUrl: "./welcome-demo.component.html",
  styleUrls: ["./welcome-demo.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeDemoComponent {

  public freezeUi = false;


  openCustomThemePicker() {
    window.open(
      "http://localhost:4200/themes/custom/picker#welcome",
      "_blank",
      "left=100,top=100,width=720,height=755,location=0,scrollbars=0,status=0");
  }


}
