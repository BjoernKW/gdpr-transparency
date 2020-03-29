import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImportExportComponent } from './data-import-export.component';
import { TranslateModule } from "@ngx-translate/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

describe('DataImportExportComponent', () => {
  let component: DataImportExportComponent;
  let fixture: ComponentFixture<DataImportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataImportExportComponent],
      imports: [
        TranslateModule.forRoot(),
        FontAwesomeModule
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
