import {Component, OnInit, Input} from '@angular/core';

type Letter = {
    letter: string,
    isShown: boolean,
    isWrong: boolean
}

@Component({
    selector: 'app-algorithm',
    templateUrl: './algorithm.component.html',
    styleUrls: ['./algorithm.component.css']
})
export class AlgorithmComponent implements OnInit {

    @Input() word;

    private currentLetter: number;

    public checkArray: Letter[];
    public pickArray: Letter[];

    constructor() {
    }

    ngOnInit() {
        this.currentLetter = 0;

        let lettersArray: string[] = this.word.split('');

        this.checkArray = this.getLetters(lettersArray, false, true);

        this.pickArray = this.getLetters(lettersArray, true, false);
        this.pickArray = this.getRandomArray(this.pickArray);
    }

    // получает массив объектов Letter из массива букв
    private getLetters(lettersArray: string[], isShown: boolean, allowEmpty: boolean): Letter[] {
        let array: Letter[] = [];

        // в одном из массивов пробелы между словами пропускаем
        for (let letter of lettersArray) {
            if (!letter.trim() && !allowEmpty) {
                continue;
            }

            array.push({
                letter: letter,
                isShown: isShown,
                isWrong: false
            });
        }

        return array;
    }

    // обработчик клика по букве
    public selectPickLetter(num: number): void {
        if (!this.checkArray[this.currentLetter].letter.trim()) {
            this.currentLetter++;
        }

        // если правильно
        if (this.pickArray[num].letter == this.checkArray[this.currentLetter].letter) {
            this.checkArray[this.currentLetter].isShown = true;
            this.pickArray[num].isShown = false;

            this.currentLetter++;
        } else {
            // если НЕ правильно
            this.setWrongAnswer(num);
        }

        // конец теста
        if (this.currentLetter == this.checkArray.length) {
            // здесь отсылать "наверх" сообщение о конце теста
            alert('The end !');
        }
    }

    // действует при неправильном ответе
    private setWrongAnswer(num: number): void {
        this.pickArray[num].isWrong = true;

        setTimeout(((num: number) => {
            return () => {
                this.pickArray[num].isWrong = false;
            }
        })(num), 500);
    }

    private getRandomArray(array: Letter[]): Letter[] {
        let newArray: Letter[] = [];
        let min: number = 0;

        while (array.length > 0) {
            let max: number = array.length;
            let letter: Letter = array.splice(this.getRandomInt(min, max), 1)[0];
            newArray.push(letter);
        }

        return newArray;
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
















