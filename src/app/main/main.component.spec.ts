import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { TabViewModule } from 'primeng/tabview';
import { TranslateModule } from "@ngx-translate/core";
import { MasterDataComponent } from "../master-data/master-data.component";
import { ProcessingActivitiesComponent } from "../processing-activities/processing-activities.component";
import { MeasuresComponent } from "../measures/measures.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DataImportExportComponent } from "../data-import-export/data-import-export.component";
import { TableModule } from "primeng/table";
import { ConfirmationService } from "primeng/api";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
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
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
