import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingCellrendererComponent } from './testing-cellrenderer.component';

describe('TestingCellrendererComponent', () => {
  let component: TestingCellrendererComponent;
  let fixture: ComponentFixture<TestingCellrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingCellrendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingCellrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
