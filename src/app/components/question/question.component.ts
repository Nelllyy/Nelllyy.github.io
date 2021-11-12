import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel } from 'src/app/models/question.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  categoryId: number;
  currentQuestionNumber: number;
  questions: QuestionModel[] = [];
  currentQuestion: QuestionModel;
  answers: string[] = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.queryParams.category;
    this.currentQuestionNumber = this.activatedRoute.snapshot.queryParams.page;

    this.getQuestions();
  }

  shuffle(array: string[]) {
    let index = array.length;
    let randomIndex;
  
    while (index != 0) {
  
      randomIndex = Math.floor(Math.random() * index);
      index--;
  
      [array[index], array[randomIndex]] = [
        array[randomIndex], array[index]];
    }

    return array;
  }

  selectAnswer(answer: string) {
    this.router.navigate([],   {
      queryParams: {category: this.categoryId, page: ++this.currentQuestionNumber},
      relativeTo: this.activatedRoute,
    }).then(() => this.getQuestions());
  }
  
  getQuestions() {
    this.apiService.getQuestion(10, this.categoryId).subscribe(({ results }: any) => {
      this.questions = results;
      this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
      console.log(this.questions);
      
      this.answers = this.shuffle([...this.currentQuestion?.incorrect_answers, this.currentQuestion?.correct_answer]);
    });
  }

}
