import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresComponent } from './measures.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { TableModule } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { InputSwitchModule } from "primeng/inputswitch";
import { ToastModule } from "primeng/toast";

describe('MeasuresComponent', () => {
  let component: MeasuresComponent;
  let fixture: ComponentFixture<MeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeasuresComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        TranslateModule.forRoot(),
        FontAwesomeModule,
        InputSwitchModule,
        ToastModule
      ],
      providers: [
        ConfirmationService,
        MessageService
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
