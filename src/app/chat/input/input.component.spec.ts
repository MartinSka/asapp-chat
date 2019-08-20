import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ChatInputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStoreService } from 'src/app/app-store.service';

describe('InputComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        ChatInputComponent,
      ],
      providers: [
        AppStoreService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the input component', async(() => {
    const fixture = TestBed.createComponent(ChatInputComponent);
    const header = fixture.debugElement.componentInstance;
    expect(header).toBeTruthy();
  }));

  it('should clean the input after submit', () => {
    const fixture = TestBed.createComponent(ChatInputComponent);
    const debugElement = fixture.debugElement;
    const storeService = debugElement.injector.get(AppStoreService);
    const addMessageSpy = spyOn(storeService, 'addMessage');

    const header: ChatInputComponent = fixture.debugElement.componentInstance;

    header.message.setValue('test');

    expect(header.message.value).toBe('test');

    header.onSubmit();

    expect(addMessageSpy).toHaveBeenCalled();
    expect(header.message.value).toBeNull();
  });
});
