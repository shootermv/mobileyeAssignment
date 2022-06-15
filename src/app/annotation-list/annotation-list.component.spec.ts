import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationListComponent } from './annotation-list.component';

describe('AnnotationListComponent', () => {
  let component: AnnotationListComponent;
  let fixture: ComponentFixture<AnnotationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnotationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
