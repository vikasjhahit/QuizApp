import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { QuizService } from '../app/shared/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Online Quiz Application';
  removeHeader = false;

  constructor(private quizService: QuizService, private cdr: ChangeDetectorRef) {
//     this.quizService.removeHeaderComponent.subscribe(isValid => {
//       this.removeHeader = true;
//     });
 }

  ngOnInit() {
    this.quizService.removeHeaderComponent.subscribe(isValid => {
     this.removeHeader = true;
});
}

// ngAfterViewInit(): void {
//   this.cdr.detectChanges();
// }

}
