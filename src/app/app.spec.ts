import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('creates the app', () => {
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy();
  });

  it('renders the demo sections', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('Headless UI');
    expect(el.querySelectorAll('section').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('[role="switch"]').length).toBe(3);
  });

  it('derives the enabled count without assigning it', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const count = () => el.querySelector('.state strong')!.textContent;
    expect(count()).toBe('1'); // darkMode only

    el.querySelectorAll<HTMLElement>('.chip')[0].click();
    await fixture.whenStable();
    expect(count()).toBe('2');
  });
});
