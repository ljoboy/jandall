import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JandallTestModule } from '../../../test.module';
import { PrivacyComponent } from 'app/entities/privacy/privacy.component';
import { PrivacyService } from 'app/entities/privacy/privacy.service';
import { Privacy } from 'app/shared/model/privacy.model';

describe('Component Tests', () => {
  describe('Privacy Management Component', () => {
    let comp: PrivacyComponent;
    let fixture: ComponentFixture<PrivacyComponent>;
    let service: PrivacyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JandallTestModule],
        declarations: [PrivacyComponent]
      })
        .overrideTemplate(PrivacyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrivacyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrivacyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Privacy(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.privacies && comp.privacies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
