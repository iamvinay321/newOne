import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradmingroupComponent } from './useradmingroup.component';

describe('UseradmingroupComponent', () => {
  let component: UseradmingroupComponent;
  let fixture: ComponentFixture<UseradmingroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseradmingroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradmingroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
