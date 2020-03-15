import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  seconds: number;
  timeSpent: number ;
  timeSpentPrev: number ;
  timerPerQues: number ;

  constructor(private router: Router, public quizService: QuizService) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds'), 10) > 0) {
      this.timeSpentPrev =  this.timeSpent;
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'), 10);
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'), 10);
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.qnProgress === 10) {
        this.router.navigate(['/result']);
      } else {
        this.startTimer();
        this.timeSpent = this.TimeElapsed();
        this.timerPerQues = this.timeSpent - this.timeSpentPrev;
      }
    } else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          this.quizService.qns = data;
          this.startTimer();
          this.timeSpent = this.TimeElapsed();
          this.timerPerQues = this.timeSpent - this.timeSpentPrev;
        }
      );
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }
  stopTimer() {
    clearInterval(3);
}
TimeElapsed() {
  return Math.floor(parseInt(localStorage.getItem('seconds'), 10));
}

  Answer(qID, choice) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());

    this.quizService.submitAssessmentDetail(qID, choice, this.timerPerQues = 5).subscribe(
      (data: any) => {
        if (this.quizService.qnProgress === 10) {
          clearInterval(this.quizService.timer);
          this.router.navigate(['/result']);
      }
    }
    );

    // if (this.quizService.qnProgress === 10) {
    //   clearInterval(this.quizService.timer);
    //   this.router.navigate(['/result']);
    }
  }

// }
