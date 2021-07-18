import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TapPagePage } from './tap-page.page';

describe('TapPagePage', () => {
  let component: TapPagePage;
  let fixture: ComponentFixture<TapPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TapPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
