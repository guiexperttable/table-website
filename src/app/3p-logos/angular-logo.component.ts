import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-angular-logo",
  template: `
    <!-- angular -->
    <svg id="Layer_1" style="enable-background:new 0 0 250 250;" version="1.1" viewBox="30 30 220 220"
         x="0px" xml:space="preserve"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px">
            <g>
              <polygon class="logo-fill-color-1" points="50,190  125,33  200,190" />
              <polygon points="108,135.4 125,135.4 125,135.4 125,135.4 142,135.4 125,94.5 \t" />
              <path d="M125,30L125,30L125,30L31.9,63.2l14.2,123.1L125,230l0,0l0,0l78.9-43.7l14.2-123.1L125,30z M183.1,182.6h-21.7h0
                l-11.7-29.2H125h0h0h-24.7l-11.7,29.2h0H66.9h0L125,52.1l0,0l0,0l0,0l0,0L183.1,182.6L183.1,182.6z" />
            </g>
          </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AngularLogoComponent {
}
