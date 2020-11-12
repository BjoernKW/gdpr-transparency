import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { TabViewModule } from 'primeng/tabview';
import { TranslateModule } from "@ngx-translate/core";
import { MasterDataComponent } from "../master-data/master-data.component";
import { ProcessingActivitiesComponent } from "../processing-activities/processing-activities.component";
import { MeasuresComponent } from "../measures/measures.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataImportExportComponent } from "../data-import-export/data-import-export.component";
import { TableModule } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { InputSwitchModule } from "primeng/inputswitch";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MasterDataComponent,
        ProcessingActivitiesComponent,
        MeasuresComponent,
        DataImportExportComponent
      ],
      imports: [
        TabViewModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
