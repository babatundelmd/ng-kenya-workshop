import { booleanAttribute, computed, Directive, input, model } from '@angular/core';

@Directive({
  selector: '[uiToggle]',
  exportAs: 'uiToggle',
  host: {
    role: 'switch',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': "disabled() ? 'true': null",
    '[attr.data-disabled]': "disabled() ? 'true': null",
    '[attr.data-state]': 'state()',
    '(click)': 'onActivate()'
  },
})
export class UiToggle {
  readonly checked = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly state = computed(()=>{
    if(this.disabled()) return 'disabled'
    return this.checked() ? 'checked' : 'unchecked'
  })


  protected onActivate():void {
    if(this.disabled()) return
    this.checked.set(!this.checked())
  }


}
