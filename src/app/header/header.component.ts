import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // removeHeader = false;
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    // this.quizService.removeHeaderComponent.subscribe(isValid => {
    //  this.removeHeader = true;
// });
}

}
