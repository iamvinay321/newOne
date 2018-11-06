import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradminuserComponent } from './useradminuser.component';

describe('UseradminuserComponent', () => {
  let component: UseradminuserComponent;
  let fixture: ComponentFixture<UseradminuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseradminuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradminuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
