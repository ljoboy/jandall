import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JandallTestModule } from '../../../test.module';
import { SocialDetailComponent } from 'app/entities/social/social-detail.component';
import { Social } from 'app/shared/model/social.model';

describe('Component Tests', () => {
  describe('Social Management Detail Component', () => {
    let comp: SocialDetailComponent;
    let fixture: ComponentFixture<SocialDetailComponent>;
    const route = ({ data: of({ social: new Social(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JandallTestModule],
        declarations: [SocialDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SocialDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SocialDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load social on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.social).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
