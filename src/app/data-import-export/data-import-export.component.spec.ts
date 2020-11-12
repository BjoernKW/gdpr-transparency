import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataImportExportComponent } from './data-import-export.component';
import { TranslateModule } from "@ngx-translate/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api"
import { InputSwitchModule } from "primeng/inputswitch";

describe('DataImportExportComponent', () => {
  let component: DataImportExportComponent;
  let fixture: ComponentFixture<DataImportExportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataImportExportComponent],
      imports: [
        TranslateModule.forRoot(),
        FontAwesomeModule,
        ConfirmDialogModule,
        ToastModule,
        InputSwitchModule
      ],
      providers: [
        ConfirmationService,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
