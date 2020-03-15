import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from './auth/auth.guard';
import { FeedbackComponent } from './feedback/feedback.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserGradebookComponent } from './user-gradebook/user-gradebook.component';


export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'my-profile', component: MyProfileComponent},
    {path: 'quiz', component: QuizComponent, canActivate : [AuthGuard]},
    {path: 'result', component: ResultComponent, canActivate : [AuthGuard]},
    {path: 'feedback', component: FeedbackComponent, canActivate : [AuthGuard]},
    {path: 'userGradebook', component: UserGradebookComponent, canActivate : [AuthGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
