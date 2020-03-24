import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { JandallTestModule } from '../../../test.module';
import { ExtraInfoDetailComponent } from 'app/entities/extra-info/extra-info-detail.component';
import { ExtraInfo } from 'app/shared/model/extra-info.model';

describe('Component Tests', () => {
  describe('ExtraInfo Management Detail Component', () => {
    let comp: ExtraInfoDetailComponent;
    let fixture: ComponentFixture<ExtraInfoDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ extraInfo: new ExtraInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JandallTestModule],
        declarations: [ExtraInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExtraInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtraInfoDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load extraInfo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extraInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
