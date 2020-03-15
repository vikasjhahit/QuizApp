import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGradebookComponent } from './user-gradebook.component';

describe('UserGradebookComponent', () => {
  let component: UserGradebookComponent;
  let fixture: ComponentFixture<UserGradebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGradebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGradebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
