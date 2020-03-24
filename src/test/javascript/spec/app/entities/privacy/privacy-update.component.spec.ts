import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JandallTestModule } from '../../../test.module';
import { PrivacyUpdateComponent } from 'app/entities/privacy/privacy-update.component';
import { PrivacyService } from 'app/entities/privacy/privacy.service';
import { Privacy } from 'app/shared/model/privacy.model';

describe('Component Tests', () => {
  describe('Privacy Management Update Component', () => {
    let comp: PrivacyUpdateComponent;
    let fixture: ComponentFixture<PrivacyUpdateComponent>;
    let service: PrivacyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JandallTestModule],
        declarations: [PrivacyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PrivacyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrivacyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrivacyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Privacy(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Privacy();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
