import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  @Input() maxAllowedValue?: number | any;

  constructor(private el: ElementRef, private ngModel: NgModel) { }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    this.formatInputValue();
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    // Delay the execution to allow the paste event to complete
    setTimeout(() => {
      this.formatInputValue();
    });
  }

  formatInputValue() {
    let inputValue: any = this.el.nativeElement.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    // Limit to the maximum allowed value
    if (!isNaN(this.maxAllowedValue) && +inputValue > this.maxAllowedValue) {
      inputValue = this.maxAllowedValue.toString();
    }
    // Update ngModel value
    this.ngModel.update.emit(inputValue);
  }
}
