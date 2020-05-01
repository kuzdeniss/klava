import {Injectable} from '@angular/core';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable()
export class HomeService {
  str = 'скорость!';

  typeWords() {
    const span = document.getElementById('main__h1-text');
    const lettersCounter = interval(300);
    lettersCounter.pipe(take(this.str.length + 1)).subscribe((n) => {
      span.innerHTML = this.str.slice(0, n);
    });
  }
}
