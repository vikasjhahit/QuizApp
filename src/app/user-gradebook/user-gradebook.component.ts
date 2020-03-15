import { Component, OnInit, EventEmitter, Output,
 Type, ComponentFactoryResolver, ViewContainerRef, ViewChild} from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { UserGradebookModel } from '../core/model/UserGradebookModel';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-gradebook',
  templateUrl: './user-gradebook.component.html',
  styleUrls: ['./user-gradebook.component.css']
})
export class UserGradebookComponent implements OnInit {

  totalcount: number;
  UserGradebook: UserGradebookModel[];
  components = [];
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  // @Output() removeHeaderComponent: EventEmitter<boolean> = new EventEmitter();

  constructor(private quizService: QuizService, private router: Router
  , private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
     this.quizService.removeHeaderComponent.emit(true);

    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HeaderComponent);
    // const component1 = this.container.createComponent(componentFactory);

    // const component2 = this.components.find((component2) => component2.instance instanceof HeaderComponent);
    // const componentIndex = this.components.indexOf(component2);

    // if (componentIndex !== -1) {
    //   // Remove component from both view and array
    //   this.container.remove(this.container.indexOf(component2));
    //   this.components.splice(componentIndex, 1);
    // }

    this.quizService.getUserGradebook().subscribe(
      (data: any) => {
       // if (data[0] !== null) {
        this.UserGradebook = data;
        this.totalcount = data.length;
      }
    );
  }

}
