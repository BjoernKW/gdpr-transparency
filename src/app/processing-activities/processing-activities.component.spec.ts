import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingActivitiesComponent } from './processing-activities.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TabViewModule } from "primeng/tabview";
import { TranslateModule } from "@ngx-translate/core";

describe('ProcessingActivitiesComponent', () => {
  let component: ProcessingActivitiesComponent;
  let fixture: ComponentFixture<ProcessingActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingActivitiesComponent ],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
