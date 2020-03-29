import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresComponent } from './measures.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { TableModule } from "primeng/table";
import { ConfirmationService } from "primeng/api";

describe('MeasuresComponent', () => {
  let component: MeasuresComponent;
  let fixture: ComponentFixture<MeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuresComponent ],
      imports: [
        ReactiveFormsModule,
        TableModule,
        TranslateModule.forRoot()
      ],
      providers: [
        ConfirmationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
