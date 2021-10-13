
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslationService) { }
  transform(key: any): any {
    // console.log(key);
    if(key !== 'undefined') {
// console.log(this.translate.data);

      return this.translate.data[key] || '';
    }
  }
}
