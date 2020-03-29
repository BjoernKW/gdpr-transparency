import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataComponent } from './master-data.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

describe('MasterDataComponent', () => {
  let component: MasterDataComponent;
  let fixture: ComponentFixture<MasterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDataComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FontAwesomeModule,
        ToastModule
      ],
      providers: [
        MessageService
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
