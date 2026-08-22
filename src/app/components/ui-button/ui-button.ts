import { booleanAttribute, computed, Directive, input, output } from '@angular/core';

@Directive({
  selector: 'button[uiButton]',
  exportAs: 'uiButton',
  host: {
    '[attr.data-state]': 'state()', 
    '[attr.data-busy]': 'busy() ? true : null', 
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-busy]': 'busy() ? true : null',
    '(click)': 'onClick($event)'
  },
})
export class UiButton {
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly busy = computed(()=> this.loading() || this.disabled())
  readonly state = computed(() =>{
   if(this.loading()) return 'loading'
   if(this.disabled()) return 'disabled'
   return 'idle'
 })

readonly action = output<Event>();
 protected onClick(event: Event): void {
  if(this.busy()) {
    event.preventDefault();
    return
  }
  this.action.emit(event)
 }

}
