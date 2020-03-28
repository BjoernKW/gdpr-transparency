import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataComponent } from './master-data.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TabViewModule } from "primeng/tabview";
import { TranslateModule } from "@ngx-translate/core";

describe('MasterDataComponent', () => {
  let component: MasterDataComponent;
  let fixture: ComponentFixture<MasterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDataComponent ],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
