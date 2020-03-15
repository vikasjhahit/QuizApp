import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean;
  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    const getUserToken = JSON.parse(localStorage.getItem('participant'));
    if (getUserToken) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  SignOut() {
    localStorage.clear();
    clearInterval(this.quizService.timer);
    this.router.navigate(['/register']);
  }

  ClickHome() {
    this.router.navigate(['/home']);
  }

  ClickLogin() {
    this.router.navigate(['/login']);
  }

}
