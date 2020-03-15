import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  questions: any[];

  constructor(public quizService: QuizService, private router: Router) { }

   ngOnInit() {
    this.quizService.seconds = parseInt(localStorage.getItem('seconds'), 10);
    this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'), 10);

    this.quizService.getQuestions().subscribe(
      (data: any) => {
        this.quizService.qns = data;
        this.questions = data;


    this.quizService.getAnswersForFeedback(this.questions).subscribe(
      (data1: any) => {
        this.quizService.correctAnswerCount = 0;
        this.quizService.qns.forEach((e, i) => {
          if (e.answer === data1[i]) {
            this.quizService.correctAnswerCount++;
          }
          e.correct = data1[i];
        });
      }
    );

    this.quizService.getSelectedOptionByCurrentUser().subscribe(
      (data2: any) => {
      //  this.quizService.correctAnswerCount = 0;
        this.quizService.qns.forEach((e, i) => {
          // if (e.answer === data2[i]) {
          //   this.quizService.correctAnswerCount++;
          // }
          e.answer = data2[i];
        });
      }
    );

      }
    );
  }

  OnSubmit() {
    this.router.navigate(['/quiz']);
  }

}
