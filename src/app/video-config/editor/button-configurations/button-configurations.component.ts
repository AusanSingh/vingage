import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-configurations',
  templateUrl: './button-configurations.component.html',
  styleUrls: ['./button-configurations.component.scss']
})
export class ButtonConfigurationsComponent {
  @Input() element: any;

}
