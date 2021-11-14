import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizModel } from '@app/models/quiz.model';
import { DataService } from '@app/services/data.service';
import { QuestionModel } from 'src/app/models/question.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnChanges {
  public categoryId: number;
  public currentQuestionNumber: number;
  public questions: QuestionModel[] = [];
  public currentQuestion: QuestionModel;
  public answers: string[] = [];
  public quiz = new QuizModel();
  public scoreCounter: number = 0;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.subToRoute();
  }


  subToRoute() {
    return this.activatedRoute.queryParams.subscribe(() => {
      this.categoryId = this.activatedRoute.snapshot.queryParams.category;
      this.currentQuestionNumber = this.activatedRoute.snapshot.queryParams.page;
      this.getQuestions();

    });
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
    const currentAnswer = this.quiz.answers[this.currentQuestionNumber - 1];
    
    if (currentAnswer) {
      currentAnswer.userAnswer = answer;
      currentAnswer.isAnswerCorrect = answer === currentAnswer.correctAnswer;
      if (currentAnswer.isAnswerCorrect) this.scoreCounter++;
    }

    this.dataService.setCurrentQuiz(this.quiz);

    if (this.currentQuestionNumber == this.questions.length) {
      this.quiz.score = `${this.scoreCounter}/${this.questions.length}`
      this.dataService.setLastQuizScore(this.quiz.score);
      const quizes = this.dataService.getQuizesFromStorage();
      quizes.push(this.quiz);
      this.dataService.setQuizesToStorage(quizes);
      this.dataService.clearStorage();
      this.router.navigate(['/result']);
      return;
    }

    if (this.currentQuestionNumber < this.questions.length) {
      this.currentQuestionNumber++ 
    }

    this.router.navigate([], {
      queryParams: { category: this.categoryId, page: this.currentQuestionNumber },
      relativeTo: this.activatedRoute,
    });

  }

  getQuestions() {
    this.questions = this.dataService.getCurrentQuestions();

    if (this.questions) {
      this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
      this.quiz = this.dataService.getCurrentQuiz();
      return;
    }

    this.apiService.getQuestion(10, this.categoryId).subscribe(({ results }: any) => {
      this.questions = results;

      this.questions.forEach(item => {
        item.answers = this.shuffle([...item.incorrect_answers, item.correct_answer])
      });

      this.currentQuestion = this.questions[this.currentQuestionNumber - 1];

      this.dataService.setCurrentQuestions(this.questions);

      this.quiz.answers = this.questions.map(item => {
        return ({
          question: item.question,
          answers: item.answers,
          userAnswer: null,
          correctAnswer: item.correct_answer,
          isAnswerCorrect: null,
        });
      })


    });
  }

  ngOnChanges() {
    this.subToRoute().unsubscribe();
  }

}
