import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JandallTestModule } from '../../../test.module';
import { SocialComponent } from 'app/entities/social/social.component';
import { SocialService } from 'app/entities/social/social.service';
import { Social } from 'app/shared/model/social.model';

describe('Component Tests', () => {
  describe('Social Management Component', () => {
    let comp: SocialComponent;
    let fixture: ComponentFixture<SocialComponent>;
    let service: SocialService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JandallTestModule],
        declarations: [SocialComponent]
      })
        .overrideTemplate(SocialComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SocialComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SocialService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Social(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.socials && comp.socials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
