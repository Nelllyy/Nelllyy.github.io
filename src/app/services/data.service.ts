import { Injectable } from '@angular/core';
import { QuestionModel } from '@app/models/question.model';
import { QuizModel } from '@app/models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly quize_key = 'quiz';
  readonly current_quiz_key = 'currentAnswer';
  readonly current_questions_key = 'currentQuestions';

  private lastQuizScore: string;
  public quizes: QuizModel[] = [];

  setQuizesToStorage() {
    localStorage.setItem( this.quize_key, JSON.stringify(this.quizes) );
  }

  setCurrentQuestions(questions: QuestionModel[]) {
    localStorage.setItem(this.current_questions_key, JSON.stringify(questions));
  }

  setCurrentQuiz(quiz: QuizModel) {
    localStorage.setItem(this.current_quiz_key, JSON.stringify(quiz));
  }

  setLastQuizScore(score) {
    this.lastQuizScore = score;
  }

  getQuizesFromStorage() {
    this.quizes = JSON.parse(localStorage.getItem(this.quize_key));
    return this.quizes;
  }

  getCurrentQuestions() {
    return JSON.parse(localStorage.getItem(this.current_questions_key));
  }

  getCurrentQuiz() {
    return JSON.parse(localStorage.getItem(this.current_quiz_key));
  }

  clearStorage() {
    localStorage.removeItem(this.current_quiz_key);
    localStorage.removeItem(this.current_questions_key);
  }

  getLastQuizScore() {
    if (this.lastQuizScore) return this.lastQuizScore;
    
    this.getQuizesFromStorage();
    return this.quizes[this.quizes.length - 1].score;
  }

}
