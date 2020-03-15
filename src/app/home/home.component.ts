import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private quizService: QuizService, private route: Router) { }

  ngOnInit() {
  }

  onLoginClick() {
    this.route.navigate(['/login']);
  }

}
