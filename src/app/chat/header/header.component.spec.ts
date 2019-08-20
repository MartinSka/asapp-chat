import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ChatHeaderComponent } from './header.component';
import { testUser01, testUser02, testUser03 } from '../../utils/mocks';

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the header component', async(() => {
    const fixture = TestBed.createComponent(ChatHeaderComponent);
    const header = fixture.debugElement.componentInstance;
    expect(header).toBeTruthy();
  }));

  it('should get if the Header user is typing', () => {
    const fixture = TestBed.createComponent(ChatHeaderComponent);
    const header: ChatHeaderComponent = fixture.debugElement.componentInstance;
    const user = testUser01;
    const users = [testUser01, testUser02, testUser03];

    header.user = user;

    expect(header.getUserTyping(users)).toBe(user);
  });

  it('should not get any user if the Header user is not typing', () => {
    const fixture = TestBed.createComponent(ChatHeaderComponent);
    const header = fixture.debugElement.componentInstance;
    const user = testUser01;
    const users = [testUser02, testUser03];

    header.user = user;

    expect(header.getUserTyping(users)).toBeUndefined();
  });
});
