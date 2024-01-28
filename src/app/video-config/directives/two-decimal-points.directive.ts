import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwoDecimalPoints]'
})
export class TwoDecimalPointsDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove any non-digit and non-dot characters
    const cleanedValue = inputValue.replace(/[^0-9.]/g, '');

    // Check if there are more than one dot in the cleaned value
    const dotCount = cleanedValue.split('.').length - 1;

    // Allow only two decimal points
    if (dotCount > 1) {
      // If more than one dot, remove the extra ones
      const lastIndex = cleanedValue.lastIndexOf('.');
      const newValue = cleanedValue.substring(0, lastIndex) + cleanedValue.substring(lastIndex + 1);
      inputElement.value = newValue;
    } else {
      // Update the input value with the cleaned value
      inputElement.value = cleanedValue;
    }
  }
}
