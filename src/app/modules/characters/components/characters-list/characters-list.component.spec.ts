import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MarvelApiService } from '../../../../services/marvel-api.service';
import { MarvelApiMockService } from '../../../../services/mock/marvel-api.mock.service';
import { CharactersListComponent } from './characters-list.component';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;
  const spyScrollWindow = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CharactersListComponent],
      providers: [
        { provide: MarvelApiService, useClass: MarvelApiMockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    Object.defineProperty(global.window, 'scroll', {
      value: spyScrollWindow,
    });
    spyScrollWindow.mockClear();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should call getCharacters()', () => {
    const spyOnMethod = jest.spyOn(component, 'getCharacters');
    component.ngOnInit();
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('getCharacters() should call marvelApiService and put res in characters and total', () => {
    const service = TestBed.inject(MarvelApiService);
    const spyOnMethod = jest.spyOn(service, 'getCharactersList');
    component.getCharacters();
    expect(spyOnMethod).toHaveBeenCalled();
    expect(component.characters.length).toBe(2);
    expect(component.total).toBe(10);
  });

  it('onChangePagePrev() should set offset and call getCharacters() and scrollToTop()', () => {
    const spyOnGetCharacters = jest.spyOn(component, 'getCharacters');
    const spyOnScrollToTop = jest.spyOn(component, 'scrollToTop');
    component.onChangePagePrev();
    expect(component.offset).toBe(80);
    expect(spyOnGetCharacters).toHaveBeenCalled();
    expect(spyOnScrollToTop).toHaveBeenCalled();
  });

  it('onChangePageNext() should set offset and call getCharacters() and scrollToTop()', () => {
    const spyOnGetCharacters = jest.spyOn(component, 'getCharacters');
    const spyOnScrollToTop = jest.spyOn(component, 'scrollToTop');
    component.onChangePageNext();
    expect(component.offset).toBe(120);
    expect(spyOnGetCharacters).toHaveBeenCalled();
    expect(spyOnScrollToTop).toHaveBeenCalled();
  });

  it('scrollToTop() should call window.scroll', () => {
    component.onChangePageNext();
    expect(spyScrollWindow).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  it('ngOnDestroy() should emit true to destroyed observable and close it', () => {
    const spyOnDestroyedNext = jest.spyOn(component.destroyed$, 'next');
    const spyOnDestroyedComplete = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(spyOnDestroyedNext).toHaveBeenCalledWith(true);
    expect(spyOnDestroyedComplete).toHaveBeenCalled();
  });
});
