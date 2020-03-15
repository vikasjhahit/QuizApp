import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { MyProfileComponent } from '../my-profile/my-profile.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isValidUser: boolean ;
  isUserExist: boolean;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' ;
  constructor(private quizService: QuizService, private route: Router) { }

  ngOnInit() {
    this.isUserExist = false;
  }

  UpdateUser(name: string, email: string) {
      this.quizService.insertParticipant(name, email).subscribe(
        (data: any) => {
         return;
        }
      );
  }

  OnClickLogin(email: string, password: string) {
    this.quizService.LogOnModel(email, password).subscribe(
      (data: any) => {
        if (data[0] !== null) {
          this.isUserExist = true;
          localStorage.clear();
          localStorage.setItem('participant', JSON.stringify(data));
          this.UpdateUser(data[0].Name, email);
          // this.route.navigate(['/quiz']);
          this.route.navigate(['/my-profile']);
        } else {
          this.isUserExist = false;
          localStorage.clear();
          this.route.navigate(['/login']);
        }
      }
    );
}

  onRegisterClick() {
    this.route.navigate(['/register']);
  }
  onGoToHomePage() {
    this.route.navigate(['/home']);
  }

}
