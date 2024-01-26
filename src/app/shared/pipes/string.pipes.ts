import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    // Check if the input value is a string
    if (typeof value !== 'string') {
      return value;
    }

    // Split the string by underscores and capitalize each word
    const words = value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Join the words back into a string
    return words.join(' ');
  }
}