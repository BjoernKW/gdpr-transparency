import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from "@ngx-translate/core";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastModule } from "primeng/toast";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        ConfirmDialogModule,
        FontAwesomeModule,
        ToastModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ConfirmationService,
        MessageService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
