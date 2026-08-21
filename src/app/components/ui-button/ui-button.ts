import { booleanAttribute, computed, Directive, input, output } from '@angular/core';

@Directive({
  selector: 'button[uiButton]',
  exportAs: 'uiButton',
  host: {},
})
export class UiButton {
 
}
