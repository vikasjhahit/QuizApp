import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  // ---------------- Properties---------------
  readonly rootUrl = 'http://localhost:57549';
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount = 0;
  participantID: number;
  @Output() removeHeaderComponent: EventEmitter<boolean> = new EventEmitter();

  // ---------------- Helper Methods---------------
  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    const participant = JSON.parse(localStorage.getItem('participant'));
    return participant[0].Name;
  }


  // ---------------- Http Methods---------------

  insertParticipant(name: string, email: string) {
    const body = {
      Name: name,
      Email: email
    };
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  insertUsertoDB(name: string, email: string, password: string, AccountTypeID: string) {
    const body = {
      Name: name,
      Email: email,
      Password: password,
      AccountTypeID: AccountTypeID // (instAccess === true) ? 1 : 2 ,
    };
    return this.http.post(this.rootUrl + '/api/insertUsertoDB', body);
  }


  submitAssessmentDetail(qID: number, choice: number, timerPerQues: number) {
    const body = {
      quizid: qID,
      selectedOption: choice,
      timeSpent: timerPerQues
    };
    return this.http.post(this.rootUrl + '/api/UpdateAttemptedQuestion', body);
  }

  LogOnModel(email: string, password: string) {
    const body = {
      Email: email,
      Password: password
    };
    return this.http.post(this.rootUrl + '/api/LogOnModel', body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + '/api/Questions');
  }

  getAnswers() {
    const body = this.qns.map(x => x.QuizID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }
  getAnswersForFeedback(questionIDs) {
    const body = questionIDs.map(x => x.QuizID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  getSelectedOptionByCurrentUser() {
    return this.http.get(this.rootUrl + '/api/GetSelectedOptionByCurrentUser');
  }

  getUserGradebook() {
    return this.http.get(this.rootUrl + '/api/GetUserGradebook');
  }

  // getParticipantID() {
  //   const getUserToken = JSON.parse(localStorage.getItem('participant'));
  //   const body1 = {
  //     Name: getUserToken[0].Name,
  //     Email: getUserToken[0].Email,
  //   };
  //   return this.http.post(this.rootUrl + '/api/GetCurrentParticipantID', JSON.stringify(body1));
  // }

  submitScore() {
   // const participantID = this.getParticipantID();
    const getUserToken = JSON.parse(localStorage.getItem('participant'));
    const body = {
      ParticipantID: getUserToken,
      Name: getUserToken[0].Name,
      Email: getUserToken[0].Email,
      Score: this.correctAnswerCount,
      TimeSpent: this.seconds
    };
    return this.http.post(this.rootUrl + '/api/UpdateOutput', body);
  }

}
