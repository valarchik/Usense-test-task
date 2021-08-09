import {Component} from '@angular/core';
import { interval } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Usense-test';
  randomStrings: { class: string, word: string  }[] = [];
  abc = "13h0";
  subGenerator:any ;
  disabled = false;

  runGenerator(): void {
    this.disabled =  true;
    this.putRandomString();
    this.subGenerator = interval(3000).subscribe(res  => { this.putRandomString() });
  }

  stopGenerator(){
    this.disabled =  false;
    this.subGenerator.unsubscribe()
  }

  putRandomString(): any {
    let classForString = 'normal';
    let generatedWord = this.getString();

    let revertWord = generatedWord.split('').reverse().join('');
    if (generatedWord.toLowerCase() === revertWord.toLowerCase()) {
      classForString = 'palindrome'
    } else if (Number(generatedWord)) {
      classForString = 'onlyNumbers'
    }

    this.randomStrings.push({
      class: classForString,
      word: generatedWord
    });
  }

  getString(): string {
    let rndString = '';

    for (let i = 0; i < 5; i++) {
      rndString += this.abc[Math.floor(Math.random() * this.abc.length)];
    }

    if (rndString.includes('0')) {
      return this.getString();
    }
    return rndString;
  }
}
