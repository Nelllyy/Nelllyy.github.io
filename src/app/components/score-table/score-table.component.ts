import { Component, OnInit } from '@angular/core';
import { QuizModel } from '@app/models/quiz.model';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent implements OnInit {
  displayedColumns: string[] = [];


  quizes: QuizModel[] = [];

  constructor(private dataService: DataService) { }



  getTransactions(quiz: QuizModel) {
     return quiz.answers.map((item) => {
      
      const transaction = {Question: item.question};
      
      item.answers.forEach((item, index) => {
        transaction[`Answer_${index + 1}`] = item;
      })
      this.displayedColumns = Object.keys(transaction)
      console.log(transaction);
      
      return transaction;
    });
  }

  ngOnInit(): void {
    this.getQuzies();
  }

  getQuzies() {
    this.quizes = this.dataService.getQuizesFromStorage();

    console.log(this.quizes);
    
  }
}
