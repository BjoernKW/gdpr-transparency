import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImportExportComponent } from './data-import-export.component';

describe('DataImportExportComponent', () => {
  let component: DataImportExportComponent;
  let fixture: ComponentFixture<DataImportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataImportExportComponent ]
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
