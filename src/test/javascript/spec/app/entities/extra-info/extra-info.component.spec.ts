import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JandallTestModule } from '../../../test.module';
import { ExtraInfoComponent } from 'app/entities/extra-info/extra-info.component';
import { ExtraInfoService } from 'app/entities/extra-info/extra-info.service';
import { ExtraInfo } from 'app/shared/model/extra-info.model';

describe('Component Tests', () => {
  describe('ExtraInfo Management Component', () => {
    let comp: ExtraInfoComponent;
    let fixture: ComponentFixture<ExtraInfoComponent>;
    let service: ExtraInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JandallTestModule],
        declarations: [ExtraInfoComponent]
      })
        .overrideTemplate(ExtraInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExtraInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtraInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExtraInfo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.extraInfos && comp.extraInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
