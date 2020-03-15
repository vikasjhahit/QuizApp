import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  isUserExist: boolean;
  isVikas: boolean;
  Name: any;
  AccountTypeID: number;
  constructor(private quizService: QuizService, private router: Router) { }
  ngOnInit() {
    this.quizService.removeHeaderComponent.emit(true);
    this.isVikas = false;
    const getUserToken = JSON.parse(localStorage.getItem('participant'));
    this.Name = getUserToken[0].Name;
    this.AccountTypeID = getUserToken[0].AccountTypeID;

    if (getUserToken[0].Token) {
      this.isUserExist = true;
      if (getUserToken[0].Name === 'vikas') {
        this.isVikas = true;
      } else {
        this.isVikas = false;
      }
  }
  }

  onClickStartQuiz() {
    const getUserToken = JSON.parse(localStorage.getItem('participant'));
    this.Name = getUserToken[0].Name;
    this.AccountTypeID = getUserToken[0].AccountTypeID;

    if (getUserToken[0].Token) {
           this.router.navigate(['/quiz']);
    } else {
          this.isUserExist = false;
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }

      onClickGradebook() {
        const getUserToken = JSON.parse(localStorage.getItem('participant'));
        if (getUserToken[0].Token) {
         this.router.navigate(['/userGradebook']);
        } else {
         this.router.navigate(['/login']);
        }
    }
}

