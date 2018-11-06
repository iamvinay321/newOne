import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradminnavComponent } from './useradminnav.component';

describe('UseradminnavComponent', () => {
  let component: UseradminnavComponent;
  let fixture: ComponentFixture<UseradminnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseradminnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradminnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
