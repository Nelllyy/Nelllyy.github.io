import { Component, OnInit } from '@angular/core';
import { QuizModel } from '@app/models/quiz.model';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss'],
})
export class ScoreTableComponent implements OnInit {

  public displayedColumns: string[] = [];
  public quizes: QuizModel[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getQuzies();
  }

  getTransactions(quiz: QuizModel) {
    return quiz.answers.map((item, index) => {
     
     const transaction = {Number: index + 1, Question: item.question};
     
     item.answers.forEach((item, index) => {
       transaction[`Answer_${index + 1}`] = item;
     });

     this.displayedColumns = Object.keys(transaction);
     
     transaction['isCorrect']= item.isAnswerCorrect;
     transaction['userAnswer']= item.userAnswer;
     transaction['correctAnswer']= item.correctAnswer;

     return transaction;
   });
 }

  isAnswerCorrect(item) {
      return item.isCorrect;
  }

  getQuzies() {
    this.quizes = this.dataService.getQuizesFromStorage();
  }
}
