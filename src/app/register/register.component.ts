import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ErrorMessage: any;
  isUserExist: any;
  theCheckbox = false;
  IsChecked = false;
  marked = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' ;
  constructor(private quizService: QuizService, private route: Router) { }

  ngOnInit() {
  this.isUserExist = false;
  }

  OnSubmitRegister(Name: string, Email: string, Password: string, AccountTypeID: string) {
    AccountTypeID = AccountTypeID === 'on' ? '4' : '2';
    this.quizService.insertUsertoDB(Name, Email, Password, AccountTypeID).subscribe(
      (data: any) => {
        if (data !== null) {
          this.isUserExist = false;
          localStorage.clear();
          this.route.navigate(['/login']);
        } else {
          this.isUserExist = true;
          this.ErrorMessage = 'User already exist in database...Please register with another emailid...';
          this.route.navigate(['/register']);
        }
      }
    );
  }
  onGoToHomePage() {
    this.route.navigate(['/home']);
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }

}
