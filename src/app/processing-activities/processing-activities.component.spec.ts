import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingActivitiesComponent } from './processing-activities.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { TableModule } from "primeng/table";
import { ConfirmationService } from "primeng/api";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

describe('ProcessingActivitiesComponent', () => {
  let component: ProcessingActivitiesComponent;
  let fixture: ComponentFixture<ProcessingActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingActivitiesComponent ],
      imports: [
        ReactiveFormsModule,
        TableModule,
        TranslateModule.forRoot(),
        FontAwesomeModule
      ],
      providers: [
        ConfirmationService
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
