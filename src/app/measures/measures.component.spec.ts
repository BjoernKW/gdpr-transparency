import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresComponent } from './measures.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TabViewModule } from "primeng/tabview";
import { TranslateModule } from "@ngx-translate/core";

describe('MeasuresComponent', () => {
  let component: MeasuresComponent;
  let fixture: ComponentFixture<MeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuresComponent ],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot()
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
