import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appTwoDecimalPlaces]'
})
export class TwoDecimalPlacesDirective {
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

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Regex to match numbers with up to two decimal places
    const regex: RegExp = /^[0-9]+(\.[0-9]{0,2})?$/;

    // Limit to the maximum allowed value
    if (!isNaN(this.maxAllowedValue) && +inputValue > this.maxAllowedValue) {
      inputValue = this.maxAllowedValue.toString();
    }

    if (!regex.test(inputValue)) {
      // Remove the last character if it doesn't match the regex
      inputValue = inputValue.slice(0, -1);
      this.el.nativeElement.value = inputValue;
    }


    // Update ngModel value
    this.ngModel.update.emit(inputValue);
  }
}
