import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarvelApiService } from 'src/app/services/marvel-api.service';
import { MarvelApiMockService } from 'src/app/services/mock/marvel-api.mock.service';

import { CharacterCardComponent } from './character-card.component';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CharacterCardComponent],
      providers: [
        { provide: MarvelApiService, useClass: MarvelApiMockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
